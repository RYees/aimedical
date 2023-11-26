import React, {useState, SyntheticEvent} from 'react'
import axios from 'axios';

const User = () => {
  const [form, setForm] = useState({
    email:'', password:'', name:''
  });


const handleSubmit = async (e:SyntheticEvent) => {
    e.preventDefault(); 
    try {
    const res = await axios.post('/api/users', 
    {   
        email: form.email,
        password: form.password,
        name: form.name,
    })
    console.log('success', res.data);
    } catch(error){
        console.log("error", error);
    }
}

  return (
    <>
        <div>
            <div className="font-mono">
                <div className="container mx-auto">
                <div className="w-full flex justify-center px-6 my-16 mx-auto">
                <div className="w-full border bg-white p-5 rounded-lg lg:rounded-l-none">
                    <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                    <form onSubmit={() => handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-xl">
                        <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0">
                                <label className="mb-2 text-sm font-bold text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="fullName"
                                    type="text"
                                    onChange={e => setForm({...form, name: e.target.value})} 
                                    value={form.name}
                                    placeholder="Full Name"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700">
                                Email
                            </label>
                            <input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                onChange={e => setForm({...form, email: e.target.value})} 
                                value={form.email}
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0">
                                <label className=" mb-2 text-sm font-bold text-gray-700">
                                    Password
                                </label>
                                <input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    onChange={e => setForm({...form, password: e.target.value})} 
                                    value={form.password}
                                    placeholder="******************"
                                />
                                <p className="text-xs italic text-red-500">Please choose a password.</p>
                            </div>
                        </div>
                        <div className="mb-6 text-center">
                            <button
                                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                type="submit"
                                //onClick={handleSubmit}
                            >
                                Register User
                            </button>
                        </div>
                        <hr className="mb-6 border-t" />
                    </form>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </>
    
  )
}

export default User