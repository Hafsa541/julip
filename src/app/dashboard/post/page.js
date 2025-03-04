'use client';

// app/components/PostList.js

import { Button } from '@mui/material';
import { useState } from 'react';
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from 'src/app/redux/slices/apiSlice';

export default function PostList() {
  const { data: posts, error, isLoading } = useGetPostsQuery();
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [newPostTitle, setNewPostTitle] = useState('');

  const handleCreatePost = async () => {
    const newPost = { title: newPostTitle, body: 'This is a new post', userId: 1 };
    await createPost(newPost);
    setNewPostTitle(''); // Clear input after posting
  };

  const handleUpdatePost = async (id) => {
    const updatedPost = { title: 'Updated Title', body: 'Updated Content' };
    await updatePost({ id, updatedPost });
  };

  const handleDeletePost = async (id) => {
    await deletePost(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <div>
      <h1>Posts</h1>
      <input
        type="text"
        value={newPostTitle}
        onChange={(e) => setNewPostTitle(e.target.value)}
        placeholder="New Post Title"
      />
      <Button variant="outlined" onClick={handleCreatePost}>
        Create Post
      </Button>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            {post.title}
            <Button variant="outlined" onClick={() => handleUpdatePost(post.id)}>
              Update
            </Button>
            <Button variant="outlined" onClick={() => handleDeletePost(post.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
