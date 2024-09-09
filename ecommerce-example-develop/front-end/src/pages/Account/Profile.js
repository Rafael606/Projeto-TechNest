// import { useSelector } from 'react-redux';
// import { useRef, useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import {
//   updateUserStart,
//   updateUserSuccess,
//   updateUserFailure,
//   deleteUserStart,
//   deleteUserSuccess,
//   deleteUserFailure,
//   signOut,
// } from '../../redux/userSlice';

// export default function Profile() {
//   const dispatch = useDispatch();
//   const fileRef = useRef(null);
//   const [image, setImage] = useState(undefined);
//   const [imageError, setImageError] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [updateSuccess, setUpdateSuccess] = useState(false);

//   const { currentUser, loading, error } = useSelector((state) => state.user || {});

//   useEffect(() => {
//     if (image) {
//       handleFileUpload(image);
//     }
//   }, [image]);

//   const handleFileUpload = async (image) => {
//     const formData = new FormData();
//     formData.append('image', image);  // Adiciona o arquivo da imagem ao formData
//     formData.append('userId', currentUser._id);  // ID do usuário

//     try {
//       const res = await fetch(`/api/upload`, {
//         method: 'POST',
//         body: formData,
//       });
//       const data = await res.json();
//       if (data.success) {
//         setFormData({ ...formData, profilePicture: data.imageUrl });
//       } else {
//         setImageError(true);
//       }
//     } catch (error) {
//       setImageError(true);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(updateUserStart());
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(updateUserFailure(data));
//         return;
//       }
//       dispatch(updateUserSuccess(data));
//       setUpdateSuccess(true);
//     } catch (error) {
//       dispatch(updateUserFailure(error));
//     }
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       dispatch(deleteUserStart());
//       const res = await fetch(`/api/user/delete/${currentUser._id}`, {
//         method: 'DELETE',
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data));
//         return;
//       }
//       dispatch(deleteUserSuccess(data));
//     } catch (error) {
//       dispatch(deleteUserFailure(error));
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await fetch('/api/auth/signout');
//       dispatch(signOut());
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (!currentUser) {
//     return <div>Carregando...</div>;
//   }

//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//       <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//         <input
//           type='file'
//           ref={fileRef}
//           hidden
//           accept='image/*'
//           onChange={(e) => setImage(e.target.files[0])}
//         />
//         <img
//           src={formData.profilePicture || currentUser.profilePicture}
//           alt='profile'
//           className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
//           onClick={() => fileRef.current.click()}
//         />
//         <p className='text-sm self-center'>
//           {imageError ? (
//             <span className='text-red-700'>
//               Error uploading image
//             </span>
//           ) : null}
//         </p>
//         <input
//           defaultValue={currentUser.username}
//           type='text'
//           id='username'
//           placeholder='Username'
//           className='bg-slate-100 rounded-lg p-3'
//           onChange={handleChange}
//         />
//         <input
//           defaultValue={currentUser.email}
//           type='email'
//           id='email'
//           placeholder='Email'
//           className='bg-slate-100 rounded-lg p-3'
//           onChange={handleChange}
//         />
//         <input
//           type='password'
//           id='password'
//           placeholder='Password'
//           className='bg-slate-100 rounded-lg p-3'
//           onChange={handleChange}
//         />
//         <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
//           {loading ? 'Loading...' : 'Update'}
//         </button>
//       </form>
//       <div className='flex justify-between mt-5'>
//         <span
//           onClick={handleDeleteAccount}
//           className='text-red-700 cursor-pointer'
//         >
//           Delete Account
//         </span>
//         <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
//           Sign out
//         </span>
//       </div>
//       <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
//       <p className='text-green-700 mt-5'>
//         {updateSuccess && 'User is updated successfully!'}
//       </p>
//     </div>
//   );
// }
