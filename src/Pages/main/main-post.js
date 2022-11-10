/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../config/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export const MainPost = ({ post }) => {
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState(null);
  const [dislikes, setDislikes] = useState(null);

  const likesRef = collection(db, 'likes');
  const dislikesRef = collection(db, 'dislikes');

  const likesDoc = query(likesRef, where('postId', '==', post.id));
  const dislikesDoc = query(dislikesRef, where('postId', '==', post.id));

  const getLikes = useCallback(async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
  }, []);

  const getDislikes = useCallback(async () => {
    const data = await getDocs(dislikesDoc);
    setDislikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
  }, []);

  useEffect(() => {
    getLikes();
    getDislikes();
  }, [getLikes, getDislikes]);

  const addLike = async () => {
    await addDoc(likesRef, {
      userId: user?.uid,
      postId: post.id,
    });
  };

  const addDislike = async () => {
    await addDoc(dislikesRef, {
      userId: user?.uid,
      postId: post.id,
    });
  };

  return (
    <div className="postId">
      <div className="top">
        <h3>{post.title}</h3>
        <p>{post.description}</p>
      </div>
      <div className="bottom">
        <p>@{post.username}</p>
        <div className="toggle-button">
          <div className="likes">
            <button onClick={addLike}>&#128077;</button>
            <p>Likes: {likes?.length} </p>
          </div>
          <div className="dislikes">
            <button onClick={addDislike}>&#128078;</button>
            <p>Dislikes: {dislikes?.length} </p>
          </div>
        </div>
      </div>
    </div>
  );
};
