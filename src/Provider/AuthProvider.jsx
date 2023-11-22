import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Components/Firebase/Firebase.config";
import useAxiosPublic from './../Hooks/useAxiosPublic';

export const AuthContext =createContext(null)



const AuthProvider = ({children}) => {
  const provider = new GoogleAuthProvider()
const [user,setUser]=useState()
const [loading,setLoading]=useState(true)
const axiosPublic=useAxiosPublic()

const userLogin =(email,password)=>{
    setLoading(true)
 return   signInWithEmailAndPassword(auth,email,password)
}
const createUser=(email,password)=>{
    setLoading(true)
    return  createUserWithEmailAndPassword(auth,email,password)
}
const  updateProfileButton=(name,photo)=>{
  return updateProfile(auth.currentUser,{
    displayName:name ,photoUrl:photo
  })
}
useEffect(()=>{
 const unSubscribe=onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser)
    // 
    if(currentUser){
      axiosPublic.post('/jwt',{email:currentUser.email})
      .then(res=>{
        //console.log(res.data.token)
        if(res?.data?.token){
          localStorage.setItem('access-token',res?.data?.token)
          setLoading(false)
        }
      })
    }
    else{
      localStorage.removeItem('access-token')
      setLoading(false)
    }
    
 })
 return()=>{
    return unSubscribe()}
},[axiosPublic])

const logOut =()=>{
    setLoading(true)
  return  signOut(auth)
}

const googleLogin=()=>{
  setLoading(true)
  return signInWithPopup(auth, provider)
}
    const authInfo={user,
                   loading,
                   userLogin ,
                   createUser,
                   logOut,
                   updateProfileButton,
                   googleLogin
                   }
    return (
        <AuthContext.Provider value={authInfo}>
          {children}  
        </AuthContext.Provider >
    );
};

export default AuthProvider;