import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BlogCard } from '../components/index.js';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

export default function Profile() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const posts = useSelector((state) => state.posts.posts);

  return (
    <div className="p-4 md:p-8 bg-gray-100 relative dark:bg-gray-900 min-h-screen">
      <div className="flex flex-row md:flex-row items-center gap-4 md:gap-8 mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-center h-10 w-10 text-xl md:w-40 md:h-40 rounded-full bg-gray-500 text-black dark:text-white md:text-7xl font-bold">
          {authStatus ? `${userData?.name?.charAt(0).toUpperCase()}` : <SentimentVerySatisfiedIcon fontSize='large' />}
        </div>
        <div>
          <h1 className="text-gray-900 dark:text-gray-100 text-md md:text-4xl capitalize font-semibold">
            {authStatus ? `${userData?.name}` : `User not Found`}
          </h1>
          <p className="text-gray-600 text-sm md:text-2xl dark:text-gray-400">{authStatus ? `${userData?.email}` : ''}</p>
        </div>
      </div>
      <div>
        {authStatus ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.filter(post => post?.userId === userData?.$id).map((blog) => {
              return (
                <BlogCard key={blog?.$id} blog={blog} />
              );
            })}
          </div>
        ) : (
          <div className="grid place-items-center">
            <h1 className="text-gray-900 dark:text-gray-100">Login to view dashboard...</h1>
          </div>
        )}
      </div>
      {authStatus && (
        <div className='sticky inset-0 flex justify-center p-2 items-end'>
          <Link to={"/add-blog"}>
            <button className={"w-16 h-16 rounded-full border-white hover:bg-blue-300 border-2 bg-blue-500 font-bold text-white"}>ADD</button>
          </Link>
        </div>
      )}
    </div>
  );
}
