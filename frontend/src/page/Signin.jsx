import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signin({ onclose }) {
    
    const [values, setValues] = useState({

        email:"",
        password:""
  })
    // const navigator = useNavigate()
    axios.defaults.withCredentials =true
    const handleSubmit = (event) =>{
    event.preventDefault();
    console.log(values);
    axios.post(`http://localhost:8000/login`, values)
    .then(res => {        
        console.log(res)
        if(res.data.Status === "Success" ){
            //navigator('/')
        }
        else{
            alert(res.data.error)
        }
    }) 
    .catch(err => console.log(err));
}

  return (

    
    <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg' onSubmit={handleSubmit}>
      <div className='flex justify-end'>
      <button type="button" className='text-white text-xl place-self-end' onClick={() => onclose()}>
          X
      </button>   
      </div>
      <div className='flex justify-center pb-10'>
          <h2 className='text-4xl text-white font-bold '>sign in</h2>        
      </div>
      <div className='flex flex-col text-gray-400 py-2'>
          <label>email</label>
          <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type='text' onChange={e => setValues({...values, email: e.target.value})}/>
      </div>
      <div className='flex flex-col text-gray-400 py-2'>
          <label>password</label>
          <input className=' rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type='password' onChange={e => setValues({...values, password: e.target.value})}/>
      </div>
      <div className='flex justify-between text-gray-400 py-3'>
          <p className='flex items-center'><input className='mr-2' type='checkbox'/> remember me</p>
      </div>
      <button type='submit' className='w-full my-5 py-4 bg-teal-300 rounded-md hover:bg-teal-700 duration-700 font-bold'>sign in</button>
      <div className='flex justify-between text-gray-400 pl-1'>
         
    
       
      </div>
   </form>
    
  );
}
