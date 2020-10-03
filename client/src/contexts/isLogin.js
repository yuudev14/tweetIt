import React, {createContext, useReducer, useEffect} from 'react';
import {isLoginReducer} from './reducers/isLoginReducer';

export const IsLogin = createContext();
const IsLoginProvider = (props) => {
    const [auth, dispatch] = useReducer(isLoginReducer, {}, () => {
        const authLocalStorage = localStorage.getItem('auth');
        return authLocalStorage ? JSON.parse(authLocalStorage) : {
            isAuth : false,
            code : ''
        }
    });
    useEffect(()=> {
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);
    return ( 
        <IsLogin.Provider value = {{auth, dispatch}}>
            {props.children}
        </IsLogin.Provider>
     );
}
 
export default IsLoginProvider;