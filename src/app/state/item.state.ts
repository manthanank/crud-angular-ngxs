import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Item } from '../models/item.model';
import { AddItem, GetItems, UpdateItem, DeleteItem, SetSelectedItem } from '../actions/item.actions';
import { Injectable } from '@angular/core';
import { ItemService } from '../services/item.service';

export interface ItemStateModel {
  items: Item[];
  selectedItem: Item | null;
}

@State<ItemStateModel>({
  name: 'items',
  defaults: {
    items: [],
    selectedItem: null
  }
})
@Injectable()
export class ItemState {

  constructor(private itemService: ItemService) {}

  @Selector()
  static getItems(state: ItemStateModel) {
    return state.items;
  }

  @Selector()
  static getSelectedItem(state: ItemStateModel) {
    return state.selectedItem;
  }

  @Action(GetItems)
  getItems({ setState }: StateContext<ItemStateModel>) {
    return this.itemService.getItems().subscribe((result) => {
      setState({ items: result, selectedItem: null });
    });
  }

  @Action(AddItem)
  addItem({ getState, patchState }: StateContext<ItemStateModel>, { payload }: AddItem) {
    return this.itemService.addItem(payload).subscribe((result) => {
      const state = getState();
      patchState({
        items: [...state.items, result]
      });
    });
  }

  @Action(UpdateItem)
  updateItem({ getState, setState }: StateContext<ItemStateModel>, { payload }: UpdateItem) {
    return this.itemService.updateItem(payload).subscribe((result) => {
      const state = getState();
      const itemList = [...state.items];
      const itemIndex = itemList.findIndex(item => item.id === payload.id);
      itemList[itemIndex] = result;
      setState({
        items: itemList,
        selectedItem: null
      });
    });
  }

  @Action(DeleteItem)
  deleteItem({ getState, setState }: StateContext<ItemStateModel>, { payload }: DeleteItem) {
    return this.itemService.deleteItem(payload).subscribe(() => {
      const state = getState();
      const filteredArray = state.items.filter(item => item.id !== payload);
      setState({
        items: filteredArray,
        selectedItem: null
      });
    });
  }

  @Action(SetSelectedItem)
  setSelectedItem({ patchState }: StateContext<ItemStateModel>, { payload }: SetSelectedItem) {
    patchState({ selectedItem: payload });
  }
}