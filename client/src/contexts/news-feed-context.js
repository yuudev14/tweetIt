import React, {createContext, useReducer} from 'react';
import { newsFeedReducer } from './reducers/news-feedReducer';

export const NEWS_FEED = createContext()
const NewsFeedContext = (props) => {
    const [newsFeed, dispatch_newsFeed] = useReducer(newsFeedReducer, []);
    return ( 
        <NEWS_FEED.Provider value={{newsFeed, dispatch_newsFeed}}>
            {props.children}
        </NEWS_FEED.Provider>
     );
}
 
export default NewsFeedContext;