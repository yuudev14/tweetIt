export const isLoginReducer = (state, action) =>{
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                isAuth : true,
                code : action.code
            }
        default:
            return state;
    }
}