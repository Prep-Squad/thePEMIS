import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {

  return (
    <div className='container'>
    <img className='bgimg' src="http://www.image.farm/images/2021/05/01/2c89e82ebddf440d22351f301e8b5e4f.png"/>
    </div>
  )
  }

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
