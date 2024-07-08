import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select, FilePicker } from "./index";
import database from "../appwrite/database";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPost, updatePost } from "../store/postSlice";


function BlogForm({ blog }) {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [preview, setPreview] = useState(blog?.imageUrl)
    const dispatch = useDispatch()

    const { register, getValues, watch, control, handleSubmit, setError, formState: { errors } } =
        useForm({
            defaultValues: {
                title: blog?.title || "",
                description: blog?.description || "",
                status: blog?.status || "active",
            },
        });

    useEffect(() => {
        window.scrollTo(0, 0);
        const subscription = watch((value, { name }) => {
            if (name === "image") {
                setPreview(URL.createObjectURL(value?.image[0]))
            }
            return () => subscription.unsubscribe();
        });
    }, [watch])




    const submit = async (data) => {
        if (blog) {
            let file;
            if (data?.image[0]) {
                const uploadedFile = await database.uploadFile(data?.image[0])
                if (uploadedFile) {
                    await database.deleteFile(blog?.image);
                    file = uploadedFile?.$id
                }
            } else {
                file = blog?.image
            }
            const updateFile = await database.updatePost(blog?.$id, {
                ...data,
                image: file
            });
            if (updateFile) {
                dispatch(updatePost({ $id: blog?.$id, post: { ...updateFile, imageUrl: database.getFilepreview(updateFile?.image) } }))
            }
            navigate(`/blog/${blog?.$id}`);

        } else {
            if (!data) {
                setError("error", {
                    type: "manual",
                    message: "All fields are required"
                });
            }
            const uploadFile = await database.uploadFile(data?.image[0])

            if (uploadFile) {
                data.image = uploadFile?.$id;
                const createPost = await database.createPost({
                    ...data,
                    userId: userData?.$id,
                });
                if (!createPost) {
                    await database.deleteFile(uploadFile?.$id)
                } else {
                    dispatch(addPost({ ...createPost, imageUrl: database.getFilepreview(createPost?.image) }))
                }
                navigate(`/blog/${createPost?.$id}`);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row gap-2 py-10">
            <div className="lg:w-2/3 flex flex-col gap-2 px-2">
                <Input
                    label={"Title"}
                    placeholder={"Title"}
                    maxLength={50}
                    {...register("title", { required: true })}
                />
                <RTE
                    name={"description"}
                    label={"Description"}
                    control={control}
                    defaultValue={getValues("description", { require: true })}
                />
            </div>
            <div className="lg:w-1/3 flex flex-col gap-2 px-2">
                <FilePicker
                    label={"Image :"}
                    type={"file"}
                    className={"max-w-fit"}
                    accept={"image/png, image/jpg, image/jpeg,"}
                    {...register("image", { required: !blog })}
                />
                {preview && (
                    <div className="w-full mb-4">
                        <img
                            src={preview}
                            alt={preview}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inActive"]}
                    label={"Status"}
                    {...register("status", { required: !blog })}
                />
                {errors.error && <p className="text-red-600 self-center mt-1">&#9432; {errors.error.message}</p>}
                <Button type="submit">
                    {blog ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default BlogForm;
