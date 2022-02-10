import React from 'react'
import './Share.css'
import { PermMedia ,Label,Room ,EmojiEmotions} from '@material-ui/icons'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';
import {api} from "../../API/Api"

 const Share = () => {
    const Api=api.url.API_URL;
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const {user}=useContext(AuthContext);
    const desc=useRef();
    const [file,setFile]=useState(null)

    const submitHandler= async (e)=>{
        e.preventDefault();
        const newPost={
            userId:user._id,
            desc:desc.current.value
        }
        try{
            await axios.post(Api+"/posts", newPost)

        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className='shareContainer'>
            <div className='shareWrapper'>
                <div className='shareTop'>
                    <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} className='shareProfileImg'alt=''></img>
                    <input 
                    placeholder={'Whats in your mind ' + user.username + "?"}
                    className='shareInput' ref={desc}>
                    </input>
                </div>
                <hr className='shareHr'/>
                <form className='shareBotton' onSubmit={submitHandler}>
                    <div className='shareOptions'>
                        <label htmlFor='file' className='shareOption'>
                            <PermMedia htmlColor='Red'className='shareIcons'/>
                            <span className='shareOptionsText'>Photos or Videos</span>
                            <input style={{display:"none"}}type='file' id='file' accept='.jpg,.png,.jpeg' onChange={(e)=>setFile(e.target.files[0])}></input>
                        </label>
                        <div className='shareOption'>
                            <Label htmlColor='Blue' className='shareIcons'/>
                            <span className='shareOptionsText'>Tag</span>
                        </div>
                        <div className='shareOption'>
                            <Room htmlColor='Green' className='shareIcons'/>
                            <span className='shareOptionsText'>Location</span>
                        </div>
                        <div className='shareOption'>
                            <EmojiEmotions htmlColor='Yellow' className='shareIcons'/>
                            <span className='shareOptionsText'>Feelings</span>
                        </div>
                        <button className='shareButton' type='submit'>Share</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}
export default Share