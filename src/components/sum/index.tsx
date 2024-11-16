import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Sum({sum}: {sum: number}) {

  console.log("Sum");

  const cn = bem('Sum');

  return (
    <div className={cn()}>
      Сумма: {sum}Р
    </div>
  );
}

export default React.memo(Sum);