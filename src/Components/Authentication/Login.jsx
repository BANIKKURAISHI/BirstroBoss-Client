import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha, } from 'react-simple-captcha';
import { useContext, useEffect,  } from 'react';
//import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';

const Login = () => {

//const [disable,setDisable]=useState(true)
const {userLogin}=useContext(AuthContext)
////// jai kahane jata chai sey khane jaoyar jonne 
const navigate =useNavigate()
const location =useLocation()
console.log(location)
const from =location.state?.form?.pathname||"/"
    useEffect(()=>{
        loadCaptchaEnginge(6)
    },[])
    const logInButton=(e)=>{
        e.preventDefault()
        const form=e.target 
        const email=form.email.value
        const password=form.password.value
      
        userLogin(email,password)
        .then(result=>{
            console.log(result)
            toast("log in successful !")
            navigate(from,{replace:true})
            
        })
        .catch(error=>{
            const errorCode=error.code
            toast (errorCode)
        })
}



    const validate=(e)=>{
  const value =e.target.value 
 if(validateCaptcha(value)){
// setDisable(false)
 }
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. <br /> Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={logInButton} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered"  />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" />
         
        </div>
         <div className="form-control">
          <label className="label">
          <LoadCanvasTemplate />
          </label>
          <input onBlur={validate} type="password"  name="captcha" placeholder="type the text above" className="input input-bordered"  />
          {/* required */}
        </div>
      
         <div className="form-control mt-6">
        <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
          <input disabled={false} className="btn btn-primary" type="submit" value="Login" />
        </div> 
        {/* disabled={disable} */}
      </form>
      <div className='mx-auto mt-4 '>
      <SocialLogin></SocialLogin>
      </div>
      
     <h1 className='mx-8 mb-4'>New Here ? <Link to="/singUp">REGISTRATION</Link></h1>
    </div>
  </div>
</div>
<ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;