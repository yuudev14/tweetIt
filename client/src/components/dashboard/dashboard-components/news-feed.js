import React from 'react';
import user from '../../../assets/user.png';

const NewsFeeds = ({post, username}) => {
    return (
        <div className='news-feed'>
            <div className='profile_logo'>
                <div className='logo'>
                    <img src={user} />
                </div>
            </div>
            <div className='feed-content'>
                <div className='feed-user-info'>
                    <p className='feed-username'>{username}</p>
                    <p className='date'>10/06/20</p>
                </div>
                <div className='tweet-content'>
                    <p>{post.tweet}</p>
                </div>
                <div className='icons'>
                    <ul>
                        <li>
                            <i className='fa fa-heart'></i>
                            <p>12</p>
                        </li>
                        <li>
                            <i className='fa fa-comment'></i>
                            <p>12</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      );
}
 
export default NewsFeeds;