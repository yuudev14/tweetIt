import { json } from 'express';
import React, {createContext, useReducer} from 'react';
import {isLoginReducer} from './reducers/isLoginReducer';

export const ISLOGIN = createContext();
const IsLogin = (props) => {
    const [auth, dispatch] = useReducer(isLoginReducer, {}, () => {
        const localStorage = localStorage.getItem('auth');
        return localStorage ? json.parse(localStorage) : {
            isAuth : false,
            code : ''
        }
    });
    return ( 
        <ISLOGIN.Provider value = {{auth, dispatch}}>
            {props.children}
        </ISLOGIN.Provider>
     );
}
 
export default IsLogin;