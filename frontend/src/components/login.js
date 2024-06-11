import React, { useState } from "react";
import { Link } from 'react-router-dom';
import CustomInput from './CustomInput';
import Container from './Container';
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const user = JSON.parse(localStorage.getItem('userInfo'));

    const submitHandler = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            toast.warn(`Please enter all required fields`);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "http://localhost:5000/api/user/login",
                {
                    email,
                    password,
                },
                config
            );
            localStorage.setItem("userInfo", JSON.stringify(data));
            toast.success(`Login Successful`);
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
            {user === null? (<Container class1="login-wrapper py-3 home-wrapper-2">
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
                {/* Same as */}
                <ToastContainer />
                <div className="row card-center">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-3' style={{ color: "white" }}>Login</h3>
                            <form action="" className='d-flex flex-column gap-10' onSubmit={submitHandler}>
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
                                <div>
                                    <div className='mt-3 d-flex justify-content-center'>
                                        <button className='button border-0 rounded-button w-100 fs-6' type='submit'>Login</button>
                                    </div>
                                    <Link to="/signup" className='mt-3 d-flex justify-content-center fs-6' style={{ color: "white" }}>New User? SignUp</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </Container>):(history.push("/home"))}
        </>
    )
}

export default Login;
