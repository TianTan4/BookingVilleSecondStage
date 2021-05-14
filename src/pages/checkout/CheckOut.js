import React , {useContext,useState,useEffect}from 'react';
import {RoomContext} from '../../context'
import StripeCheckoutButton from '../../components/StripeButton'
import StyledHero from '../../components/StyledHero'
import Banner from '../../components/Banner'
import {Link} from 'react-router-dom'
import Image from '../../images/defaultBcg.jpeg'
import CheckOutItem from './CheckOutPageItem'
import Loading from '../../components/Loading'
const CheckoutPage = () => {
 
  const context=useContext(RoomContext)
  const {
    currentUser,roomOrders,getRoomAccordingToRoomId,getDataLoading
  }=context;
  var totalPrice=0;
  const [cartItems, setCartItems] = useState(roomOrders);
  useEffect(() => {
    setCartItems(roomOrders);
  }, [roomOrders]);
  const filterItemFromCart = (cartItems, item) =>
  cartItems.filter(cartItem => cartItem.roomIdPrefix !== item.roomIdPrefix);
  const clearItemFromCart = item =>
  setCartItems(filterItemFromCart(cartItems, item));

  const DeleteData=(Ids)=>{
    console.log("backend delete operation is triggered and reservationIDs sent are",Ids)
    const apiEndpoint =
    "https://ak5v0aru07.execute-api.us-west-2.amazonaws.com/v1/";
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
         Authorization: currentUser,},
        body: JSON.stringify({      
                       reservationIds:Ids
     })
    };
  fetch(apiEndpoint + "cancel-reservation",requestOptions)
    
        .catch(error => {
                             
                            console.error('There was an error when deleting data!', error);
                     });              
}

    
    


//   var pubulishOrders=[];
//   var tempOrder={};
//   testroomOrders.forEach(function(order,index){
//     var count=0;
//     // console.log("item is ",order)
//     // console.log("index is ",index)
//     const IdForCountPurpose1=order.roomId.substring(0,10);

//     testroomOrders.forEach(function(order2,index2){
//       const IdForCountPurpose2=order2.roomId.substring(0,10);
//       if(IdForCountPurpose1===IdForCountPurpose2){
//              count=count+1;
//       }
//     })
//     tempOrder={...order,count};
//     pubulishOrders.push(tempOrder);
//   })
// console.log("after loop, pubulishOrders is", pubulishOrders)
// var finalOrders=[];
// finalOrders = pubulishOrders.filter((thing, index, self) =>
//   index === self.findIndex((t) => (
//     t.roomId=== thing.roomId 
//   ))
// )



// pubulishOrders.forEach(function(order,index){
//   var count1=0;
//   const IdForCountPurpose3=order.roomId.substring(0,10);
//   pubulishOrders.forEach(function(order2,index){
//     const IdForCountPurpose4=order.roomId.substring(0,10);
//    if(IdForCountPurpose3===IdForCountPurpose4){
//      count1=count1+1
//    }
//   })
// })
console.log("currently,loading is ",getDataLoading)
if(getDataLoading){
  return <Loading />
} 

  return(
  <div className=' RoomContainer'>
  <StyledHero img={Image}>
                 <Banner title='Checkout Page'>
                 <Link to='/rooms' className='btn-primary'>
                 back to room
                 </Link>
                 </Banner>
             </StyledHero>  
  <div className='checkout-page'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>roomType</span>
        </div>

        <div className='header-block'>
          <span>Hotel</span>
        </div>
        <div className='header-block'>
          <span>Reservation Date</span>
        </div>
        <div className='header-block'>
          <span>Rooms</span>
        </div>
        <div className='header-block'>
          <span>Total Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      
      </div>
     
     {console.log("currently cartItems are  ",cartItems)}
     {console.log("currently roomOrders are  ",roomOrders)}
      {cartItems.map( roomOrder => {
        console.log("roomOrder is",roomOrder)
        const {checkInDate,checkOutDate}=roomOrder;
        const date1 = new Date(checkInDate);
        const date2 = new Date(checkOutDate);
        const Difference_In_Time = date2.getTime() - date1.getTime();
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        //if(roomOrder.roomIdPrefix===''){
       // roomOrder.roomIdPrefix='4xVmJMy1J4PvINn1SNeA1q'
       // }
        const temproom= getRoomAccordingToRoomId(roomOrder.roomIdPrefix);
        
        const reserveCount=roomOrder.reservationIds.length;
        const roomName=temproom.name;
        const roomImage=temproom.images[1];
        
        totalPrice=totalPrice+temproom.price*reserveCount*Difference_In_Days;
        return( <CheckOutItem key={roomOrder.roomId} 
        clearItemFromCart={clearItemFromCart}
        DeleteData={DeleteData}
        roomImage={roomImage} 
        roomName={roomName} 
        roomPrice={temproom.price} 
        roomOrder={roomOrder} 
        roomCount={reserveCount}/>)
      })}

      <div className='total'>TOTAL: {totalPrice} $</div>
      <div className='test-warning'>
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: 01/22 - CVV: 123
      </div>
      <StripeCheckoutButton price={totalPrice} />
      </div>
     
      </div>)
      
    }
    export default CheckoutPage;