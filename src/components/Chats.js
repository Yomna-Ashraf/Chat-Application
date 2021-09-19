/*import React, { useRef, useState, useEffect} from "react"
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine"
import { auth } from '../firebase'
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = ()=>{
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState('true')
    //console.log(user.uid)
    const handleLogout = async () =>{
        await auth.signOut();
        history.push('/')
    }
    const getFile = async(url)=>{
        const response = await fetch(url); 
        const data = response.blob()
        return new File([data],"userPhoto.jpg",{type:"image/jpeg"})
    }
    useEffect(() =>{
        if(!user){
            history.push('/');
            return;
        }
        axios.get('https://api.chatengine.io/users/me/', {
            headers:{
                "project-id":"87c4e112-c13b-4250-a5f7-c9e07ff18625",
                "user-name":user.email,
                "user-secret": user.uid,
            }
        })
        .then(()=>{
            setLoading(false);
        })
        .catch(()=>{
            let formdata = new FormData();
            formdata.append('email',user.email);
            //formdata.append('username',user.displayName);
            formdata.append('secret',user.uid)
            getFile(user.photoURL)
                .then((avatar)=>{
                    formdata.append('avatar', avatar, avatar.name)
                    axios.post("https://api.chatengine.io/users/",
                        formdata,
                        { headers:{ "private-key":"858da4ab-38b0-48a3-a3f9-08b80507005d" } }
                    )
                    .then(()=> setLoading(false))
                    .catch((error) => console.log(error))
                })
        })
    }, [user, history])
    //if(!user || loading) return 'Loading...'
    return(
        <div className="chats-page">
            <div className = "nav-bar">
                <div className = "logo-tab">
                    Awesome Chat
                </div>
                <div onClick = {handleLogout} className = "logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine
                height = "calc(100vh - 66px)"
                projectID ="87c4e112-c13b-4250-a5f7-c9e07ff18625"
                userName = {user.email}
                userSecret = {user.uid}
            />
        </div>
    )
}
export default Chats;
*/
import React, { useRef, useState, useEffect } from "react"

import axios from 'axios'
import { useHistory } from "react-router-dom"
import { ChatEngine } from 'react-chat-engine'

import { useAuth } from "../contexts/AuthContext"

import { auth } from "../firebase"

export default function Chats() {
  const didMountRef = useRef(false)
  const [ loading, setLoading ] = useState(true)
  const { user } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    await auth.signOut()
    history.push("/")
  }

  async function getFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "test.jpg", { type: 'image/jpeg' });
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true

      if (!user || user === null) {
        history.push("/")
        return
      }
      
      // Get-or-Create should be in a Firebase Function
      axios.get(
        'https://api.chatengine.io/users/me/',
        { headers: { 
          "project-id": '87c4e112-c13b-4250-a5f7-c9e07ff18625',
          "user-name": user.email,
          "user-secret": user.uid
        }}
      )

      .then(() => setLoading(false))

      .catch(e => {
        let formdata = new FormData()
        formdata.append('email', user.email)
        formdata.append('username', user.email)
        formdata.append('secret', user.uid)

        getFile(user.photoURL)
        .then(avatar => {
          formdata.append('avatar', avatar, avatar.name)

          axios.post(
            'https://api.chatengine.io/users/',
            formdata,
            { headers: { "private-key": "858da4ab-38b0-48a3-a3f9-08b80507005d" }}
          )
          .then(() => setLoading(false))
          .catch(e => console.log('e', e.response))
        })
      })
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    }
  }, [user, history])
  

  if (!user || loading) return <div />

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>
          Awesome Chat
        </div>

        <div onClick={handleLogout} className='logout-tab'>
          Logout
        </div>
      </div>

      <ChatEngine 
        height='calc(100vh - 66px)'
        projectID='87c4e112-c13b-4250-a5f7-c9e07ff18625'
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  )
}