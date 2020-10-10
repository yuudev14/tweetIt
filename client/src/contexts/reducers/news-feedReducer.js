export const newsFeedReducer = (state, action) => {
    switch(action.type){
        case 'NEWSFEED':
            return action.data;
        case 'RESET':
            return [{
                _id : '',
                comments : [],
                Likes : []
            }];
        default:
            return state;
    }
}