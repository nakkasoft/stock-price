import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Item.css';

const Item = ({title, price, yesterday, diff, id, onRemove}) => {
  return (
    <div className="Item">
      <div className = "Item_Columns">
        <div className = "Item_Title">
          <ItemLink title={title} id={id}/>
          <ItemRemove onRemove={onRemove} id={id}/>
        </div>
        <div className="Item_Content">
          <ItemYesterday yesterday={yesterday} diff={diff}/>
          <ItemPrice price={price}/>
          <ItemDiffPercent yesterday={yesterday} current={price}/>
        </div>
      </div>
    </div>
  );
}
Item.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  yesterday: PropTypes.string.isRequired,
  diff: PropTypes.number.isRequired
}

const ItemYesterday = ({yesterday, diff}) => {
  return (
    <span className="Item_Yesterday">{yesterday} {diff}</span>
  )
}
ItemYesterday.propTypes = {
  yesterday: PropTypes.string.isRequired,
  diff: PropTypes.number.isRequired
}

const ItemPrice = ({price}) => {
  return (
    <span className="Item_Price">{price} </span>
  )
}
ItemPrice.propTypes = {
  price: PropTypes.string.isRequired
}

const ItemDiffPercent = ({yesterday, current}) => {
  yesterday = Number(yesterday.replace(',',''));
  current = Number(current.replace(',',''));
  var tempVal = (current - yesterday)/yesterday*100;
  return (
    <span className="Item_DiffPercent">{tempVal.toFixed(2)}%</span>
  )
}
ItemDiffPercent.propTypes = {
  yesterday: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired
}

const ItemRemove = ({onRemove, id}) => {
  return (
    <div className="Item_Remove" onClick={(e) => {
      //e.stopPropagation();
      onRemove(id)}
    }>&times;</div>
  )
}
ItemRemove.propTypes = {
  onRemove: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}


const ItemLink = ({title, id}) => {
  return (
    <h1><a href={'https://finance.naver.com/item/main.nhn?code='+id} target="_blank" rel="noopener noreferrer">{title}</a></h1>
  )
}
ItemLink.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

export default Item;
