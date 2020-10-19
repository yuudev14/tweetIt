import React from 'react';

const SignUp = ({registerSuccess,registerErr, register, setRegisterForm, registerInfo}) => {
    return ( 
        <>
            <h2>Registration</h2>
            <p>Create your Account</p>
            
            <form onSubmit={register}>
                <p>{registerSuccess}</p>
                <div className='input-container'>
                    <i class="fa fa-user"></i>
                    <input type='text' value={registerInfo.username} placeholder='Username' onChange={(e) => setRegisterForm('username', e.target.value)} required/>
                </div>
                <p>{registerErr.err_username}</p>
                <div className='input-container'>
                    <i class="fa fa-envelope"></i>
                    <input type='email' value={registerInfo.email} placeholder='Email'  onChange={(e) => setRegisterForm('email', e.target.value)} required/>
                </div>
                <p>{registerErr.err_email}</p>
                <div className='input-container'>
                    <i class="fa fa-lock"></i>
                    <input type='password' value={registerInfo.password} placeholder='Password'  onChange={(e) => setRegisterForm('password', e.target.value)} required/>
                </div>
                <p>{registerErr.err_password}</p>
                <div className='input-container'>
                    <i class="fa fa-lock"></i>
                    <input type='password' value={registerInfo.retry_password} placeholder='Retry-password'  onChange={(e) => setRegisterForm('retry_password', e.target.value)} required/>
                </div>
                <p>{registerErr.err_retry_password}</p>
                <input type='submit' value='Register'/>
            </form>
        </>
     );
}
 
export default SignUp;