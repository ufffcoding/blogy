import { useEffect, useState } from "react";
import { BlogCard } from "../components/index.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postSlice.js";

export default function Home() {
    const [blogs, setBlogs] = useState([]);
    const dispatch = useDispatch();

    const storeBlogs = useSelector((state) => state.posts.posts);

    useEffect(() => {
        if (storeBlogs?.length === 0) {
            dispatch(fetchPosts())
        }
        setBlogs(storeBlogs)
    }, [storeBlogs?.length]);

    return (
        <div className="min-h-screen mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs?.filter(blog => blog?.status === "active").map((blog) => (
                    <BlogCard key={blog?.$id} blog={blog} />
                ))}
            </div>
        </div>
    );
}
