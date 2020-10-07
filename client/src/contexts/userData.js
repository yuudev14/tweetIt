import React, {createContext, useReducer, useEffect, useContext} from 'react';
import { userDataReducer } from './reducers/userDataReducer';
import axios from 'axios';
import { IsLogin } from './isLogin';
import { NEWS_FEED } from './news-feed-context';

export const USERDATA = createContext();
const  UserData= (props) => {
    const [userData, dispatchUser] = useReducer(userDataReducer, {
        posts:[],
        friendRequest : []
    });
    
    return ( 
        <USERDATA.Provider value={{userData, dispatchUser}}>
            {props.children}

        </USERDATA.Provider>
     );
}
 
export default UserData;