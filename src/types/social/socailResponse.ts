import { RequestStatus } from "../requestStatus";
import { ObjectId } from "bson";

export type SocialDTO = {
  _id?: ObjectId;
  name?: string;
  persianName?: string;
  icon?: string;
};

export type SocialListResponseDTO = {
  status: RequestStatus;
  socials: SocialDTO[];
};
