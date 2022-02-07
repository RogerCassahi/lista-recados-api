import { User } from "../../../users/domain/model/user";

export interface Message {
  uid: string;
  user: User;
  descricao: string;
  detalhamento: string;
}
