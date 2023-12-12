import React, { Fragment, useContext, useEffect, useState } from 'react'
import logo from './../assets/Images/bochi.jpg'
import { HiEllipsisVertical, HiMagnifyingGlass, HiMoon, HiOutlineUser, HiSun} from "react-icons/hi2";
import { Themecontext } from '../context/Themecontext';


export default function Pageheader() {
    const [toggle,setToggle] = useState(true)
    const {theme,setTheme} = useContext(Themecontext)
    
    const { setshowmodal } = useContext(Themecontext);
    const { setshowmodal2 } = useContext(Themecontext);

    const handleShowModal = () => {
      setshowmodal(true);
    };

    const handleShowModal2 = () => {
      setshowmodal2(true);
    };

    useEffect(()=>{
      console.log("Theme",theme)
    },[])
  return (
    <div className='flex items-center bg-teal-100 p-4 justify-between fixed top-0 w-screen'>

      <div className='flex items-center gap-4'>  
        <img src={logo} width={60} height={60}/>
        <div>
          <p className='font-semibold pl-3'>explore</p>
        </div>
        <div className=''>
          <HiEllipsisVertical className='text-[2rem]'/>
        </div>
      </div>


      <div className='sm:flex bg-teal-50 p-2  shadow-2xl mx-5 border-slate-500  rounded-full border-4  items-center relative hidden' >
        <HiMagnifyingGlass className='text-xl ' />
        <input type='text' 
                placeholder='輸入影片名稱' 
                className='bg-transparent  outline-none sm:w-[10rem] md:w-[40rem] dark:bg-slate-500  pl-2 ' /> {/* outline-none為聚焦元素 */}
      </div>


      <div className='flex items-center gap-5 pr-5'>
          <div className='bg-gray-300 px-2 py-2 rounded-[0.4rem] hover:bg-gray-700 duration-300'>
            <button className='font-semibold' onClick={handleShowModal}>sign in</button>           
          </div>
            <div className='bg-neutral-500 px-2 py-2 rounded-[0.4rem] hover:bg-neutral-700 duration-300'>
            <button className='text-white font-semibold' onClick={handleShowModal2}>sign up</button>
          </div>
          

        {/*!toggle 表示將 toggle 的值取反（如果是 true，則變成 false；如果是 false，則變成 true）*/}
        {theme == 'light'?(<HiMoon className='text-[3rem] bg-neutral-500  p-1 rounded-full cursor-pointer' 
        onClick={()=>{setTheme('dark');localStorage.setItem('theme','dark')}}/>  
        ) : (
        <HiSun className='text-[3rem] bg-amber-200 p-1 rounded-full cursor-pointer'
        onClick={()=>{setTheme('light');localStorage.setItem('theme','light')}}/>
        )} 

        <div className='flex items-center'>
        <HiOutlineUser className=' text-[3rem] bg bg-slate-300 p-1 rounded-full'/>
        </div>
                         
        </div>
            


        
      
    </div>
  )
}