import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { MainPost } from './main-post';

const Home = () => {
  const [postsList, setPostsList] = useState(null);

  const postRef = collection(db, 'posts');

  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  });

  return (
    <header className="home">
      {postsList?.map((post) => {
        return <MainPost post={post} key={post.id} />;
      })}
    </header>
  );
};

export default Home;
