import { DragonListItemResponse } from '../integration/dragon-list-item.response';

export class DragonListItemModel {
  public readonly id: string;
  public readonly createdAt: Date;
  public readonly name: string;
  public readonly type: string;
  public readonly history: string;
  public readonly histories: string[];

  constructor(dragon: DragonListItemResponse) {
    this.id = dragon.id;
    this.createdAt = new Date(dragon.createdAt);
    this.name = dragon.name;
    this.type = dragon.type;
    this.history = dragon.history;
    this.histories = dragon.histories;
  }
}
