import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Loader } from "../index";
import auth from "../../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../store/authSlice";

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.auth.isLoading)

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const handleSignup = async (data) => {
        try {
            const session = await auth.createAccount(data);
            if (session) {
                dispatch(fetchUserData());
                navigate("/");
            }
        } catch (error) {
            console.log("Signup Error :", error);
        }
    };

    return !isLoading ?
        (<div className="flex items-center min-h-screen justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 bg-white dark:bg-gray-900">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <h2 className="text-center text-2xl font-bold leading-tight text-black dark:text-white">
                    Signup to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                    Already have an account?{" "}
                    <Link
                        to="/Login"
                        className="font-semibold text-black dark:text-white transition-all duration-200 hover:underline"
                    >
                        Login
                    </Link>
                </p>
                <form onSubmit={handleSubmit(handleSignup)} className="mt-8">
                    <div className="space-y-5">
                        <div>
                            <Input
                                label={"Full Name"}
                                type={"text"}
                                placeholder={"Enter your full name"}
                                {...register("name", {
                                    required: "Name is required",
                                })}
                            />
                            {errors.name && <p className="text-red-600 mt-1">&#9432; {errors.name.message}</p>}
                        </div>
                        <div>
                            <Input
                                label={"Email address"}
                                placeholder={"Enter your email"}
                                type={"email"}
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
                                label={"Password"}
                                type={"password"}
                                placeholder={"Enter your password"}
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
                        <div>
                            <Button
                                type={"submit"}
                            >
                                Join us
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>) : <Loader />
}
