import React, { Children, useState } from 'react'
import { HiBolt, HiChevronDoubleRight } from 'react-icons/hi2'

export default function Fontpage() {
  const [open,setopen] = useState(false)
  const Menus = [
    { title: "Dashboard" },
    { title: "Pages" },
    { title: "Media", spacing: true },
    {
      title: "Projects",
      submenu: true,
      submenuItems: [{ title: "Submenu 1" }, { title: "Submenu 2" }, { title: "Submenu 3" }],
    },
    { title: "Analytics" },
    { title: "Profile", spacing: true },
    { title: "Setting" },
    { title: "Logout" },
  ];
  return (
  <div className='fixed top-[92x]'>
    <div 
      className={`${open ? 'w-60' : 'w-20'} duration-700 h-screen   bg-slate-400 relative`}
    >   
        <div className='flex border-b-2'>
          <button className={`p-1.5 rounded-lg bg-gray-100 absolute right-7 top-7 hover:bg-gray-200 ${open && "rotate-180"}`}
            onClick={ () => setopen(!open)}>
            <HiChevronDoubleRight/>
          </button>
          <div className={`p-6 pt-7 pl-8 ${!open && "hidden" }`}>
            menu
          </div>
        </div>
        <div className={` ${!open && "mt-20"}`}>
        <ul className='pt-2'>
          {Menus.map((menu, index) => (
            <li key={index} className='flex items-center gap-x-4 cursor-pointer p-2 pl-6
            hover:bg-gray-200 rounded-md mt-2'>
              <span className='text-2xl block float-left'>
                <HiBolt/>
              </span>
              <span className={` ${!open && "hidden"}`}>{menu.title}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  </div>
  )
          }






