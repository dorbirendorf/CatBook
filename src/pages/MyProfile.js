import React , { useState }from "react";
import UserCard from '../components/UserCard'
import UserService from '../utils/user-services'


export default function MyProfile(props) {

    const [state, setState] = useState({ 
        redirect: null,
        userReady: false,
        currentUser: { name: "",email:'' ,avatar:null }
     });    

    UserService.getMyUserInfo().then((userInfo)=>{  //update user info and avatar   
        UserService.getMyUserAvatar().then((userAvatar)=>{
            setState((prev)=>{
                return {
                 ...prev
                    ,currentUser:{
                        name:userInfo.name
                        ,email:userInfo.email
                        ,avatar:userAvatar
                    }
                    }})
        })});

const me={
    name:state.currentUser.name,
    email:state.currentUser.email,
    avatar:state.currentUser.avatar
}
return (
<div>
  <h1>{state.currentUser.avatar}</h1>
  <h1>{state.currentUser.name}</h1>
  <h1>{state.currentUser.email}</h1>
  </div>  
)
}