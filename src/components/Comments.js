import React,{ useState } from 'react'

import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import SingeleComment from '../components/SingleCommentPage'
const Test=(props)=>{
     const {comments}=props;
     
    const [isMapOpen, showMapToggle] = useState(false);
    console.log("props is",props)
    return(
        <div>
      
       <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='comment alternate' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>Comments</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
             onClick={() => showMapToggle(!isMapOpen)}
              color='grey'
              size='tiny'
              content={isMapOpen ? 'Hide Comments' : 'Show Comments'}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {isMapOpen && (
        comments.map( comment => {
       
        return( <SingeleComment comment={comment}/>)
      })
       
      )}
        </div>
    )
}


export default Test