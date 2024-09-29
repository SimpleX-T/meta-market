import React, { useState } from "react";
import { useAuth } from "../../Services/contexts/AuthProvider";
function NFTMint() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useAuth();

	// const getImageData = (file) => {
	// 	return new Promise((resolve, reject) => {
	// 		const reader = new FileReader();
	// 		reader.onload = () => resolve(reader.result);
	// 		reader.onerror = () => reject;
	// 		reader.readAsDataURL(file);
	// 	});
	// };

	const handlePhotoChange = async (e) => {
		const file = e.target.files[0];

		if (file) {
			setImage(file);
		}
	};

	const uploadImage = async () => {
		try {
			const formData = new FormData();
			formData.append("file", image);
			formData.append("upload_preset", "nft market");

			const res = await fetch(
				"https://api.cloudinary.com/v1_1/dzwzpjlw8/image/upload",
				{
					method: "POST",
					body: formData,
				}
			);
			if (!res.ok)
				throw new Error("Encountered error while uploading image!");
			const data = await res.json();
			return data.url;
		} catch (error) {
			console.error("Error uploading Image: ", error.message);
		}
	};

	const handleMint = async (e) => {
		e.preventDefault();

		if (!title) {
			alert("Please include a title!");
			return;
		}

		if (!description) {
			alert("Please include a description!");
			return;
		}

		if (!price) {
			alert("Please include a price!");
			return;
		}

		try {
			setIsLoading(true);
			const uploadedImage = await uploadImage();
			const newNFT = {
				...user,
				nfts: [
					...user.nfts,
					{
						id: Math.random(),
						title,
						description,
						owner: user.walletAddress,
						price,
						image: uploadedImage,
					},
				],
			};

			// const res = await fetch(`http://localhost:3000/users/${user.id}`, {
			// 	method: "PATCH",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify(newNFT),
			// });

			// if (!res.ok)
			// 	throw new Error("Sorry, couldn't upload NFT at the moment");

			// const data = await res.json();

			console.log(user);
		} catch (error) {
			console.error("Couldn't upload NFT: ", error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='p-6 bg-[var(--primary-dark)] rounded-lg shadow-md'>
			<h2 className='text-2xl font-bold mb-4'>Mint New NFT</h2>
			<form onSubmit={handleMint}>
				<div className='mb-4'>
					<label className='block text-md font-medium mb-2'>
						Title
					</label>
					<input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='w-full px-3 py-2 border border-gray-700 bg-transparent rounded-md'
						placeholder='NFT Title'
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-md font-medium mb-2'>
						Description
					</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className='w-full px-3 py-2 border border-gray-700 bg-transparent rounded-md'
						placeholder='NFT Description'
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-md font-medium mb-2'>
						Price (ETH)
					</label>
					<input
						type='number'
						value={price}
						onChange={(e) => setPrice(Number(e.target.value))}
						className='w-full px-3 py-2 border border-gray-700 bg-transparent rounded-md'
						placeholder='0.00'
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-md font-medium mb-2'>
						Image
					</label>
					<input
						type='file'
						accept='image/*'
						onChange={handlePhotoChange}
						className='w-full px-3 py-2 border border-gray-700 bg-transparent rounded-md'
					/>
				</div>
				<button
					type='submit'
					className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'>
					{isLoading ? "Uploading..." : "Mint NFT"}
				</button>
			</form>
		</div>
	);
}

export default NFTMint;
