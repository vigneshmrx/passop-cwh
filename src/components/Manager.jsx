import React, { useEffect, useRef, useState } from 'react'

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        // let passwordArray;
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
        // else {
        //     JSON.stringify
        // }
    }, []);

    const savePassword = () => {
        console.log(form);

        setPasswordArray([...passwordArray, form])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        console.log([...passwordArray, form])
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const showPassword = () => {
        if (ref.current.src.includes("eye.png")) {
            ref.current.src = "hidden.png";
            passwordRef.current.type = "text";
            
        } else {
            ref.current.src = "eye.png";
            passwordRef.current.type = "password";
        }
    }

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            </div>

            <div className="mycontainer">
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-500">&lt;</span>

                    Pass
                    <span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                <div className="flex flex-col p-4 text-black gap-5 items-center">

                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' type="text" className='rounded-full border border-green-500 w-full px-4 py-1' name="site" id="" />

                    <div className="flex w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder="Enter Username" type="text" className='rounded-full border border-green-500 w-full px-4 py-1' name="username" id="" />

                        <div className="relative">
                            <input ref={passwordRef} type="password" value={form.password} onChange={handleChange} placeholder="Enter Password"  className='rounded-full border border-green-500 w-full px-4 py-1' name="password" id="" />
                            <span className='absolute right-[4px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={26} src="eye.png" alt="" />
                            </span>
                        </div>

                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 rounded-full w-fit hover:bg-green-300 px-5 py-1 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        Add Pasword
                    </button>

                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>

                    {passwordArray.length === 0 && <div>No passwords to show</div>}

                    {passwordArray.length !== 0 && 

                    <table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => (
                                <tr key={index}>
                                    <td className='text-center w-32 py-2 border border-white'><a href={item.site} target='_blank'>{item.site}</a></td>
                                    <td className='text-center w-32 py-2 border border-white'>{item.username}</td>
                                    <td className='text-center w-32 py-2 border border-white'>{item.password}</td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                    }
                </div>

            </div>


        </>
    )
}

export default Manager