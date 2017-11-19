import React from 'react';
import Button from './Button';
import styles from './Menu.css';

const Menu = (props) => {
  const buttons = props.cryptos.map((crypto, i) => (
    <Button
      key={i}
      activeBtn={props.activeBtn}
      clickHandler={props.clickHandler}
      label={crypto.symbol}
      name={crypto.name}
  />
  ));
  return (
    <div className={styles.container}>
      <h1>crypto charts</h1>
      <div className={styles.cryptoContainer}>
        {buttons}
      </div>
    </div>
  );
}

export default Menu;
