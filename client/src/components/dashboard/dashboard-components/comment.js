import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import user from '../../../assets/user.png';
import { IsLogin } from '../../../contexts/isLogin';
import { USERDATA } from '../../../contexts/userData';

const Comment = ({comment, username, post_id, comment_id, postOwner,setPost}) => {
    const {userData} = useContext(USERDATA);
    const {auth} = useContext(IsLogin);
    const [commentValue, setComment] = useState(comment);

    


    const dropdownToggle = (e) => {
        document.querySelectorAll('.comment .dropdownOption').forEach(d => d === e.target.nextSibling ?
             d.classList.toggle('dropdown-active') : d.classList.remove('dropdown-active'))
        
    }
    const deleting = () =>{
        axios.post(`/dashboard/delete-comment/${auth.code}`,{
            post_id,
            comment_id,
            username : postOwner
        })
            .then(res => {
                // console.log(res.data)
                setPost(res.data);
            });
    }
    
    const edit = (e) => {
        e.target.parentElement.parentElement.nextSibling.firstChild.nextSibling.classList.add('inputPop')
        e.target.parentElement.parentElement.nextSibling.firstChild.nextSibling.focus();
        e.target.parentElement.classList.remove('dropdown-active')

    }
    

    const update = (e) => {
        e.preventDefault();
        e.target.firstChild.nextSibling.classList.remove('inputPop');
        setComment('');
        e.target.firstChild.disabled = true;
        axios.post(`/dashboard/update-comment/${auth.code}`,{
            post_id,
            comment_id,
            username : postOwner,
            updatedComment : commentValue
        })
            .then(res => {
                // console.log(res.data)
                setPost(res.data);
            });

    }
    const setValue = (e) => {
        setComment(e.target.value)
    }
    return ( 
        <div className='comment-content'>
            <div className='username-profile-comment'>
                <img src={user} />
            </div>
            <div className='comment'>
                <div className='username-and-options'>
                    <h3>{username}</h3>
                        {userData.username === username ? (
                            <>
                                
                                <i onClick={dropdownToggle } className='fa fa-angle-down'></i>

                                <div className='dropdownOption'>
                                    
                                    <button onClick={deleting}>Delete</button>
                                    <button onClick={edit}>Edit</button>
                                </div>
                            </>

                        ) : null}
                        

                    
                    

                </div>
                <form classname='editCommentForm' onSubmit={update}>
                    <p>{comment}</p>
                    <input onChange={setValue} type='text' placeholder='type updated comment'/>
                    
                </form>
                {/* <p>{comment}</p> */}
                
            </div>
        </div>
     );
}
 
export default Comment;