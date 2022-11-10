import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required('You must add a title!'),
    description: yup.string().required('You must add a description!'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, 'posts');

  const submitHandler = async (data) => {
    await addDoc(postRef, {
      title: data.title,
      description: data.description,
      username: user?.displayName,
      userId: user?.uid,
    });

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="create-form">
      <input className="title" placeholder="Title..." {...register('title')} />
      <p>{errors.title?.message}</p>
      <textarea placeholder="Description" rows="5" cols="30" {...register('description')} />
      <p>{errors.description?.message}</p>
      <input className="submit" type="submit" />
    </form>
  );
};
