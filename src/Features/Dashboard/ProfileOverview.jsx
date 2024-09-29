import React from "react";
import { useAuth } from "../../Services/contexts/AuthProvider";
import Spinner from "../../UI/Spinner";

function ProfileOverview() {
	const { user, isLoading } = useAuth();

	if (isLoading) return <Spinner />;

	return (
		<div className='p-6 bg-[var(--primary-dark)] rounded-lg shadow-md'>
			<h2 className='text-2xl font-bold mb-4'>Profile Overview</h2>
			<div className='flex flex-col items-center mb-6'>
				{user.profilePhoto ? (
					<img
						src={user.profilePhoto}
						alt={user.name}
						className='w-24 h-24 rounded-full object-cover mb-4 border-gray-700 border'
					/>
				) : (
					<div className='w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4'>
						<span className='text-2xl font-bold text-gray-600'>
							{user.name ? user.name[0].toUpperCase() : "U"}
						</span>
					</div>
				)}
				<h3 className='text-xl font-semibold'>
					{user.name.split(" ")[0]}
				</h3>
			</div>
			<div className='space-y-4'>
				<div>
					<p className='text-sm text-gray-400'>Full Name</p>
					<p className='text-lg'>{user.name}</p>
				</div>
				<div>
					<p className='text-sm text-gray-400'>Email</p>
					<p className='text-lg'>{user.email}</p>
				</div>
				{user.joinDate && (
					<div>
						<p className='text-sm text-gray-400'>Member Since</p>
						<p className='text-lg'>
							{new Date(user.joinDate).toLocaleDateString()}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default ProfileOverview;

// import { useState } from "react";
// import { useAuth } from "../../../Services/contexts/AuthProvider";
// import Spinner from "../../UI/Spinner";
// function ProfileOverview() {
// 	const { user, loading } = useAuth();
// 	const [name, setName] = useState(user.name);
// 	const [email, setEmail] = useState(user.email);
// 	const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto);

// 	const handlePhotoChange = (e) => {
// 		const file = e.target.files[0];
// 		if (file) {
// 			setProfilePhoto(URL.createObjectURL(file)); // Preview the photo
// 		}
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		const updatedUser = { ...user, name, email, profilePhoto };
// 		updateUser(updatedUser); // Update user in context or API
// 	};

// 	if (loading) return <Spinner />;

// 	return (
// 		<div className='p-6 bg-[var(--primary-dark)] rounded-lg shadow-md'>
// 			<h2 className='text-2xl font-bold mb-4'>Profile Overview</h2>
// 			<form onSubmit={handleSubmit}>
// 				<div className='mb-4'>
// 					<label className='block text-md font-medium mb-2'>
// 						Full Name
// 					</label>
// 					<input
// 						type='text'
// 						value={name}
// 						onChange={(e) => setName(e.target.value)}
// 						className='w-full px-3 py-2 border border-gray-700 bg-transparent rounded-md'
// 						placeholder='John Doe'
// 					/>
// 				</div>
// 				<div className='mb-4'>
// 					<label className='block text-md font-medium mb-2'>
// 						Email
// 					</label>
// 					<input
// 						type='email'
// 						value={email}
// 						onChange={(e) => setEmail(e.target.value)}
// 						className='w-full px-3 py-2 border border-gray-700 bg-transparent rounded-md'
// 						placeholder='test@example.com'
// 					/>
// 				</div>
// 				<div className='mb-4'>
// 					<label className='block text-md font-medium mb-2'>
// 						Profile Photo
// 					</label>
// 					<input
// 						type='file'
// 						accept='image/*'
// 						onChange={handlePhotoChange}
// 						className='w-full px-3 py-2 border border-gray-700 bg-transparent rounded-md'
// 					/>
// 				</div>
// 				<button
// 					type='submit'
// 					className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'>
// 					Save Changes
// 				</button>
// 			</form>
// 		</div>
// 	);
// }
// export default ProfileOverview;

// /*

//     */
