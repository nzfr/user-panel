import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "bson";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { db } = await connectToDatabase();
  if (req.method === "POST") {
    const body = req.body;
    const userId = body.userId;
    const socialData = body.social;
    db.collection("user_socials")
      .insertOne({
        social: socialData.name,
        link: socialData.link,
        userId: userId,
        icon: socialData.icon,
        persianName: socialData.persianName,
      })
      .then(() => {
        res.status(200).json({ status: "success" });
      });
  }

  if (req.method === "DELETE") {
    const id = req.query.id;
    if (id) {
      db.collection("user_socials")
        .deleteOne({ _id: new ObjectId(id.toString()) })
        .then(() => {
          res.status(200).json({ status: "success" });
        });
    } else {
      res.status(200).json({ status: "failed" });
    }
  }

  if (req.method === "PUT") {
    const id = req.body.id;
    const body = req.body;
    console.log(req.body);
    console.log(id);
    db.collection("user_socials")
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            social: body.name,
            link: body.link,
            icon: body.icon,
            persianName: body.persianName,
          },
        }
      )
      .then((response) => {
        console.log(response);
        res.status(200).json({ status: "success" });
      })
      .catch(() => {
        res.status(500).json({ status: "error" });
      });
  }
}
