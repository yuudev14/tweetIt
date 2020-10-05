import React from 'react';

const SignUp = ({register, setRegisterForm, registerInfo}) => {
    return ( 
        <>
            <h2>Registration</h2>
            <p>Create your Account</p>
            <form onSubmit={register}>
                <div className='input-container'>
                    <i class="fa fa-user"></i>
                    <input type='text' value={registerInfo.username} placeholder='Username' onChange={(e) => setRegisterForm('username', e.target.value)} required/>
                </div>
                <div className='input-container'>
                    <i class="fa fa-envelope"></i>
                    <input type='email' value={registerInfo.email} placeholder='Email'  onChange={(e) => setRegisterForm('email', e.target.value)} required/>
                </div>
                <div className='input-container'>
                    <i class="fa fa-lock"></i>
                    <input type='password' value={registerInfo.password} placeholder='Password'  onChange={(e) => setRegisterForm('password', e.target.value)} required/>
                </div>
                <div className='input-container'>
                    <i class="fa fa-lock"></i>
                    <input type='password' value={registerInfo.retry_password} placeholder='Retry-password'  onChange={(e) => setRegisterForm('retry_password', e.target.value)} required/>
                </div>
                <input type='submit' value='Register'/>
            </form>
        </>
     );
}
 
export default SignUp;