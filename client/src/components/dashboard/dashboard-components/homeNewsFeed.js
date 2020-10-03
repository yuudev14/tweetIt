import React from 'react';
import NewsFeeds from './news-feed';
import NewTweet from './newTweet';
const HomeNewsFeed = () => {
    return (  
        <section className='newsFeed-section main-active'>
            <div className='new-Tweet'>
                <NewTweet />
            </div>
            <div className='news-feed-container'>
                <NewsFeeds />
                <NewsFeeds />
                <NewsFeeds />
                <NewsFeeds />
                
            </div>
        </section>
    );
}
 
export default HomeNewsFeed;