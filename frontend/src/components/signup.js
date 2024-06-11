import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Container from './Container';
import CustomInput from './CustomInput';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem('userInfo'));

    const submitHandler = async (event) => {
        event.preventDefault(); 

        if (!name || !email || !password || !confirmpassword) {
            toast.warn(`Please enter all required fields`);
            return;
        }
        if (password !== confirmpassword) {
            toast.warn(`Passwords are not matched`);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "http://localhost:5000/api/user/register",
                {
                    name,
                    email,
                    password,
                },
                config
            );

            localStorage.setItem("userInfo", JSON.stringify(data));
            toast.success(`Registration Successful`);
            setTimeout(() => {
                history.push("/home");
                window.location.reload();
            }, 500);
        } catch (error) {
            toast.warn(`Invalid Credentials`);
        }
    };

    return (
        <>
        {user === null ?(<Container class1="login-wrapper py-3 home-wrapper-2">
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
        />
        
        <ToastContainer />
        <div className="row card-center">
            <div className="col-12">
                <div className="auth-card">
                    <h3 className='text-center mb-3' style={{ color: "white" }}>Create Account</h3>
                    <form className='d-flex flex-column gap-10' onSubmit={submitHandler}>
                        <CustomInput
                            type="text"
                            name='name'
                            placeholder='Name'
                            onChange={(e) => setName(e.target.value)}
                        />
                        <CustomInput
                            type="email"
                            name='email'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <CustomInput
                            type="password"
                            name='password'
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <CustomInput
                            type="password"
                            name='confirm_password'
                            placeholder='Confirm Password'
                            onChange={(e) => setConfirmpassword(e.target.value)}
                        />
                        <div className='mt-2 d-flex justify-content-center align-items-center'>
                            <button className='button border-0 rounded-button w-100 fs-6' type="submit">Sign Up</button>
                        </div>
                        <div>
                            <Link to="/" className='mt-3 d-flex justify-content-center fs-6' style={{ color: "white" }}>Already have an account?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Container>):(history.push("/watchlist"))}
    </>
    )
}

export default Signup;
