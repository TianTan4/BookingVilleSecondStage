import React, { Component } from 'react'
import Banner from '../components/Banner'
import './checkout/checkout.styles.scss';
import {Link} from 'react-router-dom'
import {RoomContext} from '../context'
import StyledHero from '../components/StyledHero'
import defaultBcg from '../images/room-1.jpeg'
import Title from '../components/Title'
import CheckoutItem from '../components/CheckoutItem'
// import Map from '../components/GoogleMap'


export default class SingleRoom extends Component {
    constructor(props){
super(props)
this.state = {
    slug:this.props.match.params.slug,
    // reserveCount:1,
    // peopleCount:1,
    // checkInDate:moment((new Date()), 'DD-MM-YYYY').format().substring(0,10),
    // checkOutDate:moment((new Date()), 'DD-MM-YYYY').format().substring(0,10),
    defaultBcg
}
    }
static contextType=RoomContext;

componentDidMount(){}

//({
//                 "customerId": "testCustomer",
//                 "hotelName": "Hilton Waikiki Beach",
//                 "roomType": "Mountain View Suite",
//                 "checkInDate": "2021-4-23",
//                 "checkOutDate": "2021-4-25",
//                 "reserveCount": 1
//             })

// sendData=()=>{
//     const{getRoom,currentUser}=this.context;
//     console.log("the propos inside currentorder is  ",this.props)
//         const room=getRoom(this.state.slug);
//         const {name,hotel}=room;
//         console.log("inside send data, state is ",this.state)
//         console.log("inside send data, hotel is  ",hotel);
//         console.log("inside send data, room is  ",name);
//         console.log("currentUser is ",currentUser)
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' ,
//          Authorization: currentUser,},
//         body: JSON.stringify({      
//             //   "customerId": currentUser,
//                         "hotelName": hotel,
//                         "roomType": name,
//                         "checkInDate": this.state.checkInDate,
//                         "checkOutDate": this.state.checkOutDate,
//                         "reserveCount": this.state.reserveCount
//      })
//     };
   
//   fetch(apiEndpoint + "reserve",requestOptions)
//     .then(fetch('https://ak5v0aru07.execute-api.us-west-2.amazonaws.com/v1/query-reservation', requestOptions)
//          .then(async (response) => {
//            const data = await response.json();
   
//            // display data in UI.
//            this.setState({ postId: data });
//          })
//     )
    
//     // .then(async response => {
//         //     const data = await response.json();
           
//         //     // display data in UI.
//         //     this.setState({ postId: data })
    
//         // })

//         .catch(error => {
//                              this.setState({ errorMessage: error.toString() });
//                             console.error('There was an error!', error);
//                      });  
                     
                     
// }


// let date=value.getDate() + "-"+ parseInt(value.getMonth()+1) +"-"+value.getFullYear();
// console.log('data is ',date)

    render() {
       
        const{getReservationData,getRoom,currentUser,checkInDate,checkOutDate,reserveCount,peopleCount}=this.context
        const room=getRoom(this.state.slug)
     console.log("room inside currentorder is****** ",room)
        
        if(!room){
            return(<div className="error">
            <h3>no such room could be found...</h3>
            <Link to='/room' className="btn-primary">
                back to rooms
            </Link>
            </div>)
        }
        const {price,name,images,hotel}=room
        const date1 = new Date(checkInDate);
    const date2 = new Date(checkOutDate);
    const Difference_In_Time = date2.getTime() - date1.getTime();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        return (
            
            <div className=' RoomContainer'>
            {console.log("currentUser inside reservation is   ",currentUser)}
            {console.log("returned data is ",this.state.postId)};
             <StyledHero img={images[0]}>
                 <Banner title={`${name}`}>
                 <Link to='/rooms' className='btn-primary'>
                 back to room
                 </Link>
                 </Banner>
             </StyledHero>  
             
             <Title  title="Reservation Confirmed"/>
             <div className='checkout-page'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Room Picture</span>
        </div>
        <div className='header-block'>
          <span>Hotel</span>
        </div>
        <div className='header-block'>
          <span>Reservation Date</span>
        </div>
        <div className='header-block'>
          <span>Total Nights</span>
        </div>
        <div className='header-block'>
          <span>Single Night Price</span>
        </div>
        <div className='header-block'>
          <span>Rooms</span>
        </div>
      </div>
      <CheckoutItem Difference_In_Days={Difference_In_Days} price={price} hotel={hotel} image={images[0]} checkInDate={checkInDate} checkOutDate={checkOutDate} reserveCount={reserveCount} peopleCount={peopleCount}/> 
      <div className='total'>TOTAL: {Difference_In_Days*reserveCount*price}$</div>
      <div className='test-warning'>
       {console.log("days are",Difference_In_Days)}
       {console.log("reservavecount is ",reserveCount)}
       {console.log("price is",price)}
      </div>

      <div className='reserve '>
      {/* <Link to={`/rooms/${this.state.slug}/reservation`} className='btn-primary reserve back'>  
      Back TO change detail
      </Link> */}
             <Link to={`/checkout`} onClick={getReservationData} className='btn-primary reserve'>  
     CheckOut and Pay
      </Link>
</div >

      </div>
            

{/* <div>
<Map/>
</div> */}


             </div>
        )
}
}