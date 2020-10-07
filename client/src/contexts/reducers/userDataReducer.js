export const userDataReducer = (state, action) => {
    switch(action.type){
        case 'USERDATA':
            return action.data;
        case 'RESET':
            return {
                posts:[],
                friendRequest : []
            }
        default:
            return state;
    }
}