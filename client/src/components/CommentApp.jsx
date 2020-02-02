import React, { Component, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import {
  SpinnerContainer,
  SpinnerIcon,
  CommentIcon,
  CommentList,
} from './styles/CommentAppStyled';
import { fetchPagination, makeCommentItems } from '../helpers';
import { render } from 'enzyme';

/**
 *
 * @param {integer} songId - the id of the song selected, to be retrieved from server
 * @return {ReactComponent} Containing a list of paginating comments for provided songId
 */

class CommentApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songId: props.songId,
      commentArray: [],
      nextPagination: 0,
      totalCommentsAvailable: 0,
      firstLoad: true,
      commentsRemaining: 0,
      users: {},
      loading: false,
      PAGINATION_LIMIT: 10,
    };
  }

  /**
   * @method
   * Adds onscroll event listener to the window where the app is mounted
   * This is used to trigger a fetch for next pagination data
   */
  
  /**
   * fetches the next pagination of comment data from CommentApp server using
   * stateful data (this.state.songId, this.state.nextPagination, and this.state.PAGINATION_LIMIT)
   * @method
   * @param {none} no parameters,
   * @return {none} no return, function asyncronously adds fetched data to state
   */
  populateNextComments() {
    this.setState({
      loading: true,
    });
    fetchPagination(
      this.state.songId,
      this.state.nextPagination,
      this.state.PAGINATION_LIMIT,
      )
      .then((stream) => stream.json())
      .then((data) => {
        if (this.state.firstLoad) {
          this.setState({
            totalCommentsAvailable: data.totalCount,
            commentsRemaining: data.totalCount - data.comments.length,
            firstLoad: false,
          });
        } else {
          this.setState({
            commentsRemaining:
            this.state.commentsRemaining - data.comments.length,
          });
        }
        this.setState({
          nextPagination: this.state.nextPagination + 1,
        });
        const usersObject = {};
        data.users.forEach((user) => {
          usersObject[user.id] = user;
        });
        this.setState({
          users: usersObject,
        });
        this.setState((state) => {
          const newComments = makeCommentItems(data.comments, usersObject);
          setTimeout(() => {
            this.setState({
              loading: false,
            });
          }, 200);
          console.log([...state.commentArray, ...newComments])
          return {commentArray: [...state.commentArray, ...newComments]};
        });
      })
      .catch((err) => console.log(err));
    }
    
    startPaginationEvent() {
      window.onscroll = debounce(
        () => {
          // if already loading, exit
          if (this.state.loading) {
            console.log('already loading');
            return;
          }
          if (
            Math.ceil(window.innerHeight + document.documentElement.scrollTop) >=
            document.documentElement.offsetHeight
          ) {
            if (this.state.commentsRemaining > 0) {
              console.log('loading next');
              this.populateNextComments();
            } else {
              console.log('Comments left: ', this.state.commentsRemaining);
            }
          }
        },
        500,
        { leading: true },
      );
    }

    /**
     *
     * @method
     */
  isLoading() {
    if (this.state.loading) {
      return (
        <SpinnerContainer data-test="spinner-container">
          <SpinnerIcon data-test="spinner-icon" className="spinner" />
        </SpinnerContainer>
      );
    }
    [];
  }

  /**
   * @method - lifecycle
   * When App mounts, fetch the page 0 of pagination and add
   * comments and users to state
   */
  componentDidMount() {
    this.startPaginationEvent();
    this.populateNextComments();
  }

  render() {
    console.log(this.state.commentArray);
    return (
      <CommentList data-test="comment-list">
        <CommentIcon data-test="comment-icon" />
        <span> {this.state.totalCommentsAvailable} comments</span>
        <hr />
        {this.state.commentArray}
        {this.isLoading()}
      </CommentList>
    );
  }
}

export default CommentApp;

/**
 * @function - functional hook version
 */
// const CommentApp = ({ songId }) => {
//   const [commentArray, setCommentArray] = useState([]);
//   const [nextPagination, setNextPagination] = useState(0);
//   const [totalCommentsAvailable, setTotalCommentsAvailable] = useState(0);
//   const [firstLoad, setFirstLoad] = useState(true);
//   const [commentsRemaining, setCommentsRemaining] = useState(0);
//   const [users, setUsers] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [PAGINATION_LIMIT] = useState(10)

//   /**
//    * Adds onscroll event listener to the window where the app is mounted
//    * This is used to trigger a fetch for next pagination data
//    */
//   window.onscroll = debounce(() => {
//     // if already loading, exit

//     if (loading) {
//       console.log('already loading');
//       return;
//     }
//     if (
//       Math.ceil(window.innerHeight + document.documentElement.scrollTop) >=
//       document.documentElement.offsetHeight
//     ) {
//       console.log(commentsRemaining);
//       if (commentsRemaining > 0) {
//         console.log('loading next');
//         populateNextComments();
//       } else {
//         console.log('Comments left: ', commentsRemaining);
//       }
//     }
//   }, 500, {leading: true});

//   /**
//    * fetches the next pagination of comment data from CommentApp server using
//    * stateful data (songId, nextPagination, and PAGINATION_LIMIT)
//    * @param {none} no parameters,
//    * @return {none} no return, function asyncronously adds fetched data to state
//    */
//   const populateNextComments = () => {
//     setLoading(true);
//     fetchPagination(songId, nextPagination, PAGINATION_LIMIT)
//       .then((stream) => stream.json())
//       .then((data) => {
//         if (firstLoad) {
//           setTotalCommentsAvailable(data.totalCount);
//           setCommentsRemaining(data.totalCount - data.comments.length);
//           setFirstLoad(false);
//         } else {
//           setCommentsRemaining(commentsRemaining - data.comments.length);
//         }
//         setNextPagination(nextPagination + 1);
//         const usersObject = {};
//         data.users.forEach((user) => {
//           usersObject[user.id] = user;
//         });
//         setUsers(() => {
//           return usersObject;
//         });
//         setCommentArray(() => {
//           const newComments = makeCommentItems(data.comments, usersObject);
//           setTimeout(() => {
//             setLoading(false);
//           }, 200);
//           return [...commentArray, ...newComments];
//         });
//       })
//       .catch((err) => console.log(err));
//   };

//   /**
//    * When App mounts, fetch the page 0 of pagination and add
//    * comments and users to state
//   */
//   useEffect(() => {
//     populateNextComments();
//   }, []);

//   const isLoading = () => {
//     if (loading) {
//       return (
//         <SpinnerContainer data-test="spinner-container">
//           <SpinnerIcon data-test="spinner-icon"className='spinner'/>
//         </SpinnerContainer>
//       )
//     }[]
//   };

//   return (
//     <CommentList data-test="comment-list">
//       <CommentIcon data-test="comment-icon"/>
//         <span> {totalCommentsAvailable} comments</span>
//       <hr />
//       {commentArray}
//       {isLoading()}
//     </CommentList>
//   );
// };

// export default CommentApp;
