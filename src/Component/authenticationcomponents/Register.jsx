import { useState } from 'react'
import Header from '../header/Header'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import './register.css'
import "./login.css"
import { EyeInvisibleOutlined, EyeOutlined, FacebookOutlined, GoogleOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Input, message } from 'antd'
import { useNavigate } from 'react-router'
import { EmailVerif, PasswordVerif, confirmPassVerif } from '../../util/util.js'
import { auth, db } from '../../util/firebase.js'
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
const Register = () => {
    const [passHidden, setpassHidden] = useState(false)
    const [confirmpassHidden, setconfirmpassHidden] = useState(false)
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [PassConfirm, setPassConfirm] = useState("")
    const [emailError, setEmailError] = useState('');

    const navigate = useNavigate()
    const errors = PasswordVerif(Password)
    const setUpDisplayName = (email) => {
        const trimmedEmail = email.trim();
        if (EmailVerif(trimmedEmail) === true) {
            return trimmedEmail.split("@")[0];
        }
        return "";
    };
    const SignUpAccount = async (email, password, confirmPass) => {
        const emailverif = EmailVerif(email)
        const passwordVerif = PasswordVerif(password)
        const ConfirmPass = confirmPassVerif(password, confirmPass)

        if (emailverif !== true) {
            return { success: false, message: emailverif, type: 'email' };
        }
        if (passwordVerif.length > 0) {
            return { success: false, message: passwordVerif, type: 'password' };
        }
        if (ConfirmPass !== true) {
            return { success: false, message: ConfirmPass, type: 'confirmPass' };
        }


        if (emailverif && passwordVerif && ConfirmPass) {
            const username = setUpDisplayName(email);
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                const user = userCredential.user
                await updateProfile(user, { displayName: username });
                await setDoc(doc(db, "Users", user.uid), {
                    uid: user.uid,
                    username: username,
                    email: user.email,
                    role : "user",
                    createdAt : Timestamp.now()
                });
                return { success: true, user };
            } catch (error) {
                const errorMessages = {
                    'auth/email-already-in-use': 'This email is already registered.',
                    'auth/invalid-email': 'Please enter a valid email address.',
                    'auth/weak-password': 'Password must be at least 6 characters.',
                    'auth/operation-not-allowed': 'Email/password sign-up is disabled.',
                };
                const message = errorMessages[error.code] || error.message || 'An error occurred during sign-up.';
                return { success: false, message, type: 'email' };
            }
        }
    }

    const SubmitSignUp = async (e) => {
        e.preventDefault();
        setEmailError('');

        const result = await SignUpAccount(Email, Password, PassConfirm);
        if (result.success) {
            message.success("Signed up Successfully");
            navigate("/")
        }
        else {
            if (result.type === 'email') {
                setEmailError(result.message);
            }
        }

    }

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
                        <form onSubmit={SubmitSignUp}>
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
                            {emailError && <p className="error-message" id="emailError">{emailError}</p>}
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
                                <ul className="error-message" >
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
                            <button className='navBtn RegisterBtn ' type="submit">Register</button>
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