import React from 'react'

import { Segment, Grid, Icon} from 'semantic-ui-react';

const Test=(props)=>{
     const {comment}=props;
     
  
    console.log("props is",props)
    return(
        <div>
      
       <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='commenting' size='large' color='blue' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{comment}</span>
          </Grid.Column>
          <Grid.Column width={4}>
           
          </Grid.Column>
        </Grid>
      </Segment>
      
        </div>
    )
}


export default Test