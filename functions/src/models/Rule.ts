import { ObjectId } from "mongodb";

export default interface Rule {
  _id: ObjectId;
  ruleText: string;
}
