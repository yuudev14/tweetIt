import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import '../../styles/css/home.css';
import {isInViewport} from '../methods/method';
import logo from '../../assets/tweetIt.png';
import axios from 'axios';
import SignUp from './login_signup/sign-up';
import Login from './login_signup/login';
import { IsLogin } from '../../contexts/isLogin';

const Home = (props) => {
    const {dispatch} = useContext(IsLogin);
    const [form, setForm] = useState('log-in');
    const [registerInfo, setRegisterInfo] = useState({
        username : '',
        email : '',
        password : '',
        retry_password : '',
    });
    const [loginInfo, setLoginInfo] = useState({
        username : '',
        password : '',
    });
    const [registerErr, setRegisterErr] = useState({
        err_username : '',
        err_email : '',
        err_password : '',
        err_retry_password : ''
    });

    useEffect(()=>{
        console.log(registerErr);
        

    }, [registerErr]);

    //show navigation in mobile
    const activateNav = () => {
        document.querySelector('.nav-options').classList.toggle('active-nav');
    }
    // parameters for the typing animation
    let isTyping = false;
    let original = '';
    let copy = 'Let the world hear what you want to say!';
    let i = 0;
    let speed = 100;

    //an animation event so when the slogan is in window it will animate
    document.addEventListener('scroll', () => {
        const box = document.querySelector('.about1-container');
        if(isInViewport(box)){
            if(!isTyping){
                    console.log('hi');
                    isTyping=true;
                    setTimeout(()=>{
                        const interval = setInterval(() => {
                            original += copy[i];
                            i++
                            document.querySelector('.slogan').textContent = original
                            if(original === copy){
                                clearInterval(interval);
                            }
                            speed = 100
                        }, speed);
                    }, 500)   
            }
        }
    });

    const register = (e) => {
        e.preventDefault();
        axios.post('/authentication/register', registerInfo)
            .then(res => {
                if(res.data === true){
                    console.log(true);
                }else{
                    setRegisterErr(res.data);
                }
                setRegisterInfo({
                    username : '',
                    email : '',
                    password : '',
                    retry_password : '',
                });
            });

    };
    const login = (e) => {
        e.preventDefault();
        axios.post('/authentication/log-in', loginInfo)
            .then(res => {
                console.log(res.data);
                dispatch({type : 'LOGIN', code: res.data});
                props.history.push('/');
            });

    };
    const setRegisterForm = (key, value) => {
        setRegisterInfo({
            ...registerInfo,
            [key] : value
        });
    };
    const setLoginForm = (key, value) => {
        setLoginInfo({
            
            ...loginInfo,
            [key] : value
        });
    };
    //toggle forms method
    const chooseLoginForm = () => {
        document.querySelector('.login').classList.add('btnActive');
        document.querySelector('.sign-up').classList.remove('btnActive');
        setForm('log-in')
    }
    const chooseSignupForm = () => {
        document.querySelector('.login').classList.remove('btnActive');
        document.querySelector('.sign-up').classList.add('btnActive');
        setForm('sign-up')
    }

    return ( 
        <div className='Home'>
            <header>
                <nav className='nav-home'>
                    <div className='logo'>
                        <h1>tweetIt</h1>
                        <i onClick={activateNav} className=' fa fa-angle-down'></i>
                    </div>
                    <div className='nav-options'>
                        <ul>
                            <Link><li>Home</li></Link>
                            <Link to='/sign-in'><li>Sign in</li></Link>
                        </ul>
                    </div>
                </nav> 
            </header>
            <main>
                <div className='authenticate'>
                    <div className='authenticate-container'>
                        <div className='logo-icon'>
                            <img src={logo}/>
                            <h1>Share your thoughts now!</h1>
                        </div>
                        <div className='login-sign-up-authenticate'>
                            <div className='login_or_sign-up'>
                                <button className='login btnActive' onClick={chooseLoginForm}>Log-in</button>
                                <button className='sign-up' onClick={chooseSignupForm}>Sign-up</button>

                            </div>
                            {form === 'sign-up' ? <SignUp registerInfo={registerInfo} setRegisterForm={setRegisterForm} register={register}/> : <Login loginInfo={loginInfo} setLoginForm={setLoginForm} login={login}/>}
                            
                            

                        </div>
                       
                       

                    </div>
                </div>
                <div className='about1-container'>
                    <div>
                        <h3>tweet it wants to...</h3>
                        <h1 className='slogan'></h1>
                        <span className='type-cursor'></span>
                    </div>
                    

                </div>
                <div className='about2-container'>

                </div>
                <div className='about3-container'>

                </div>

            </main>
            
            <footer>
            

            </footer>
        </div>
     );
}
 
export default Home;