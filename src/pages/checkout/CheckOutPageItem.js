import React from 'react';
import './checkout.styles.scss';
const CheckoutItem = (props) => {
 console.log("checkoutpageitem props is ",props)
const {checkInDate,checkOutDate,hotelName,roomType}=props.roomOrder
  return (
    <div className='checkout-item'>
      
      <span className='name'>{roomType}</span>
    
      <span className='name'>{hotelName}</span>
      <span className='quantity'>
        
        <span className='value'>{checkInDate.substring(0,10)}---{checkOutDate.substring(0,10)}</span>
       
      </span>
      <span className='price'>1</span>
      <span className='price'>300$</span>
      <div
        className='remove-button'
       
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
