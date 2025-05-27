import React from 'react'
import Header from '../../Component/header/Header'
import ProfileContent from '../../Component/ProfileComponent/ProfileContent'
import "./profile.css"
const Profile = () => {
  return (
    <div className='profile'>
        <Header/>
        <div className="profilecontent">
            <ProfileContent/>
        </div>
    </div>
  )
}

export default Profile