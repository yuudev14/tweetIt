import React, {createContext, useReducer, useEffect, useContext} from 'react';
import { userDataReducer } from './reducers/userDataReducer';
import axios from 'axios';
import { IsLogin } from './isLogin';
import { NEWS_FEED } from './news-feed-context';

export const USERDATA = createContext();
const  UserData= (props) => {
    const {auth} = useContext(IsLogin);
    const {dispatch_newsFeed} = useContext(NEWS_FEED);
    const [userData, dispatch] = useReducer(userDataReducer, {
        posts:[],
        friendRequest : []
    });
    useEffect(() => {
        axios.get(`/dashboard/news-feed/${auth.code}`)
            .then(res => {
                dispatch_newsFeed({type : 'NEWSFEED', data : res.data});
            });
    },[userData])
    return ( 
        <USERDATA.Provider value={{userData, dispatch}}>
            {props.children}

        </USERDATA.Provider>
     );
}
 
export default UserData;