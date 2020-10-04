import React, {useContext, useState, useEffect} from 'react';
import user from '../../../assets/user.png';
import axios from 'axios';
import {IsLogin} from '../../../contexts/isLogin';
import { USERDATA } from '../../../contexts/userData';

const NewTweet = () => {
    const {auth} = useContext(IsLogin);
    const {userData, dispatch} = useContext(USERDATA);
    const [tweet, setTweet] = useState({
        image : '',
        tweet : ''
    });

    const typeTweet = (e) => {
        setTweet({
            ...tweet,
            tweet : e.target.value
        });
    }

    const addTweet = (e) => {
        e.preventDefault();
        axios.post(`/dashboard/addTweet/${auth.code}`, tweet)
            .then(res => {
                document.querySelector('.new-Tweet').classList.toggle('active-new-tweet');
                setTweet({
                    ...tweet,
                    tweet : ''
                });
                dispatch({type : 'USERDATA', data : res.data});
            });


    }
    return (
        <>
            <div className='user_pic'>
                <img src={user} />                 
            </div>
            <form onSubmit={addTweet} className='newTweetForm'>
                <div className='.form'>
                    <textarea onChange={typeTweet} value={tweet.tweet} placeholder="What's Happening"></textarea>
                    <div className='uploaded-img' ></div>
                </div>
                <div className='formIconsContainer'>
                    <div className='icons'></div>
                    <input type='submit' value='Tweet' />
                </div>
            </form>
        </>
      );
}
 
export default NewTweet;