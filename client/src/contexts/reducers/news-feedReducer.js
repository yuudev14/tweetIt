export const newsFeedReducer = (state, action) => {
    switch(action.type){
        case 'NEWSFEED':
            return action.data;
        default:
            return state;
    }
}