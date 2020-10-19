import React, {createContext, useReducer} from 'react';
import { userDataReducer } from './reducers/userDataReducer';

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