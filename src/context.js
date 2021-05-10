import React, { Component } from 'react'
// import items from "./data"
import Client from './Contentful'
import * as moment from 'moment'

const RoomContext=React.createContext();

  class RoomProvider extends Component {
    
      constructor(props) {
        super(props)
       this.state={
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading:true,
        getDataLoading:true,
        type:'all',
        capacity:1,
        price:0,
        minPrice:0,
        maxPrice:0,
        minSize:0,
        maxSize:0,
        breakfast:false,
        pets:false,
        hotel:"all",
        roomOrders:[],
        currentUser:null,
        checkInDate:moment((new Date()), 'DD-MM-YYYY').format().substring(0,10),
        checkOutDate:moment((new Date()), 'DD-MM-YYYY').format().substring(0,10),
        reserveCount:1,
        peopleCount:1,
        testroomOrders:[
            {
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
            },
            {
                "roomIdPrefix": "65wNls8W9swzseZggssHF9",
                "reservationIds": [
                    "247e2fba-ba57-464b-b459-fbd106b97b2e",
                    "73a83930-08b0-4033-a7ab-8d573480a7e7",
                    "7aeb9e52-9df3-4177-b441-5b7d03e79206",
                    "9ec877bc-780b-4d59-a734-e32fd8306d4b",
                    "f30c6433-e358-4d66-a642-a7e59c6a1018"
                ],
                "hotelName": "Hilton Hawaiian Village Waikiki Beach Resort",
                "checkInDate": "2021-05-14T00:00:00.000Z",
                "checkOutDate": "2021-05-15T00:00:00.000Z",
                "cancelledTime": null
            },
            {
                "roomIdPrefix": "4tGsnEhVC8qZhvPcX43AGn",
                "reservationIds": [
                    "675692d8-7bfd-4f0c-8761-507246332f80",
                    "7fd99d35-10de-4455-a4f5-fa3d09993350"
                ],
                "hotelName": " DoubleTree by Hilton Hotel Alana - Waikiki Beach",
                "checkInDate": "2021-05-14T00:00:00.000Z",
                "checkOutDate": "2021-05-15T00:00:00.000Z",
                "cancelledTime": null
            },
            {
                "roomIdPrefix": "3v2U4AvTzcg9BBfpGIjDig",
                "reservationIds": [
                    "c95b890c-278b-45b9-bfe9-71966b81b981",
                    "d9bb2eff-ecad-46f9-8052-5355dd3b1e4d"
                ],
                "hotelName": " DoubleTree by Hilton Hotel Alana - Waikiki Beach",
                "checkInDate": "2021-05-12T00:00:00.000Z",
                "checkOutDate": "2021-05-13T00:00:00.000Z",
                "cancelledTime": null
            }
        ]
    }
    
   
    }
//change and pass reservation information including checkin,out, numbers of people and rooms  


passReservationInf=(checkInDate,checkOutDate,reserveCount,peopleCount)=>{
this.setState({checkInDate,checkOutDate,reserveCount,peopleCount})
}



//get reservation data

getReservationData=()=>{
    console.log("get reservation data has been trigger and currentUser is ",this.state.currentUser);
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
         Authorization: this.state.currentUser},
        body: JSON.stringify({      
            //   "customerId": currentUser,         
                        "checkInDate": moment((new Date()), 'DD-MM-YYYY').format().substring(0,10),
                        "checkOutDate": '2023-05-22'               
     })
    };
   
  
fetch('https://ak5v0aru07.execute-api.us-west-2.amazonaws.com/v1/query-reservation', requestOptions)
         .then(async (response) => {
           const data = await response.json();
   
           // display data in UI.
           this.setState({ roomOrders: data,getDataLoading:false });
         })
    // .then(async response => {
        //     const data = await response.json();
           
        //     // display data in UI.
        //     this.setState({ postId: data })
    
        // })

        .catch(error => {
                             this.setState({ errorMessage: error.toString() });
                            console.error('There was an error!', error);
                     });  
                     
                     
}

