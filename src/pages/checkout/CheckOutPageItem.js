import React from 'react';
import './checkout.styles.scss';
const CheckoutItem = (props) => {
 
const {checkInDate,checkOutDate,hotelName,reservationIds}=props.roomOrder
const{roomCount,roomPrice,roomName,clearItemFromCart,DeleteData}=props;

const date1 = new Date(checkInDate);
    const date2 = new Date(checkOutDate);
    const Difference_In_Time = date2.getTime() - date1.getTime();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);



console.log("current props.roomOder is",props.roomOrder)
  return (
    <div className='checkout-item'>
      
      <span className='name'>{roomName}</span>
      {/* <div className='image-container'>
          <img src={roomImage} alt='item' />
        </div> */}
      <span className='name'>{hotelName}</span>
      <span className='quantity'>
        
        <span className='value'>{checkInDate.substring(0,10)}---{checkOutDate.substring(0,10)}</span>
       
      </span>
      <span className='price'>{roomCount}</span>
      <span className='price'>{Difference_In_Days*roomPrice*roomCount}$</span>
      <div
        className='remove-button'
       onClick={()=>{
       clearItemFromCart(props.roomOrder);
       DeleteData(reservationIds);
       }}
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
