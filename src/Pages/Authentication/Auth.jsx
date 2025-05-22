import Login from '../../Component/authenticationcomponents/Login'
import Header from '../../Component/header/Header'
import './auth.css'
const Auth = () => {
  return (
    <div className='Authentication'>
    <Header/>
    <div className="AuthContent">
          <Login/>

    </div>
    </div>
  )
}

export default Auth