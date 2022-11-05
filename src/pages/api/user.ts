import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import {
  GetUserResponse,
  UserDataDTO,
  UserSocialDTO,
} from "../../types/user/userResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ user: any }>
) {
  const { db } = await connectToDatabase();
  res.setTimeout(15000);

  if (req.method === "GET") {
    const userData = await db.collection("users").findOne<UserDataDTO>();

    const socialData = await db
      .collection("user_socials")
      .find<UserSocialDTO>({ userId: userData?._id?.toString() })
      .toArray();
    const response: GetUserResponse = {
      status: {
        status: "success",
        message: "User fetched successfully!",
      },
      user: { userInfo: userData ?? undefined, socials: socialData },
    };

    res.status(200).json(response);
  }

  if (req.method === "POST") {
    res.status(500).json({ user: "Invalid method!" });
  }
}
