import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Category } from "../../store/reducers/items";

export type CategoryItemOpts = {
  id: number,
  active: boolean,
}

function CategoryItem({item, onChange, options}: Readonly<{item: Category, onChange: Function, options: CategoryItemOpts}>) {

  console.log("CategoryItem");

  const cn = bem('CategoryItem');

  return (
    <div className={cn()}>
      <span onClick={() => onChange(item.id)} className={options?.active ? cn({active: true}) : ''}>{item.name}</span>
    </div>
  );
}

export default React.memo(CategoryItem);