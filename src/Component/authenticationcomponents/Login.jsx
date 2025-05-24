import { EyeInvisibleOutlined, EyeOutlined, FacebookOutlined, GoogleOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Alert, Input } from 'antd';
import React, { useState } from 'react';
import { auth } from '../../util/firebase.js';
import './login.css';
import { useNavigate } from 'react-router';
import { EmailVerif } from '../../util/util.js';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [passHidden, setPassHidden] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const SignInAccount = async (email, password) => {
    // Validation
    if (!email.trim()) {
      return { success: false, message: 'Email is required.', type: 'email' };
    }
    const emailVerifResult = EmailVerif(email.trim());
    if (emailVerifResult !== true) {
      return { success: false, message: emailVerifResult, type: 'email' };
    }
    if (!password.trim()) {
      return { success: false, message: 'Password is required.', type: 'password' };
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      const user = userCredential.user;
      console.log(`[${new Date('2025-05-24T21:59:00+02:00').toLocaleString()}] User signed in: ${user.email}`);
      return { success: true, user };
    } catch (error) {
      const errorMessages = {
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/too-many-requests': 'Too many attempts. Please try again later.',
        'auth/user-disabled': 'This account has been disabled.',
      };
      const message = errorMessages[error.code] || 'An unexpected error occurred.';
      console.error(`[${new Date('2025-05-24T21:59:00+02:00').toLocaleString()}] Sign-in error: ${message}`);
      return {
        success: false,
        message,
        type: error.code.includes('email') || error.code.includes('user') || error.code.includes('credential') ? 'email' : 'password',
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setSuccessMessage('');

    const result = await SignInAccount(email, password);
    if (result.success) {
      setSuccessMessage('Signed in successfully!');
      setTimeout(() => navigate('/Products'), 1500); // Delay for alert visibility
    } else {
      if (result.type === 'email') {
        setEmailError(result.message);
      } else if (result.type === 'password') {
        setPasswordError(result.message);
      }
    }
  };

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      setEmailError('Please enter your email address.');
      return;
    }
    const emailVerifResult = EmailVerif(email.trim());
    if (emailVerifResult !== true) {
      setEmailError(emailVerifResult);
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSuccessMessage('Password reset email sent! Please check your inbox.');
      setEmailError('');
    } catch (error) {
      setEmailError(error.message || 'Failed to send password reset email.');
    }
  };

  const inputClass = () => {
    if (!email) return '';
    return EmailVerif(email.trim()) === true ? 'valid' : 'invalid';
  };

  return (
    <section className="login__Container">
      <div className="login__Content">
        <div className="form__Box Login">
          <h1>Welcome Back to StockMaster</h1>
          {successMessage && <Alert message={successMessage} type="success" showIcon style={{ marginBottom: '16px' }} />}
          <form onSubmit={handleSubmit}>
            <Input
              size="large"
              placeholder="you@example.com"
              type="email"
              prefix={<MailOutlined />}
              className={`Input__Box ${inputClass()}`}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              aria-describedby="emailError"
            />
              {email && EmailVerif(email) !== true && (
                                <p className="error-message">{EmailVerif(email)}</p>
                            )} 
            {emailError && <p className="error-message" id="emailError">{emailError}</p>}
            <Input
              size="large"
              placeholder="Enter your Password"
              type={passHidden ? 'text' : 'password'}
              prefix={<LockOutlined />}
              className={`Input__Box ${password && !passwordError ? 'valid' : password && passwordError ? 'invalid' : ''}`}
              suffix={passHidden ? <EyeInvisibleOutlined onClick={() => setPassHidden(!passHidden)} /> : <EyeOutlined onClick={() => setPassHidden(!passHidden)} />}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              aria-describedby="passwordError"
            />
            {passwordError && <p className="error-message" id="passwordError">{passwordError}</p>}
            <span className="forget__pass" onClick={handlePasswordReset} style={{ cursor: 'pointer' }}>
              Forget Password?
            </span>
            <div className="login__button">
              <button className="navBtn LoginBtn" type="submit">Login</button>
              <button className="navBtn LoginBtn register" type="button" onClick={() => navigate('/Authentication/Register')}>
                Register
              </button>
            </div>
            <p>or sign in with social Media</p>
            <div className="SocialMedia__content">
              <GoogleOutlined />
              <FacebookOutlined style={{ color: '#1877F2' }} />
            </div>
          </form>
        </div>
        <div className="register__Annoucement">
          <div className="register__content">
            <h1>Hello, Welcome to StockMaster</h1>
            <p>Don't have an account?</p>
            <button className="navBtn RegisterBtn" onClick={() => navigate('/Authentication/Register')}>
              Register
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;