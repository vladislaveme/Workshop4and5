import React from 'react';
import {Link} from 'react-router';
import {unixTimeToString} from '../util';
export default
class Comment extends React.Component {
  handleLikeClick(clickEvent) {
    clickEvent.preventDefault();
    if(clickEvent.button === 0) {
      // Callback function for both the like and unlike cases.
      var callbackFunction = (updatedLikeCounter) => {
        this.setState({likeCounter: updatedLikeCounter});
      };
      if(this.didUserLike()) {
        // User clicked 'unlike' button.
        unlikeComment(this.state._id, 4, callbackFunction);
      }
      else{
        // User clicked 'like' button.
        likeComment(this.state._id, 4, callbackFunction);
      }
    }
  }
  /**
  * Returns 'true' if the user liked the item.
  * Returns 'false' if the user has not liked the item.
  */
  didUserLike() {
    var likeCounter = this.state.likeCounter;
    var liked = false;
    // Look for a likeCounter entry with userId 4 -- which is the
    // current user.
    for(var i = 0; i < likeCounter.length; i++) {
      if(likeCounter[i]._id === 4) {
        liked =true;
        break;
      }
    }
    return liked;
  }

  render() {
      return (
        < div >
          < div className = "media-left media-top" >
            PIC
          < /div>
          < div className = "media-body" >
            <Link to={"/profile/" + this.props.author._id}>
              {this.props.author.fullName}
            </Link>
            {this.props.children}
            < br / >
            < a href = "#" >
              Like
            < /a> ·
            <a href="#">Reply</a > ·
            {unixTimeToString(this.props.postDate)}
          < /div>
          <div className="media-footer">
            <a href="#">
              {this.props.likeCounter.length} people like this
            </a>
          </div>
        < /div >
      )
    }
}
