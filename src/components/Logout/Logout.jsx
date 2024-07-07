import React from 'react';
import { Button } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { emptyPosts } from '../../store/postSlice';
import auth from '../../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { purgePersistedState } from '../../store/store';

export default function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status);

    const logoutHandler = async () => {
        try {
            await auth.logout();
            dispatch(logout());
            dispatch(emptyPosts());
            purgePersistedState();
            navigate("/");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {authStatus ? (
                <div className='flex flex-col items-center mx-auto max-w-fit justify-center gap-2 '>
                    <h1 className="text-center text-xl" >
                        Hope you'll visit soon!!
                    </h1>
                    <Button onClick={logoutHandler}>
                        Logout
                    </Button>
                </div>
            ) : (
                <Button className={"max-w-fit mx-auto"}>
                    <Link to={"/login"}>
                        Login
                    </Link>
                </Button>
            )}
        </div>
    );
}
