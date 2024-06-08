import { Item } from '../models/item.model';

export class AddItem {
  static readonly type = '[Item] Add';
  constructor(public payload: Item) {}
}

export class GetItems {
  static readonly type = '[Item] Get';
}

export class UpdateItem {
  static readonly type = '[Item] Update';
  constructor(public payload: Item) {}
}

export class DeleteItem {
  static readonly type = '[Item] Delete';
  constructor(public payload: number) {}
}

export class SetSelectedItem {
  static readonly type = '[Item] Set Selected';
  constructor(public payload: Item | null) {}
}