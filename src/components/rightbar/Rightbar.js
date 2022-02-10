import React from 'react'
import './Rightbar.css'
import { Users } from '../../dummyData'
import Online from '../online/Online'

 const Rightbar = ({ user }) => {
     const HomeRightbar=()=>{

        return(
            <>
            <div className='birthdayContainer'>
                       <img className='birthdayImg' src='/assets/gift.png'alt=''></img>
                       <span class='birthdayText'>
                           <b>Sulogna</b> and <b> 3 others </b>has birthday today
                       </span>
           </div>
                   <img className="rightbarAd" src="assets/ad.png" alt="" />
                   <h4 className="rightbarTitle"><b>Online Friends</b></h4>
                   <ul className='rightbarFriendList'>
                      {Users.map(u=>(
                          <Online key={u.id} user={u}/>
                      ))}
                       
                       
                   </ul>
            </>
        )
     }
    const ProfileRightbar=()=>{
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;

        return (
            <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/1.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/2.jpeg`}
              alt=""              
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/3.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/4.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/5.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/6.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
        </div>
      </>
        )
    }
    return (
        <div className="rightbar">
            <div className='rightbarWrapper'>
            {user ? <ProfileRightbar/> : <HomeRightbar/>}
                
            </div>
        </div>
    )
}
export default Rightbar