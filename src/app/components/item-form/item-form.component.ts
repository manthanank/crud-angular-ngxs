import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddItem, SetSelectedItem, UpdateItem } from 'src/app/actions/item.actions';
import { Item } from 'src/app/models/item.model';
import { ItemState } from 'src/app/state/item.state';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {

  @Select(ItemState.getSelectedItem) selectedItem$!: Observable<Item | null>;

  item: Item = { id: 0, name: '', description: '' };
  isEditing = false;

  constructor(private store: Store) { }

  ngOnInit() {
    this.selectedItem$.subscribe(item => {
      if (item) {
        this.item = { ...item };
        this.isEditing = true;
      } else {
        this.resetForm();
      }
    });
  }

  addItem() {
    this.item.id = Date.now();
    this.store.dispatch(new AddItem(this.item));
    this.resetForm();
  }

  updateItem() {
    this.store.dispatch(new UpdateItem(this.item));
    this.resetForm();
  }

  resetForm() {
    this.item = { id: 0, name: '', description: '' };
    this.isEditing = false;
    this.store.dispatch(new SetSelectedItem(null));
  }
}
