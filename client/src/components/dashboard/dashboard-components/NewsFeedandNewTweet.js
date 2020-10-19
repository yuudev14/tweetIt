import React, {useContext} from 'react';
import { NEWS_FEED } from '../../../contexts/news-feed-context';
import { USERDATA } from '../../../contexts/userData';
import NewsFeeds from './news-feed';
import NewTweet from './newTweet';


const HomeNewsFeed = ({category}) => {
    const {newsFeed} = useContext(NEWS_FEED);
    const {userData} = useContext(USERDATA);
    
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