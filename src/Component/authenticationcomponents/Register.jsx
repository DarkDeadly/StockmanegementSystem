import React, { useState } from 'react'
import Header from '../header/Header'
import './register.css'
import "./login.css"
import { EyeInvisibleOutlined, EyeOutlined, FacebookOutlined, GoogleOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useNavigate } from 'react-router'
const Register = () => {
    const [passHidden, setpassHidden] = useState(false)
    const [confirmpassHidden, setconfirmpassHidden] = useState(false)

    const navigate = useNavigate()
    const ShowPass = () => {
        setpassHidden(!passHidden)
    }
    const showConfirm = () => {
        setconfirmpassHidden(!confirmpassHidden)
    }
  return (
    <div className='Register__Container'>
        <Header/>
        <section className='register__Section'>
              <div className="register__Content">
                    <div className="form__Box Login">
                        <h1>Welcome to StockMaster</h1>
                        <form action="">
                            <Input size="large" placeholder="you@example.com" prefix={<MailOutlined />} className='Input__Box' />
                            <Input size="large" placeholder="Enter your Password" type={passHidden ? 'text' : 'password'} prefix={<LockOutlined />} className='Input__Box'  suffix = {passHidden ? <EyeInvisibleOutlined onClick={ShowPass} /> : <EyeOutlined onClick={ShowPass}/>}/>
                            <Input size="large" placeholder="re-Enter your Password" type={confirmpassHidden ? 'text' : 'password'} prefix={<LockOutlined />} className='Input__Box'  suffix = {confirmpassHidden ? <EyeInvisibleOutlined onClick={showConfirm} /> : <EyeOutlined onClick={showConfirm}/>}/>
                            <button className='navBtn RegisterBtn register'>Register</button>
                            <p>or sign up with social Media</p>
                            <div className="SocialMedia__content">
                                <GoogleOutlined size={100} />
                                <FacebookOutlined style={{ color: "#1877F2" }} />
                            </div>

                        </form>
                    </div>
                    <div className="login__Annoucement">
                        <div className="login__content">
                        <h1>Hello , Welcome to StockMaster</h1>
                        <p>You have an account ?</p>
                        <button className='navBtn loginBtn' onClick={()=> navigate('/Authentication')}>Login</button>
                        </div>
                    </div>
                </div>
        </section>
    </div>
  )
}

export default Register