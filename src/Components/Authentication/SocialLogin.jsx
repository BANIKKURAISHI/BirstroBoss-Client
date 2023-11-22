import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from './../../Hooks/useAxiosPublic';
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const axiosPublic =useAxiosPublic()
    const {googleLogin}=useAuth()
    const navigate =useNavigate()
    const googleLoginButton=()=>{
        googleLogin()
        .then(result=>{
            const userInfo ={
                email:result.user?.email,
                name:result.user?.displayName

            }
            axiosPublic.post('/user',userInfo )
            .then(res=>{
                
                if(res.data.insertedId){
                    alert('user info save database')
                    console.log(res.data) 
                }
                navigate('/')
            })
        //   toast("log in successful !",result)
        //   navigate(from,{replace:true})
        console.log(result)
        })
        .catch(error=>{
          const errorCode=error.code
         // toast (errorCode)
          console.log(errorCode)
        })
      
          }
    return (
        <div>
            <button onClick={googleLoginButton} className="btn btn-outline btn-info"><FaGoogle></FaGoogle> Google login</button>  
        </div>
    );
};

export default SocialLogin;