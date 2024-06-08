import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetItems, DeleteItem, SetSelectedItem } from 'src/app/actions/item.actions';
import { Item } from 'src/app/models/item.model';
import { ItemState } from 'src/app/state/item.state';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  @Select(ItemState.getItems) items$!: Observable<Item[]>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetItems());
  }

  editItem(item: Item) {
    // Emit the selected item to be edited
    this.store.dispatch(new SetSelectedItem(item));
  }

  deleteItem(id: number) {
    this.store.dispatch(new DeleteItem(id));
  }
}
