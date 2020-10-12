export const suggestionReducer = (state, action) => {
    switch(action.type){
        case 'SUGGESTION' :
            return action.data;
        default:
            return state
    }
}
