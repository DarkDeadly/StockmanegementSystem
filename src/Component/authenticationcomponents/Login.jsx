import { EyeInvisibleOutlined, EyeOutlined, FacebookOutlined, GoogleOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import React, { useState } from 'react'
import './login.css'
const Login = () => {
    const [passHidden, setpassHidden] = useState(false)

    const ShowPass = () => {
        setpassHidden(!passHidden)
    }
    return (
        <>
            <section className="login__Container">
                <div className="login__Content">
                    <div className="form__Box Login">
                        <h1>Welcome Back to StockMaster</h1>
                        <form action="">
                            <Input size="large" placeholder="you@example.com" prefix={<MailOutlined />} className='Input__Box' />
                            <Input size="large" placeholder="Enter your Password" type={passHidden ? 'text' : 'password'} prefix={<LockOutlined />} className='Input__Box'  suffix = {passHidden ? <EyeInvisibleOutlined onClick={ShowPass} /> : <EyeOutlined onClick={ShowPass}/>}/>
                            <span className='forget__pass'>Forget Password</span>
                            <button className='navBtn LoginBtn'>Login</button>
                            <p>or sign in with social Media</p>
                            <div className="SocialMedia__content">
                                <GoogleOutlined size={100} />
                                <FacebookOutlined style={{ color: "#1877F2" }} />
                            </div>

                        </form>
                    </div>
                    <div className="register__Annoucement">
                        <div className="register__content">
                        <h1>Hello , Welcome to StockMaster</h1>
                        <p>don't have an account ?</p>
                        <button className='navBtn RegisterBtn'>Register</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login