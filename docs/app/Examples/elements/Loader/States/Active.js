import React from 'react'
import { Loader, Image, Segment } from 'semantic-ui-react'

const Active = () => (
  <Segment>
    <Loader active />

    <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
  </Segment>
)

export default Active
