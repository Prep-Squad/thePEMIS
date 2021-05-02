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
<img className= 'libgreet' src='https://scontent-lga3-1.xx.fbcdn.net/v/t1.15752-9/180788259_5469574526447216_8357495854579756410_n.png?_nc_cat=107&ccb=1-3&_nc_sid=ae9488&_nc_ohc=1eRVwT1RZsEAX8FCVb1&_nc_ht=scontent-lga3-1.xx&oh=92d9b5cc19ac5ead0f8711a24bfbfc33&oe=60B3D69A'/>
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
