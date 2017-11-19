import React from 'react';
import Button from './Button';
import styles from './Menu.css';

/**
* @function Menu
* @description React component that renders header and buttons for each supported crypto currency.
*/

const Menu = (props) => {
  const buttons = props.cryptos.map(crypto => (
    <Button
      key={crypto.symbol}
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
};

export default Menu;
