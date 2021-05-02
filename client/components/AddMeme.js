import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { uploadMeme, uploadMemeThunk } from '../store/images';
import Preview from './Preview';
import axios from 'axios'
import Tags from './Tags'


class AddMeme extends Component {
  constructor(){
    super();
     this.state = {
    image: null,
    loading: false
  }
  this.Upload_To_AWS_S3 = this.Upload_To_AWS_S3.bind(this);
  this.closeAlert = this.closeAlert.bind(this)
  }
 
  
  componentDidMount(){
    //this.props.response('','');
  }

  async Upload_To_AWS_S3(e) {
    e.preventDefault();
    this.setState({
       loading: true
    });
    let formData = new FormData();
    formData.append("meme", this.state.image);
    formData.append('userId', this.props.auth.id)
    this.props.uploadMemeThunk(formData, this.props, this.props.auth.id);
  }

  componentDidUpdate(prevProps) {
    if( prevProps.memeUrl !== this.props.memeUrl ) {
        this.setState({
            loading: false
        });
    }
  }

  closeAlert(e) {
    e.preventDefault();
    //this.props.response('','');
  }

  render() {
    console.log('this.props.auth: ', this.props.auth)
    return (
      <div>
        <div>
            <div>
              <h3>
                 Add A Meme To Your Library below!
              </h3>
            </div>
        </div>
        <div >
        <Tags />
          <div>
           {/* <button variant='contained' className="upload-btn bg-primary text-white">Choose Meme!</button> */}
            <input name="image" type="file" onChange={ e => {
              this.setState({ image: e.currentTarget.files[0] })
            }} />
          </div>
        </div>
        <div>
          <Preview file={this.state.image} />
        </div>
        { this.state.image ? <div>
          <button  onClick={this.Upload_To_AWS_S3}>{ this.state.loading ? 'Uploading...' : 'Upload to the PEMIS' }</button>
        </div> : null }
        { this.props.msg ? 
          <div>
              <div >
                <button className="close" onClick={this.closeAlert.bind(this)} data-dismiss="alert" aria-label="close">×</button>
                <span dangerouslySetInnerHTML={{__html: this.props.msg}} />
              </div>
          </div> : null }
      </div>
    );
  }
}

AddMeme.propTypes = {
    memeUrl: PropTypes.string,
    msg: PropTypes.string,
    type: PropTypes.string
}

const mapStateToProps = ({memeUrl,msg,type, auth}) => ({memeUrl,msg,type, auth});
const mapDispatchToProps = dispatch => bindActionCreators( { uploadMeme, uploadMemeThunk }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddMeme)