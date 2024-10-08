import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

const BlogCard = ({ blog }) => (
    <Link to={`/blog/${blog?.$id}`}>
        <div className="relative max-w-lg rounded overflow-hidden">
            <img className="w-full h-64 object-cover" loading='lazy' src={blog?.imageUrl} alt={blog?.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
                <h2 className="text-2xl line-clamp-1 font-bold mb-2">{blog?.title}</h2>
                <p className="line-clamp-2 mb-4">{parse(`${blog?.description}`)}</p>
                {/* <div className="flex justify-between items-center">
                    <span>{blog?.author}</span>
                    <span>{new Date(blog?.$createdAt).toLocaleDateString()}</span>
                </div> */}
            </div>
        </div>
    </Link>
);

export default memo(BlogCard);
