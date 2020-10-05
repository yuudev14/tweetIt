import React, {createContext, useReducer, useEffect} from 'react';
import { userDataReducer } from './reducers/userDataReducer';

export const USERDATA = createContext();
const  UserData= (props) => {
    const [userData, dispatch] = useReducer(userDataReducer, {
        posts:[],
        friendRequest : []
    });
    useEffect(() => {
        console.log(userData);
    },[userData])
    return ( 
        <USERDATA.Provider value={{userData, dispatch}}>
            {props.children}

        </USERDATA.Provider>
     );
}
 
export default UserData;