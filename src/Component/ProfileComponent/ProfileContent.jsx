import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import './profilecontent.css'
import Btn from '../button/Btn'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../util/firebase'
import { doc, getDoc } from 'firebase/firestore'
const ProfileContent = () => {
    const [ProfileUser, setProfileUser] = useState()
        useEffect(() => {
          const ProfileUserShowcase = onAuthStateChanged(auth , async(user) => {
            if (user) {
                console.log(user)
                try {
                const UserFetch = await getDoc(doc(db , "Users" , user.uid)) 
                if (UserFetch.exists) {
                    setProfileUser({
                        ProfilePic : user.photoURL || "",
                        data : UserFetch.data(),
                        createdAt : user.metadata.creationTime
                    })
                }

                } catch (error) {
                    console.log(error)
                }
            }
          })
        
          return () => ProfileUserShowcase()
        }, [])
        console.log(ProfileUser)
  return (
    <div className='ProfileContent'>
        <div className="Profile">
            <div className="Profile__Header">
            <h1>Profile</h1>
            <p>Manage your Profile Settings and Preference</p>
        </div>
        <div className="Profile__Image">
             <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<UserOutlined />}
            style={{background : '#FF770A'}}
            />
            <p>{ProfileUser?.data?.username || 'Unknown User'}</p>
            <p>{ProfileUser?.createdAt || 'Joined at Unknown Date'}</p>
        </div>
        <div className="Profile__Form">
            <form action="" className='Profile__FormContent'>
                <h2>Account Settings</h2>
                <Input size="large" placeholder={ProfileUser?.data?.username || "Username"} prefix={<UserOutlined  />  } />
                <Input size="large" placeholder={ProfileUser?.data?.email || "Email"} prefix={<MailOutlined /> } type='email'/>
                <div className="formBtns">
                    <Btn btnText='Change Password' btnClass=' navBtn Btns'/>
                    <Btn btnText='Submit Changes' btnClass=' navBtn Btns'/>
                </div>


            </form>
        </div>
        </div>
    </div>
  )
}

export default ProfileContent
