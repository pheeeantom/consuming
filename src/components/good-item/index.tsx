import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Item } from "../../store/reducers/items";
import { BasketItem } from "../../store/reducers/basket";

function GoodItem({item, onAdd, onClear, options}:
    Readonly<{item: Item, onAdd: Function, onClear: Function, options: BasketItem}>) {

  console.log("GoodItem");

  const cn = bem('GoodItem');

  return (
    <div className={cn()}>
      <span>{item.name}</span>
      <span>{item.price + 'Р'}</span>
      <span>{options ? options.amount + 'шт' : '-'}</span>
      <img src={'/pics/' + item.picture}/>
      <button onClick={() => onAdd(item.id)}>Добавить</button>
      <button onClick={() => onClear(item.id)}>Очистить</button>
    </div>
  );
}

export default React.memo(GoodItem);