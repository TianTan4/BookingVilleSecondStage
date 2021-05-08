import React , {useContext}from 'react';
import {RoomContext} from '../../context'
import StripeCheckoutButton from '../../components/StripeButton'
import StyledHero from '../../components/StyledHero'
import Banner from '../../components/Banner'
import {Link} from 'react-router-dom'
import Image from '../../images/defaultBcg.jpeg'
import CheckOutItem from './CheckOutPageItem'
const CheckoutPage = () => {
    
  const context=useContext(RoomContext)
  const {
    roomOrders
  }=context;
  
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


     
      {roomOrders.map(roomOrder => (
        <CheckOutItem key={roomOrder.roomid} roomOrder={roomOrder} />
      ))}



      <div className='total'>TOTAL: 300 $</div>
      <div className='test-warning'>
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: 01/22 - CVV: 123
      </div>
      <StripeCheckoutButton price={300} />
      </div>
     
      </div>)
      
    }
    export default CheckoutPage;