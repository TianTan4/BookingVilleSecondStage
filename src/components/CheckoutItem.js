import './CheckoutItem.styles.scss';
import React from 'react';

const CheckoutItem =(props)=>{
    console.log("props inside checkoutitem is ",props)
    const {Difference_In_Days,image,hotel,price,checkInDate,checkOutDate,reserveCount}=props
    
   
    return(
        <div className='checkout-item'>
        <div className='image-container'>
          <img src={image} alt='item' />
        </div>
        <span className='name'>{hotel}</span>
        <span className='name'>{checkInDate}---{checkOutDate}</span>
        <span className='quantity'>
          
          <span className='value'>{Difference_In_Days}</span>
          
        </span>
        <span className='price'>{price}$</span>
        
        <div
          className='remove-button'
        >
        <span className='roomcheck'>{reserveCount}</span>
          {/* &#10005; */}
        </div>
      </div>
    );
  };
  
  export default CheckoutItem;