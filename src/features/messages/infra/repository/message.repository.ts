import { MessageEntity } from "../../../../core/infra/data/database/entities/MessageEntity";
import { User } from "../../../users/domain/model/user";
import { Message } from "../../domain/model/message";

interface MessageParams {
  descricao: string;
  detalhamento: string;
  uid: string;
  user: User;
}

export class MessageRepository {
  async create(data: MessageParams): Promise<Message> {
    const entity = MessageEntity.create({
      descricao: data.descricao,
      detalhamento: data.detalhamento,
      user: data.user,
    });

    await entity.save();
    return this.mapperFromEntityToModel(entity);
  }

  async getAllMessages(uid: string): Promise<any> {
    const messageEntity = await MessageEntity.find({
      where: { user: uid },
    });

    if (messageEntity.length == 0) return "Não possui recados";

    if (!messageEntity) return undefined;
    return messageEntity;
  }

  async deleteMessage(data: string): Promise<any> {
    const messageEntity = await MessageEntity.delete(data);
    if (!messageEntity) return undefined;
    return messageEntity;
  }

  async updateMessage(data: MessageParams): Promise<Message | undefined> {
    const messageEntity = await MessageEntity.findOne(data.uid);
    if (!messageEntity) return undefined;

    const messageUpdate = await MessageEntity.create({
      descricao: data.descricao,
      detalhamento: data.detalhamento,
      uid: data.uid,
    });
    await messageUpdate.save();
    return messageUpdate;
  }

  private mapperFromEntityToModel(entity: MessageParams) {
    return {
      uid: entity.uid,
      descricao: entity.descricao,
      detalhamento: entity.detalhamento,
      user: entity.user,
    };
  }
}
