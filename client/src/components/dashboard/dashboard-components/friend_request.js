import React, {useContext} from 'react';
import user from '../../../assets/user.png'
import { IsLogin } from '../../../contexts/isLogin';
import axios from 'axios';
import { USERDATA } from '../../../contexts/userData';

const FriendRequest = ({friendRequest}) => {
    const {auth} = useContext(IsLogin);
    const {dispatch} = useContext(USERDATA);
    const acceptFriend = () => {
        axios.post(`dashboard/acceptFriend/${auth.code}`, {
            username : friendRequest.username, 
            _id : friendRequest._id
        }).then(res => {
            axios.get(`/dashboard/user/${auth.code}`)
                .then(res => {
                    dispatch({type : 'USERDATA', data : res.data});
                });
        });

        
    }
    const reject = () => {
        axios.post(`/dashboard/reject/${auth.code}`,{
            _id : friendRequest._id
        }).then(res => {
            axios.get(`/dashboard/user/${auth.code}`)
                .then(res => {
                    dispatch({type : 'USERDATA', data : res.data});
                });
        })
    }

    return ( 
        <div className='friend_request_content' key={friendRequest._id}>
            <div className='user_profile'>
                <img src={user}/>
                <p>{friendRequest.username}</p>
            </div>
            <div className='accept_delete'>
                <button onClick={acceptFriend} className='accept'>Accept</button>
                <button onClick={reject} className='delete'>Delete</button>
            </div>

        </div>
     );
}
 
export default FriendRequest;