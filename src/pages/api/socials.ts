import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import {
  SocialDTO,
  SocialListResponseDTO,
} from "../../types/social/socailResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SocialListResponseDTO>
) {
  const { db } = await connectToDatabase();

  if (req.method === "GET") {
    const socials = await db
      .collection("socials")
      .find<SocialDTO>({})
      .toArray();
    res.status(200).json({
      status: { status: "success", message: "successfully fetched socials" },
      socials: socials,
    });
  }
}
