import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetailsPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`https://alumni-deploy-last.onrender.com/api/forums/post/${postId}`);
 // Ensure this matches your backend route
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="post-details-page p-8">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p>{post.content}</p>
            {post.photo && <img src={post.photo} alt="Post" />}
            {post.video && <video src={post.video} controls />}
        </div>
    );
};

export default PostDetailsPage;
