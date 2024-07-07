import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

const BlogCard = ({ blog }) => {
    return (
        <Link to={`/blog/${blog?.$id}`}>
            <div className="rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800 transition-colors duration-300">
                <img loading='lazy' src={blog?.imageUrl} alt={blog?.title} className="w-full h-64 object-cover" />
                <div className="flex flex-col h-1/4 gap-2 p-4">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1 dark:text-white">{blog?.title}</h3>
                    <div className="line-clamp-2 text-gray-600 dark:text-gray-300">{parse(`${blog?.description}`)}</div>
                    <p className='text-xs dark:bg-gray-400 py-1 px-2 w-fit rounded text-gray-600 dark:text-white'>{new Date(blog?.$createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </Link>
    )
};

export default BlogCard;
