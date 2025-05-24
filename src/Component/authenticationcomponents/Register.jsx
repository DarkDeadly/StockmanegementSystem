import { useState } from 'react'
import Header from '../header/Header'
import './register.css'
import "./login.css"
import { EyeInvisibleOutlined, EyeOutlined, FacebookOutlined, GoogleOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useNavigate } from 'react-router'
import { EmailVerif, PasswordVerif, confirmPassVerif } from '../../util/util.js'
const Register = () => {
    const [passHidden, setpassHidden] = useState(false)
    const [confirmpassHidden, setconfirmpassHidden] = useState(false)
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [PassConfirm, setPassConfirm] = useState("")
    const navigate = useNavigate()
    const errors = PasswordVerif(Password)



    const PassInput = () => {
        if (!Password) return ""
        return PasswordVerif(Password) ? "valid" : "invalid"
    }


    const ShowPass = () => {
        setpassHidden(!passHidden)
    }
    const showConfirm = () => {
        setconfirmpassHidden(!confirmpassHidden)
    }
    const inputClass = () => {
        if (!Email) return '';
        return EmailVerif(Email) ? "valid" : "invalid"
    }




    return (
        <div className='Register__Container'>
            <Header />
            <section className='register__Section'>
                <div className="register__Content">
                    <div className="form__Box Login">
                        <h1>Welcome to StockMaster</h1>
                        <form action="">
                            <Input
                                size="large"
                                placeholder="you@example.com"
                                type='email'
                                prefix={<MailOutlined />}
                                className={`Input__Box ${inputClass()}`}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {Email && EmailVerif(Email) !== true && (
                                <p className="error-message">{EmailVerif(Email)}</p>
                            )}
                            <Input
                                size="large"
                                placeholder="Enter your Password"
                                type={passHidden ? 'text' : 'password'}
                                prefix={<LockOutlined />}
                                className={`Input__Box ${PassInput()}`}
                                suffix={passHidden ? <EyeInvisibleOutlined
                                    onClick={ShowPass} /> : <EyeOutlined onClick={ShowPass} />}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {Password && errors.length > 0 && (
                                <ul className="error-message">
                                    {errors.map((err, i) => (
                                        <li key={i}>{err}</li>
                                    ))}
                                </ul>
                            )}
                            <Input
                                size="large"
                                placeholder="re-Enter your Password"
                                type={confirmpassHidden ? 'text' : 'password'}
                                prefix={<LockOutlined />} className='Input__Box'
                                suffix={confirmpassHidden ? <EyeInvisibleOutlined onClick={showConfirm} /> : <EyeOutlined onClick={showConfirm} />}
                                onChange={(e) => setPassConfirm(e.target.value)}
                            />
                            {PassConfirm && confirmPassVerif(PassConfirm, Password) !== true && (
                                <p className="error-message">{confirmPassVerif(PassConfirm, Password)}</p>
                            )}
                            <button className='navBtn RegisterBtn '>Register</button>
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
                            <button className='navBtn loginBtn' onClick={() => navigate('/Authentication')}>Login</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register