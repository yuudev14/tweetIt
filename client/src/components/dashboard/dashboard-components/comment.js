import React, {useState, useEffect, useContext} from 'react';
import user from '../../../assets/user.png';
import { USERDATA } from '../../../contexts/userData';

const Comment = ({comment, username, id}) => {
    const {userData} = useContext(USERDATA);


    const dropdownToggle = (e) => {
        document.querySelectorAll('.comment .dropdownOption').forEach(d => d === e.target.nextSibling ?
             d.classList.toggle('dropdown-active') : d.classList.remove('dropdown-active'))
        // e.target.nextSibling.classList.toggle('dropdown-active')
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
                                    
                                    <button>Delete</button>
                                    <button>Edit</button>
                                </div>
                            </>

                        ) : null}
                        

                    
                    

                </div>
                <form>
                    <input type='text' value={comment} disabled/>
                    
                </form>
                {/* <p>{comment}</p> */}
                
            </div>
        </div>
     );
}
 
export default Comment;