//getData
getData=async()=>{
    try {
        let response=await Client.getEntries({skip:0, limit: 300, content_type:"bookingVille"
    });
    //order:"fields.price"
        // console.log("response.items are", response.items)// convert response from an object to
        //an array
        let rooms=this.formatData(response.items)
       
        let featuredRooms=rooms.filter(room=>room.featured===true)
        let maxPrice=Math.max(...rooms.map(item=>item.price))
        let maxSize=Math.max(...rooms.map(item=>item.size))
        
        this.setState(({rooms,featuredRooms,sortedRooms:rooms,loading:false,
        price:maxPrice,maxPrice,maxSize}))
    } catch (error) {
        console.log(error)
    }
}
//get Currentuser
getCurrentUser=()=>{
    const url=window.location.href;
    // const url="https://bookingvalley.netlify.app/#id_token=eyJraWQiOiJVQUtTcDlnWFNPSWZyODl1TDlzdjBaa3FLb2N1QVp2V00wUkVwek0xYjRBPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiM2JxSjk5b1NMUm1Fel9xeWh3RjZXUSIsInN1YiI6ImZiN2Y0NDllLTdmZmUtNDdmNy05NTQ5LTgxNDliM2I5MDhiMSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl85bHZTaUdyYzUiLCJjb2duaXRvOnVzZXJuYW1lIjoiZmI3ZjQ0OWUtN2ZmZS00N2Y3LTk1NDktODE0OWIzYjkwOGIxIiwiZ2l2ZW5fbmFtZSI6InRpYW4iLCJhdWQiOiIxZnFxYmgwaTdmb2Y4YjhsMzdsM3IzaWhjOSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjE5Njc5MjA1LCJleHAiOjE2MTk2ODI4MDUsImlhdCI6MTYxOTY3OTIwNSwiZmFtaWx5X25hbWUiOiJ0YW4iLCJlbWFpbCI6Ino1MTMzMTYxQGdtYWlsLmNvbSJ9.yU9F1JjI36mheBD4Da0DSfGTVjWB1q8UonAwPvobA2ooyNAqI-TOWFs1Qdafn2wsNfiptmTkNo4seu1-V4-eKsljU-lEcXOT4cfm2EyzEq_JeqEtjh1QomhdsYAEpS9xCevHhXYhAxHQZovtlh3LYtUwHPSrAYr4CGmVx0gezcPuzOFT8WP9LXd0Y9v1SPBSMCUb-WnEzvXbJD_fwZ_AbI_0RDM1VcREAdPU5KTXVgqhAnsqH9MTdSZm0YpNkApKvgB9z2fPGzt2Ydg56OJPAlmC58aPObAKhqAOwLJcL6cw5qzVEZ3a3u7Wk9PGQoayOgNj0lQAiP90w96kAqqPYA&access_token=eyJraWQiOiIzM05yUE5VcFhZdmpaYjlSRkFHR3Z1eWdoM05CcnNsZFo2NFpzWGJzdWx3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYjdmNDQ5ZS03ZmZlLTQ3ZjctOTU0OS04MTQ5YjNiOTA4YjEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjE5Njc5MjA1LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl85bHZTaUdyYzUiLCJleHAiOjE2MTk2ODI4MDUsImlhdCI6MTYxOTY3OTIwNSwidmVyc2lvbiI6MiwianRpIjoiZmViNTg2OTItYmFiZS00NjViLTk5MDYtYTljZDE5NTUxYzFkIiwiY2xpZW50X2lkIjoiMWZxcWJoMGk3Zm9mOGI4bDM3bDNyM2loYzkiLCJ1c2VybmFtZSI6ImZiN2Y0NDllLTdmZmUtNDdmNy05NTQ5LTgxNDliM2I5MDhiMSJ9.EpgZG3aWLiZdEj0EmJuNBAhfcn5Ihh9jOvDo1VAwIqJ5RSxZzwdvGS0MabgZa2T3IxPVOsmIAmn9Gcjf5Bm1PEf2XvFZYOvscpoKOGFxYpD0ik3hI6YO9SP1d1lSsHyIho77wnggVV2RboWafJPvNBa4J4S0J6HgAEpex7kO4Di8PMgyQ6b0MlBaIdk4RHOilAIGJewHt_X-OUj6H0XNcW8OPqY3lXiwKBGNS-PWPOs0lBcZtsSt_mQPqy0_TOiuCoXpzu-KNzApIcBWxz_Z_AfGVD7KhmU6Ht8-BXW5Fhae47S5uIAgEWvCQBA3wQDU-qkV0dyRUIhtsKljJDlfOg&expires_in=3600&token_type=Bearer";
     var index=url.indexOf("#id_token=");
     var index2=url.indexOf("&access_token");
     
    // var index=url.indexOf("l");
   console.log("current index is ",index)
   console.log("current window.location.href is  ",window.location.href)
   if(index!==-1){
   
 const currentToken=url.substring(index+10,index2);
 console.log(" url is  ",currentToken)
 this.setState({currentUser:currentToken});
 }
 
}


//reservation 


