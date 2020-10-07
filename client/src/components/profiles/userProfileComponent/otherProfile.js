import React from 'react';
import user from '../../../assets/user.png';

const OtherProfile = () => {
    return ( 
        <section className='userHomeProfile-section'>
            <div className='Userpicture'>
                <div className='coverPhoto'>

                </div>
                <div className='profilePicAndBtn'>
                    <div className='prof-pic'>
                        <img src={user} />
                        <p>nanan</p>



                    </div>
                    <button>Edit Profile</button>

                </div>
                

            </div>
            <div className='friend-total-container'>
                <h3>Friends</h3>
                <button>See All</button>
            </div>

        </section>
     );
}
 
export default OtherProfile;