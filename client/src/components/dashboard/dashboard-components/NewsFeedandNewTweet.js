import React, {useContext, useEffect} from 'react';
import { NEWS_FEED } from '../../../contexts/news-feed-context';
import { USERDATA } from '../../../contexts/userData';
import NewsFeeds from './news-feed';
import NewTweet from './newTweet';
import axios from 'axios'
import { IsLogin } from '../../../contexts/isLogin';


const HomeNewsFeed = ({category}) => {
    const {auth} = useContext(IsLogin);

    const {newsFeed, dispatch_newsFeed} = useContext(NEWS_FEED);
    const {userData} = useContext(USERDATA);
    
    // useEffect(()=>{
    //     axios.get(`/dashboard/news-feed/${auth.code}`)
    //     .then(res => {
    //         dispatch_newsFeed({type : 'NEWSFEED', data : res.data});
    //     });
    // },[]);
    return (  
        <section className='newsFeed-section main-active'>
            <div className='new-Tweet'>
                <NewTweet />
            </div>
            <div className='news-feed-container'>
                {category==='user' ? userData.posts.map((post, i)=> (
                    <NewsFeeds key={i} post={post} index = {i} username={userData.username}/>
                )) : newsFeed !== 'news-feed'? newsFeed.map((post,i) => <NewsFeeds key={i} index = {i} post={post} username={post.username}/>) : null}

                
            </div>
        </section>
    );
}
 
export default HomeNewsFeed;