import React from 'react';
const Login = ({setLoginForm, login, loginErr}) => {
    return ( 
        <>
            <h2>Login-in</h2>
            <p>Welcome back!</p>
            
            <form onSubmit={login}>
                <p>{loginErr.msg}</p>
                <div className='input-container'>
                    <i class="fa fa-user"></i>
                    <input type='text' placeholder='Email'  onChange={(e) => setLoginForm('username', e.target.value)} required/>
                </div>
                <div className='input-container'>
                    <i class="fa fa-lock"></i>
                    <input type='password' placeholder='Password'  onChange={(e) => setLoginForm('password', e.target.value)} required/>
                </div>
                <input type='submit' value='Login'/>
            </form>
            
        </>
     );
}
 
export default Login;