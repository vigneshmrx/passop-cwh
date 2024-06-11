import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-4 h-14">
                <div className="logo font-bold text-2xl">
                    <span className="text-green-500">&lt;</span>
                    
                    Pass
                    <span className="text-green-500">OP/&gt;</span>
                </div>
                {/* <ul>
                    <li className='flex gap-4'>
                        <a className='hover:font-bold' href="/">Home</a>
                        <a className='hover:font-bold' href="#">About</a>
                        <a className='hover:font-bold' href="#">Contact</a>
                    </li>
                </ul> */}
                <button className='cursor-pointer text-white bg-green-500 rounded-full flex gap-4 items-center px-2'>
                    <img className='invert w-10 py-1' src="/github.png" alt="" />
                    <span className="font-bold">GitHub</span>
                </button>
            </div>

        </nav>
    )
}

export default Navbar