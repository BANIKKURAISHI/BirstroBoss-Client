import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SocialLogin from "./SocialLogin";

const Registration = () => {
  const { createUser, updateProfileButton } = useContext(AuthContext);
  const navigate =useNavigate()
  const axiosPublic= useAxiosSecure()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    
    createUser(data.email,data.password)
    .then(result=>{
             console.log(result)
             toast("Registration in successful !")


             updateProfileButton(data.name,data.photo)
            
             .then(result=>{
              const userInfo={
                name:data.name,
                email:data.email
               }
              axiosPublic.post('/user',userInfo)
              .then(res=>{
                if(res.data.insertedId){
                  toast("Update in successful !",result)
                  reset()
                }
              })
             
             })
             navigate('/')
         })
         .catch(error=>{
             const errorCode=error.code
             toast (errorCode)
         })
  };

  // const createButton=(e)=>{
  //  e.preventDefault()
  //  const form=e.target
  //  const name=form.name.value
  //  const email=form.email.value
  //  const photo =form.photo.value
  //  const password =form.password.value
  //  const all ={name,email,password,photo}
  //  console.log(all)
  //  createUser(email,password)
  //  .then(result=>{
  //         console.log(result)
  //         toast("Registration in successful !")
  //     })
  //     .catch(error=>{
  //         const errorCode=error.code
  //         toast (errorCode)
  //     })
  // }

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Registration now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. <br /> Quaerat fugiat ut
              assumenda excepturi exercitationem quasi. In deleniti eaque aut
              repudiandae et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  {...register("name", { required: true })}
                  placeholder="Enter your name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-400">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-400">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="url"
                  name="photo"
                  {...register("photo", { required: true })}
                  placeholder="Enter your photo url"
                  className="input input-bordered"
                />
                {errors.photo && (
                  <span className="text-red-400">Photo url is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 10,
                    pattern:/(?=.*[A-Z])(?=.*[!@#$%&*()])(?=.*[0-9](?=.*[a-z]))/})}
                  
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "minLength" && (
                  <span className="text-red-400">
                    Password must be 6 digit{" "}
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-400">
                    Password must be less than 10 digit{" "}
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-400">
                   Password must be One Capital letter one small letter one number and a special characters
                  </span>
                )}
              </div>
              <input
                type="submit"
                className="btn btn-primary"
                value="Sing Up "
              />
            </form>
            <div className='mx-auto mt-4 '>
            <SocialLogin></SocialLogin>
            </div>
            <h1 className='mx-8 mb-4'>Already have an account? <Link to="/login">LOGIN</Link></h1>
          </div>
        </div>
      </div>
      
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Registration;
