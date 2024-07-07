import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Loader } from "../index";
import auth from "../../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../store/authSlice";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(null)
    const isLoading = useSelector(state => state.auth.isLoading)

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email: "", password: "" } });

    const handleLogin = async (data) => {
        try {
            const session = await auth.login(data);
            if (!session) {
                setError("Invalid Email or Password")
            } else {
                dispatch(fetchUserData());
                navigate("/");
            }
        } catch (error) {
            console.log("Login Error:", error);
        }
    };

    return !isLoading ?
        (<div className="flex items-center min-h-screen justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 bg-white dark:bg-gray-900">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <h2 className="text-center text-2xl font-bold leading-tight text-black dark:text-white">
                    Login to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-semibold text-black dark:text-white transition-all duration-200 hover:underline"
                    >
                        Create a free account
                    </Link>
                </p>
                <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
                    <div className="flex flex-col gap-4">
                        <div>
                            <Input
                                label="Email address"
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "Email address must be a valid address"
                                    }
                                })}
                            />
                            {errors.email && <p className="text-red-600 mt-1">&#9432; {errors.email.message}</p>}
                        </div>
                        <div>
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters long"
                                    }
                                })}
                            />
                            {errors.password && <p className="text-red-600 mt-1">&#9432; {errors.password.message}</p>}
                        </div>
                        {error && <p className="text-red-600 self-center mt-1">&#9432; {error}</p>}
                        <div>
                            <Button type="submit">
                                Welcome Back
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        ) : <Loader />
}
