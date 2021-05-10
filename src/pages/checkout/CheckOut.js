import React , {useContext,useState}from 'react';
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
        <div
        className='remove-button'
      >
        &#10005;
      </div>
      </div>
     
{/* {const singleOrder= {
  "roomIdPrefix": "5sWlE9k9EL6BVcExvGlJ1X",
  "reservationIds": [
      "1b7cd561-7cc9-482a-b20b-280d65151489",
      "8095527b-bea1-494b-8f32-b88a9ad3194b",
      "c25ae8b6-9a02-4957-8af8-b31e61296d6f",
      "d0ad592a-7a34-4889-96f0-fc83cb15b9a8",
      "d98778e7-e3eb-46bb-a2f4-d5f8ff81f7dd"
  ],
  "hotelName": " DoubleTree by Hilton Hotel Alana - Waikiki Beach",
  "checkInDate": "2021-05-10T00:00:00.000Z",
  "checkOutDate": "2021-05-12T00:00:00.000Z",
  "cancelledTime": null
};} */}
     {console.log("function is trigger and remained items are ",cartItems)}
      {cartItems.map( roomOrder => {
       
        const temproom= getRoomAccordingToRoomId(roomOrder.roomIdPrefix)
        const reserveCount=roomOrder.reservationIds.length;
        const roomName=temproom.name;
        const roomImage=temproom.images[1];
        console.log("room inside checkout is ",temproom.price)
        totalPrice=totalPrice+temproom.price*reserveCount;
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