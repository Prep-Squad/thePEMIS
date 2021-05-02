import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getMemesThunk } from "../store/images";
import {motion} from 'framer-motion';


export class Library extends React.Component {

  // componentDidMount() {
   
  //     console.log(this.props.match.params)
  //     this.props.getMemes(this.props.user.id);
  // }
  componentDidUpdate(prevProps){
    console.log('this.props.userId: ' , this.props.userId)
if(prevProps.userId !== this.props.userId){
  this.props.getMemes(this.props.userId)
}
  }

render() {
    const memes = this.props.memes;
    console.log('meme.imageUrl: ', this.props.memes)

    return (
      <div>
        { !memes.length ? 
        (<h2> L O A D I N G... </h2>) :
      (<div className='all-memes-view'>
{/* <h1>Your Meme Library:</h1>       */}
<img className= 'libgreet' src='https://scontent-lga3-1.xx.fbcdn.net/v/t1.15752-9/180740827_756499985036305_305772885211588514_n.png?_nc_cat=103&ccb=1-3&_nc_sid=ae9488&_nc_ohc=o0UaGAeXqToAX8oh-j7&_nc_ht=scontent-lga3-1.xx&oh=d14ba0bd11534f08ab8a3be58375bb36&oe=60B5431B'/>
<div>
        <div className='meme-container'>
          {memes.map((meme) => (
            <div className= 'meme-image' key={meme.id}>
            <motion.img  animate={{ opacity: 1 }}
      initial={{opacity: 0}}
      transition={{ duration: 1}}
      whileHover={{ scale: 1.3,  boxShadow: "0px 0px 18px 6px #15FFF7", }}
      height='300'
      width='300'
       src={meme.imageUrl} height={100} width={100}/>
            </div>
          ))}
          </div>
        </div>
      </div>
    )
        }
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
   memes: state.memes,
   userId: state.auth.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMemes: (userId) => dispatch(getMemesThunk(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);
