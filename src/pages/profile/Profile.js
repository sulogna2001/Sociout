import React, { useState,useEffect } from 'react'
import './Profile.css'
import  Topbar  from '../../components/topbar/Topbar'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import {api} from '../../API/Api'
import axios from 'axios'
import { useParams } from 'react-router'


 const Profile = () => {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const Api=api.url.API_URL;
    const [user,setUser]=useState([]);
    const username= useParams().username;

    useEffect(() =>{
        const fetchProfile= async()=>{
            try{
                const res= await axios.get( `${Api}/user?username=${username}`)
                setUser(res.data)
                console.log(res.data)
            }
            catch(err){
                console.log(err);
            }
            
        }
        fetchProfile()
    },[username])
    return (
        <>
        <Topbar/>
        <div className='profile'>
            <Sidebar/>
            <div className='profileRight'>
                <div className='profileRightTop'>
                    <div className='profileCover'>
                        <img src={user.coverPicture || PF+"person/cover.jpg"} alt="" className="profileCoverImg"></img>
                        <img src={user.profilePicture || PF+"person/noAvatar.png"} alt="" className="profileUserImg"></img>
                    </div>
                    <div className='profileInfo'>
                        <h4 className='profileInfoName'>{user.username}</h4>
                        <span className='profileInfoDesc'>{user.desc}</span>
                    </div>
                </div>
                <div className='profileRightBottom'>
                    <Feed username={username}/>
                    <Rightbar user={user}/>
                </div>
                
            </div>
            
        </div>
        </>
    )
}
export default Profile