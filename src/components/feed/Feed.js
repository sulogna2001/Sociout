import React,{useState,useEffect, useContext} from 'react'
import './Feed.css'
import  Share from '../share/Share'
import Post from '../post/Post'
import axios from 'axios'
import {api} from '../../API/Api'
import { AuthContext } from '../context/AuthContext'

 const Feed = ({username}) => {
     const Api=api.url.API_URL;
     const {user}=useContext(AuthContext);
     const[posts,setPosts]=useState([]);
     useEffect(()=>{
         const fetchPosts= async () => {
             const res = username ? 
             await axios.get(Api + "/posts/profile/"+username):
             await axios.get(Api + "/posts/timeline/"+ user._id);
            //  console.log(res);s
             setPosts(res.data);
         }
         fetchPosts()

     },[username,user._id]);

    return (
        <div className="feedContainer">
            <div className='feedWrapper'>
                <Share/>
                {posts.map((p) => (
                    <Post key={p._id} post={p}/>
                ))}
                
            </div>
        </div>
    )
}
export default Feed