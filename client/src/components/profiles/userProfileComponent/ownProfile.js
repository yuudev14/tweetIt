import React, {useEffect, useContext, useState} from 'react';
import HomeNewsFeed from '../../dashboard/dashboard-components/NewsFeedandNewTweet';
import user from '../../../assets/user.png';
import { USERDATA } from '../../../contexts/userData';
import axios from 'axios';
import { IsLogin } from '../../../contexts/isLogin';

const OwnProfile = (props) => {
    
    const {userData, dispatchUser} = useContext(USERDATA);
    const {auth} = useContext(IsLogin);
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const [editProfile, setEditProfile] = useState({
        username : '',
        email : '', 
        password : '',
        retr_password : ''
    });

    const editProf = () => {
        document.querySelector('.userHomeProfile-section .editUser').classList.toggle('editUserActive')
    }

    const setEdit = (key, value) => {
        setEditProfile({
            ...editProfile,
            [key] : value

        })
    }
    const url = 'https://api.cloudinary.com/v1_1/yutakaki/image/upload';
    const preset = 'ml_default';

    const saveEditProf = (e) => {
        e.preventDefault();
        axios.post(`/dashboard/editProfile/${auth.code}`, editProfile)
            .then(res => {
                if(res.data.hasOwnProperty('err_username')){
                    console.log(res.data);

                }else{
                    dispatchUser({type : 'USERDATA', data : res.data});
                    document.querySelector('.userHomeProfile-section .editUser').classList.remove('editUserActive')

                }
                
            })

    };
    
    const profPic = userData.profilePic === '' ? user : userData.profilePic

    const settingImage = (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('upload_preset', preset);
        axios.post(url,formData)
            .then(res => {
                console.log(res.data);
                const imageUrl = res.data.secure_url;
                console.log(imageUrl)
                axios.post(`/dashboard/change-profile-pic/${auth.code}`, {imageUrl})
                    .then(res => {
                        dispatchUser({type : 'USERDATA', data : res.data});
                        
                    });

            })
            .catch(err => console.log(err))
    }
    const settingCover = (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('upload_preset', preset);
        axios.post(url,formData)
            .then(res => {

                const imageUrl = res.data.secure_url;
                axios.post(`/dashboard/change-cover-pic/${auth.code}`, {imageUrl})
                    .then(res => {
                        dispatchUser({type : 'USERDATA', data : res.data});
                        
                    });

            })
            .catch(err => console.log(err))

    }




    
    return ( 
        <section className='userHomeProfile-section'>
            <div className='editUser'>
                <form className='editUserForm' onSubmit={saveEditProf}>
                    <h1>Edit Profile</h1>
                    <div className='input-container'>
                        <i class="fa fa-user"></i>
                        <input type='text' placeholder={`username : ${userData.username}`} onChange={(e) => setEdit('username', e.target.value)}/>
                    </div>
                    <div className='input-container'>
                        <i class="fa fa-envelope"></i>
                        <input type='email'  placeholder={`username : ${userData.email}`} onChange={(e) => setEdit('email', e.target.value)}/>
                    </div>
                    <div className='input-container'>
                        <i class="fa fa-lock"></i>
                        <input type='password' placeholder={`password`} onChange={(e) => setEdit('password', e.target.value)} />
                    </div>
                    <div className='input-container'>
                        <i class="fa fa-lock"></i>
                        <input type='password' placeholder={`retry password`} onChange={(e) => setEdit('retry_password', e.target.value)}/>
                    </div>
                    <input type='submit' value='Save'/>
                </form>
                <div onClick={editProf} className='editProfileOwner-background'>

                </div>
                

            </div>
            <div className='Userpicture'>
                <div className='coverPhoto'>
                        
                        <img src={userData.coverPic} />
                        <input onChange={settingCover} type='file' id='coverPic' accept="image/*" multiple={false} />
                        <label htmlFor='coverPic' className='fa fa-camera'></label>

                </div>
                <div className='profilePicAndBtn'>
                    
                    <div className='prof-pic'>
                    
                        <input onChange={settingImage} type='file' id='file' accept="image/*" multiple={false} />
                        
                        <img src={profPic} />
                        <label htmlFor='file' className='fa fa-camera'></label>
                        <p>{userData.username}</p>



                    </div>
                    <button onClick={editProf}>Edit Profile</button>

                </div>
                

            </div>
            <div className='friend-total-container'>
                <h3>Friends</h3>
                <button>See All</button>
            </div>
            <div className='user-posts'>
                <HomeNewsFeed category='user' />
            </div>
            

        </section>
     );
}
 
export default OwnProfile;