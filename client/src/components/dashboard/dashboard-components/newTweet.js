import React, {useContext, useState} from 'react';
import user from '../../../assets/user.png';
import axios from 'axios';
import {IsLogin} from '../../../contexts/isLogin';
import { USERDATA } from '../../../contexts/userData';
import { NEWS_FEED } from '../../../contexts/news-feed-context';

const NewTweet = () => {
    const {auth} = useContext(IsLogin);
    const {dispatch_newsFeed} = useContext(NEWS_FEED);
    const {dispatchUser} = useContext(USERDATA);
    const [tweet, setTweet] = useState({
        image : '',
        tweet : '',
        preview_image : null
    });

    const [err, setErr] = useState('')


    const typeTweet = (e) => {
        if(err !== ''){
            setErr('');
        }
        setTweet({
            ...tweet,
            tweet : e.target.value
        });
    }
    const setImagePreview = (e) => {
        setTweet({
            ...tweet,
            preview_image : URL.createObjectURL(e.target.files[0]),
            image : e.target.files[0]
        })
    }
    const url = 'https://api.cloudinary.com/v1_1/yutakaki/image/upload';
    const preset = 'ml_default';
    const addTweet = (e) => {
        e.preventDefault();
        document.querySelector('.tweetSubmit').disabled = true;
        if(tweet.preview_image){
            const formData = new FormData();
            formData.append('file', tweet.image);
            formData.append('upload_preset', preset);
            axios.post(url, formData)
                .then(res => {
                    axios.post(`/dashboard/addTweet/${auth.code}`, {tweet : tweet.tweet, image: res.data.secure_url})
                        .then(res => {
                            
                            if(res.data !== false){
                                document.querySelector('.tweetSubmit').disabled = false;
                                document.querySelector('.new-Tweet').classList.toggle('active-new-tweet');
                                setTweet({
                                    image : '',
                                    tweet : '',
                                    preview_image : ''
                                });
                                dispatchUser({type : 'USERDATA', data : res.data});
                                axios.get(`/dashboard/news-feed/${auth.code}`)
                                    .then(res => {
                                        dispatch_newsFeed({type : 'NEWSFEED', data : res.data});
                                    });
                            }else{
                                document.querySelector('.tweetSubmit').disabled = false;
                                setErr('you dont have any tweet yet');
                            }
                        });
                });
        }else{
            axios.post(`/dashboard/addTweet/${auth.code}`, {tweet : tweet.tweet, image: tweet.image})
                .then(res => {
                    if(res.data !== false){
                        document.querySelector('.tweetSubmit').disabled = false;
                        document.querySelector('.new-Tweet').classList.toggle('active-new-tweet');
                        setTweet({
                            image : '',
                            tweet : '',
                            preview_image : ''
                        });
                        dispatchUser({type : 'USERDATA', data : res.data});
                        axios.get(`/dashboard/news-feed/${auth.code}`)
                            .then(res => {
                                dispatch_newsFeed({type : 'NEWSFEED', data : res.data});
                            });
                    }else{
                        document.querySelector('.tweetSubmit').disabled = false;
                        setErr('you dont have any tweet yet');
                    } 
                });
        }
    }
    return (
        <>
            <div className='user_pic'>
                <img src={user} alt='user'/>                 
            </div>
            <form onSubmit={addTweet} className='newTweetForm'>
                <div className='.form'>
                    <p>{err}</p>
                    <textarea onChange={typeTweet} value={tweet.tweet} placeholder="What's Happening"></textarea>
                    <div className='uploaded-img' >
                        <img src={tweet.preview_image}/>
                    </div>
                    
                </div>
                <div className='formIconsContainer'>
                    <div className='icons'>
                        <input onChange={setImagePreview} type='file' id='postFile' accept="image/*" multiple={false} />
                        <label htmlFor='postFile' className='fa fa-camera'></label>
                    </div>
                    <input className='tweetSubmit' type='submit' value='Tweet' />
                </div>
            </form>
        </>
      );
}
 
export default NewTweet;