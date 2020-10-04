export const userDataReducer = (state, action) => {
    switch(action.type){
        case 'USERDATA':
            return action.data;
        default:
            return state;
    }
}