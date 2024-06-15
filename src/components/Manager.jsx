import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

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

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    }

    const savePassword = () => {
        // console.log(form);

        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {



            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])

            setForm({ site: "", username: "", password: "" });

            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast("Error: Password not saved!", {
                theme: "dark",
            })
        }
    }

    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete this password?");

        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Password deleted successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }

    const editPassword = (id) => {
        setForm(passwordArray.filter(item => item.id === id)[0])

        setPasswordArray(passwordArray.filter(item => item.id !== id))
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <ToastContainer />

            <div className="absolute inset-0 -z-10 min-h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            </div>

            <div className="p-2 md:p-0 md:mycontainer min-h-[86vh]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-500">&lt;</span>

                    Pass
                    <span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                <div className="flex flex-col p-4 text-black gap-5 items-center">

                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' type="text" className='rounded-full border border-green-500 w-full px-4 py-1' name="site" id="site" />

                    <div className="flex md:flex-row flex-col w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder="Enter Username" type="text" className='rounded-full border border-green-500 w-full px-4 py-1' name="username" id="username" />

                        <div className="relative">
                            <input ref={passwordRef} type="password" value={form.password} onChange={handleChange} placeholder="Enter Password" className='rounded-full border border-green-500 w-full px-4 py-1' name="password" id="password" />
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
                        Save Pasword
                    </button>

                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>

                    {passwordArray.length === 0 && <div>No passwords to show</div>}

                    {passwordArray.length !== 0 &&

                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className='text-center py-2 border border-white cursor-pointer copy-text' onClick={() => copyText(item.site)}><a href={item.site} target='_blank'>{item.site}</a></td>

                                        <td className='text-center py-2 border border-white cursor-pointer copy-text' onClick={() => copyText(item.username)}>{item.username}</td>

                                        <td className='text-center py-2 border border-white cursor-pointer copy-text' onClick={() => copyText(item.password)}>{item.password}</td>

                                        <td className='border border-white'>
                                            <div className='flex justify-evenly items-center'>
                                                <span className='cursor-pointer' onClick={() => editPassword(item.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                                                        <path d="M 43.050781 1.9746094 C 41.800781 1.9746094 40.549609 2.4503906 39.599609 3.4003906 L 38.800781 4.1992188 L 45.699219 11.099609 L 46.5 10.300781 C 48.4 8.4007812 48.4 5.3003906 46.5 3.4003906 C 45.55 2.4503906 44.300781 1.9746094 43.050781 1.9746094 z M 37.482422 6.0898438 A 1.0001 1.0001 0 0 0 36.794922 6.3925781 L 4.2949219 38.791016 A 1.0001 1.0001 0 0 0 4.0332031 39.242188 L 2.0332031 46.742188 A 1.0001 1.0001 0 0 0 3.2578125 47.966797 L 10.757812 45.966797 A 1.0001 1.0001 0 0 0 11.208984 45.705078 L 43.607422 13.205078 A 1.0001 1.0001 0 1 0 42.191406 11.794922 L 9.9921875 44.09375 L 5.90625 40.007812 L 38.205078 7.8085938 A 1.0001 1.0001 0 0 0 37.482422 6.0898438 z"></path>
                                                    </svg>
                                                </span>

                                                {/*Trash icon----- */}
                                                <span className='cursor-pointer' onClick={() => deletePassword(item.id)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                            </div>
                                        </td>
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