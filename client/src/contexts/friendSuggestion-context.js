import React, {createContext, useReducer} from 'react';
import { suggestionReducer } from './reducers/suggestionReducer';

export const FRIEND_SUGGESTION = createContext()
const FriendSuggestions = (props) => {
    const [suggestionList, dispatch_suggestion] = useReducer(suggestionReducer, []);

    return ( 
        <FRIEND_SUGGESTION.Provider value={{suggestionList, dispatch_suggestion}}>
            {props.children}
        </FRIEND_SUGGESTION.Provider>
     );
}
 

export default FriendSuggestions;