componentDidMount(){
//    this.getData();
this.getData();
   this.getCurrentUser();
//    this.sendData();
  console.log("context component has been rendered")
 
// 1.
// const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//                 "customerId": "testCustomer",
//                 "hotelName": "Hilton Waikiki Beach",
//                 "roomType": "Mountain View Suite",
//                 "checkInDate": "2021-4-23",
//                 "checkOutDate": "2021-4-25",
//                 "reserveCount": 1
//             })
// };

// fetch('https://zmtiry43m6.execute-api.us-west-2.amazonaws.com/v1/reserve', requestOptions)
//     .then(async response => {
//         // check for error response
//                 if (!response.ok) {
//                         // get error message from body or default to response status
//                         const error = (data && data.message) || response.status;
//                         return Promise.reject(error);
//                 }
//                 // succeeded
//                 const data = await response.json();
//                 // display data in UI.
//                 this.setState({ postId: data })
//                 // ...

//         })
//         .catch(error => {
//                 this.setState({ errorMessage: error.toString() });
//                 console.error('There was an error!', error);
//         });    


// const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ title: 'React POST Request Example' })
// };
// fetch('https://reqres.in/api/posts', requestOptions)
//     .then(async response => {
//         const isJson = response.headers.get('content-type')?.includes('application/json');
//         const data = isJson && await response.json();

//         // check for error response
//         if (!response.ok) {
//             // get error message from body or default to response status
//             const error = (data && data.message) || response.status;
//             return Promise.reject(error);
//         }

//         this.setState({ postId: data.id })
//     })
//     .catch(error => {
//         this.setState({ errorMessage: error.toString() });
//         console.error('There was an error!', error);
//     });






// fetch('https://reqres.in/api/posts')
// .then(response => response.json())
// .then(data => this.setState({ postId: data }));
   
}



formatData(items){
    let tempItems=items.map(item=>{
        let id=item.sys.id
        let images=item.fields.images.map(image=>image.fields.file.url);
        let room={...item.fields,images,id}
        return room;
    });
    return tempItems
}
getRoom=(slug)=>{
    let tempRooms=[...this.state.rooms];
 
    const room=tempRooms.find((room)=>room.slug===slug)
    
    return room;
}

getRoomAccordingToRoomId=(roomId)=>{
    const roomIdPart=roomId.substring(0,10);
    let tempRooms=[...this.state.rooms];
 console.log("getRoom has been triggered and temprooms are",tempRooms)
    const room=tempRooms.find((room)=>room.id.substring(0,10)===roomIdPart)
    
    return room;
}


handleChange=event=>{
    const target=event.target
    console.log("target type is ", target.type);
    const value=target.type==='checkbox'?target.checked:target.value
     console.log("value is ", value);
    const name=event.target.name
      console.log("name is ",name);
    
    this.setState({[name]:value},this.filterRooms)
}
signOut=()=>{
    this.setState({currentUser:null})
}

filterRooms=()=>{
    let{rooms,type,capacity,price,minSize,maxSize,breakfast,pets,hotel}=this.state;
    let tempRooms=[...rooms]
    // console.log("this.state is  ", this.state)
    //transform value
    capacity=parseInt(capacity)
    price=parseInt(price);
  //filter by search bar


    //filter by type
    if(type!=='all'){
       tempRooms=tempRooms.filter(room=>room.type===type)
    }
   
     //filter by capacity
     if(capacity!==1){
        tempRooms=tempRooms.filter(room=>room.capacity>=capacity)
    }
     //filter by hotel
    if(hotel!=='all'){
        tempRooms=tempRooms.filter(room=>room.hotel===hotel)
    }
    //filter by price
     tempRooms=tempRooms.filter(room=>room.price<=price);
     //filter by size
    tempRooms=tempRooms.filter(room=>room.size>=minSize&&room.size<=maxSize)
    //filter by breakfast
    if(breakfast){
        tempRooms=tempRooms.filter(room=>room.breakfast===true)
    }
    //filter by pets
    if(pets){
        tempRooms=tempRooms.filter(room=>room.pets===true)
    }


    //change state
    this.setState({
        sortedRooms:tempRooms
            })
}

   

    render() {
        console.log("roomOrders is",this.state.roomOrders);
        return (
            
  <RoomContext.Provider value={{...this.state,getRoomAccordingToRoomId:this.getRoomAccordingToRoomId,getReservationData:this.getReservationData,passReservationInf:this.passReservationInf,getRoom:this.getRoom,handleChange:this.handleChange,signOut:this.signOut}}>
 {this.props.children}
 {console.log("the checkin data inside context is ",this.state.checkInDate)}
 {/* {console.log("error message is,",this.state.errorMessage)}
 {console.log("currentUser of context is",this.state.currentUser)}
 {console.log("current window.location.href is",window.location.href)} */}
 </RoomContext.Provider>
        )
    }
}
const RoomConsumer=RoomContext.Consumer;

export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return <RoomConsumer>
        {value=><Component {...props} context={value}/>}
        </RoomConsumer>
    }
}


export {RoomProvider,RoomConsumer,RoomContext}