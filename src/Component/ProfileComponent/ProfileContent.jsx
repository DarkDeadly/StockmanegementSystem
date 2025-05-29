import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Input, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import './profilecontent.css'
import Btn from '../button/Btn'
import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, updatePassword } from 'firebase/auth'
import { auth, db } from '../../util/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { PasswordVerif } from '../../util/util'
const ProfileContent = () => {
    const [ProfileUser, setProfileUser] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passHidden, setpassHidden] = useState(false)
    const [confirmpassHidden, setconfirmpassHidden] = useState(false)
    const [Password, setPassword] = useState("")
    const [NewPassword, setNewPassword] = useState("")
    const [currenpassError, setcurrenpassError] = useState("")
    const [Username, setUsername] = useState("")
    const errors = PasswordVerif(NewPassword)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setPassword("")
        setNewPassword("")
    };

    const ShowPass = () => {
        setpassHidden(!passHidden)
    }

    const showConfirm = () => {
        setconfirmpassHidden(!confirmpassHidden)
    }

    useEffect(() => {
        const ProfileUserShowcase = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(user)
                try {
                    const UserFetch = await getDoc(doc(db, "Users", user.uid))
                    if (UserFetch.exists) {
                        setProfileUser({
                            ProfilePic: user.photoURL || "",
                            data: UserFetch.data(),
                            createdAt: user.metadata.creationTime
                        })
                    }

                } catch (error) {
                    console.log(error)
                }
            }
        })

        return () => ProfileUserShowcase()
    }, [])


    const HandlepasswordChange = async (password, newPass) => {
        try {
            const user = auth.currentUser
            if (!user?.email) {
                message.error("Your account doesn't have an email. Cannot reauthenticate.");
                return;
            }
            const credential = EmailAuthProvider.credential(user.email, password)
            const currentPassTrue = await reauthenticateWithCredential(user, credential)
            if (currentPassTrue) {
                const PasswordVerification = PasswordVerif(newPass)
                if (PasswordVerification.length === 0) {
                    await updatePassword(user, newPass)

                    console.log("Password updated successfully");
                    alert("Password successfully updated");
                    setPassword("")
                    setNewPassword("")
                    setIsModalOpen(false)

                }

            }
        } catch (error) {
            console.log(error)
            if (error.code === "auth/invalid-credential") {
                setcurrenpassError("Incorrect current password.")
                setPassword("")
                setNewPassword("")
            } else {
                message.error("Failed to update password.");
            }
        }
    }

    const UsernameEdit = async (username, currentUsername) => {
        const trimmeduserName = username || currentUsername
        const user = auth.currentUser
        try {
            await updateDoc(doc(db, "Users", user.uid), { username: trimmeduserName })
            message.success("Username updated successfully");
            window.location.reload()
        } catch (error) {
            console.log(error)
        }

    }
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
                        style={{ background: '#FF770A' }}
                    />
                    <p>{ProfileUser?.data?.username || 'Unknown User'}</p>
                    <p>{ProfileUser?.createdAt || 'Joined at Unknown Date'}</p>
                </div>
                <div className="Profile__Form">
                    <form action="" className='Profile__FormContent'>
                        <h2>Account Settings</h2>
                        <Input
                            size="large"
                            placeholder={ProfileUser?.data?.username || "Username"}
                            prefix={<UserOutlined />}
                            onChange={(e) => setUsername(e.target.value)}

                        />
                        <div className="formBtns">
                            <Btn btnText='Change Password' btnClass=' navBtn Btns' btnClick={showModal} />
                            <Btn btnText='Submit Changes' btnClass=' navBtn Btns' btnClick={() => UsernameEdit(Username, ProfileUser?.data?.username)} />
                        </div>


                    </form>
                </div>
            </div>
            <Modal
                title="Change Your Password"
                closeIcon={<span aria-label="Close">×</span>}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="password__ChangeInput">
                    <Input
                        size="large"
                        placeholder='Current Password'
                        prefix={<LockOutlined />}
                        type={passHidden ? 'text' : 'password'}
                        onChange={(e) => setPassword(e.target.value)}
                        suffix={passHidden ? <EyeInvisibleOutlined
                            onClick={ShowPass} /> : <EyeOutlined onClick={ShowPass} />}
                    />
                    {currenpassError && <p className="error-message">{currenpassError}</p>}
                    <Input
                        size="large"
                        placeholder='New Password'
                        prefix={<LockOutlined />}
                        type={confirmpassHidden ? 'text' : 'password'}
                        onChange={(e) => setNewPassword(e.target.value)}
                        suffix={confirmpassHidden ? <EyeInvisibleOutlined
                            onClick={showConfirm} /> : <EyeOutlined onClick={showConfirm} />}
                    />
                    <Btn
                        btnText='Submit'
                        btnClass='navBtn Btns'
                        btnClick={() => {
                            const confirmChange = window.confirm(`Are you sure you want to Change your password ?`);
                            if (confirmChange) {
                                HandlepasswordChange(Password, NewPassword)
                            }
                        }
                        }

                        disabled={!Password || !NewPassword || errors.length > 0}
                    />
                    {NewPassword && errors.length > 0 && (
                        <ul className="error-message" >
                            {errors.map((err, i) => (
                                <li key={i}>{err}</li>
                            ))}
                        </ul>
                    )}
                </div>

            </Modal>
        </div>
    )
}

export default ProfileContent
