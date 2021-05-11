import React,{ useState } from 'react'

import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import GoogleMap from '../components/GoogleMap'
const Test=(props)=>{
     const {hotel,location}=props;
     const{lon,lat}=location;
    const [isMapOpen, showMapToggle] = useState(false);
    console.log("props is",props)
    return(
        <div>
      
       <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{hotel}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
             onClick={() => showMapToggle(!isMapOpen)}
              color='grey'
              size='tiny'
              content={isMapOpen ? 'Hide map' : 'Show map'}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {isMapOpen && (
        
        <GoogleMap
        lat={lat}
        lng={lon}
        />
      )}
        </div>
    )
}


export default Test