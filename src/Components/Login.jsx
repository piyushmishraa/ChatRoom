import React, { useRef, useState } from 'react'
import { ValidForm } from '../utils/ValidForm';
import { Link } from 'react-router-dom';

const Login = () => {
  const [isSignInForm,setisSignInForm]=useState(true);
  const [errMessage,setErrMessage]=useState(null)
  const name=useRef(null);
  const email=useRef(null);
  const password=useRef(name);

 
  const handleClick=()=>{

     if(!isSignInForm){
      const message=checkValidForm(email.current.value,password.current.value,name.current.value);
      setErrMessage(message);
    }else{
      const message=checkValidForm(email.current.value,password.current.value);
      setErrMessage(message);
   
    }
    const message=ValidForm(email.current.value,password.current.value);

    
    setErrMessage(message)
    setisSignInForm(!isSignInForm);
  }
  return (
    <div className='absolute'>
   <div className=' h-screen w-screen bg-gradient-to-b 
    from-blue-200 to-blue-500 object-cover p-0 m-0'>
    <form className='absolute bg-black p-12 w-3/12 my-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-md'>
    <input ref={email} type='text' placeholder='Email Address'className='bg-gray-800 p-2 my-2 w-full text-xs ' />
    <input ref={password} type="password" placeholder="Password" className='bg-gray-800 p-2 my-2 w-full text-xs' />
    {!isSignInForm && <input  type='text' placeholder='Email Address'className='bg-gray-800 p-2 my-2 w-full text-xs ' />}
     <Link to={"/chatrooms"}><button className='bg-blue-700 my-4 w-full p-2 rounded-md' onClick={handleClick}>
       Sign in
     </button></Link>
     <p className='text-xs text-red-500 font-bold py-2'>{errMessage}</p>
      <p onClick={handleClick}>
       {isSignInForm?("New to chatRoom"):("Already registered")}
      </p>

    </form>
    </div>
    </div>
 
  )
}

export default Login
