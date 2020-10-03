export const isLoginReducer = (state, action) =>{
    switch(action.type){
        case 'LOGIN':
            return{
                isAuth : true,
                code : action.code
            }
        case 'LOGOUT':
            return{
                isAuth : false,
                code : '',
            }
        default:
            return state;
    }
}