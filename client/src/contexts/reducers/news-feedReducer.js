export const newsFeedReducer = (state, action) => {
    switch(action.type){
        case 'NEWSFEED':
            return action.data;
        case 'RESET':
            return []
        default:
            return state;
    }
}