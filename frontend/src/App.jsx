import { Fragment, useEffect, useState } from 'react'
import Fontpage from './page/Fontpage.jsx'
import Pageheader from './page/Pageheader.jsx'
import Modal from './component/modal.jsx'
import Modal2 from './component/modal2.jsx'
import { Themecontext } from './context/Themecontext.jsx'
import Mainbody from './page/Mainbody.jsx'


export default  function App() {

  const [count, setCount] = useState(0)
  const [theme,setTheme] = useState('dark')
  const [showmodal, setshowmodal] = useState(false);
  const [showmodal2, setshowmodal2] = useState(false);
  
  useEffect(()=>{
    setTheme( localStorage.getItem('theme')?localStorage.getItem('theme'):'dark')
  },[])
  return (
    <Themecontext.Provider value={{theme,setTheme,showmodal,setshowmodal,showmodal2,setshowmodal2}}>
    <div className={`${theme}
    ${theme =='dark'?'bg-[#121212]':null} h-[100vh]`}>
      <Pageheader/>     
      <Fontpage/>
      <Mainbody/>
      <Modal isvisible={showmodal} onclose={() => setshowmodal(false)}/>
      <Modal2 isvisible={showmodal2} onclose={() => setshowmodal2(false)}/>
      
    </div>
    </Themecontext.Provider>

    )
  }







  