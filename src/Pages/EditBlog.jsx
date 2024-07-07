import React from 'react'
import BlogForm from '../components/BlogForm'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function EditBlog() {
    const { id } = useParams()
    const posts = useSelector((state) => state.posts.posts);
    const blog = posts?.find((post) => post.$id === id);

    return (
        <>
            <BlogForm blog={blog} />
        </>
    )
}
