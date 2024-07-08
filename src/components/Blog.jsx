import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import database from "../appwrite/database";
import Button from "./Button";
import parse from 'html-react-parser';
import { removePost } from "../store/postSlice";

export default function Blog() {

    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // create state for blog 
    const [blog, setBlog] = useState(null);


    // get states
    const userData = useSelector((state) => state.auth.userData);
    const storeBlog = useSelector((state) => state.posts.posts);


    // fetch blog function
    const fetchBlogData = useCallback(async () => {
        const fetchBlog = await database.getPost(id).then(post => post?.documents[0])
        if (fetchBlog) {
            const fetchImage = database.getFilepreview(fetchBlog?.image)
            console.log(fetchImage);
            if (fetchImage) {
                setBlog({ ...fetchBlog, imageUrl: fetchImage });
            }
        }
    }, [blog]);

    useEffect(() => {
        if (storeBlog?.length === 0) {
            fetchBlogData();
        } else {
            const filteredblog = storeBlog?.find((blog) => blog?.$id === id);
            setBlog(filteredblog);
        }
    }, [storeBlog.length]);


    // delete post
    const deletePost = async () => {
        const deleteImage = await database.deleteFile(blog?.image)
        if (deleteImage) {
            const deletePost = await database.deletePost(id)
            if (deletePost) {
                dispatch(removePost(id))
            }
            navigate("/")
        };
    };


    return (
        <div className="bg-white py-10 dark:bg-gray-900">
            <div className="mx-auto max-w-xl px-2 lg:max-w-2xl lg:px-8">
                <img
                    src={blog?.imageUrl}
                    alt={blog?.title}
                    className="aspect-video w-full object-cover object-center"
                />
            </div>
            <div className="flex flex-col gap-4 mx-auto lg:mt-10 mt-4 max-w-7xl px-2 lg:max-w-7xl lg:px-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
                    {blog?.title}
                </h1>
                <div className="text-base leading-relaxed text-gray-900 dark:text-gray-300">{parse(`${blog?.description}`)}</div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-400">{`Published on: ${new Date(blog?.$createdAt).toLocaleDateString()}`}</p>
                {userData?.$id === blog?.userId && (
                    <>
                        <Link to={`/edit-blog/${id}`}>
                            <Button className="max-w-fit" >Edit Blog</Button>
                        </Link>
                        <Link onClick={deletePost}>
                            <Button className="max-w-fit" >Delete Blog</Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
