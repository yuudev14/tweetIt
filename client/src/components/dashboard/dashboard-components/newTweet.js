import React from 'react';
import user from '../../../assets/user.png';

const NewTweet = () => {
    return (
        <>
            <div className='user_pic'>
                <img src={user} />                 
            </div>
            <div className='newTweetForm'>
                <form>
                    <textarea placeholder="What's Happening"></textarea>
                    <div className='uploaded-img' ></div>
                </form>
                <div className='formIconsContainer'>
                    <div className='icons'></div>
                    <input type='submit' value='Tweet' />
                </div>
            </div>
        </>
      );
}
 
export default NewTweet;