import React from 'react';

import StripeCheckoutButton from '../../components/StripeButton'
import StyledHero from '../../components/StyledHero'
import Banner from '../../components/Banner'
import {Link} from 'react-router-dom'
import Image from '../../images/defaultBcg.jpeg'

const CheckoutPage = () => {
    

  
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
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      <div className='total'>TOTAL: 300</div>
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