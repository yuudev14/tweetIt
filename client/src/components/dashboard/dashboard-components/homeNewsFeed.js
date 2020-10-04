import React, {useContext} from 'react';
import { USERDATA } from '../../../contexts/userData';
import NewsFeeds from './news-feed';
import NewTweet from './newTweet';


const HomeNewsFeed = () => {
    const {userData} = useContext(USERDATA);
    return (  
        <section className='newsFeed-section main-active'>
            <div className='new-Tweet'>
                <NewTweet />
            </div>
            <div className='news-feed-container'>
                {userData.posts.map(post=> (
                    <NewsFeeds post={post} username={userData.username}/>
                ))}

                
            </div>
        </section>
    );
}
 
export default HomeNewsFeed;