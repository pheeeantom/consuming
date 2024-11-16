import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Head({title}: Readonly<{title: string}>) {

  console.log("Head");

  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1>{title}</h1>
    </div>
  );
}

export default React.memo(Head);