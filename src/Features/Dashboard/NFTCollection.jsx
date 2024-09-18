import { useEffect, useState } from "react";
import ImagePreview from "../../UI/ImagePreview";
import { Link } from "react-router-dom";
import { useAuth } from "../../Services/contexts/AuthProvider";

const NFTCollection = () => {
	const [NFTs, setNFTs] = useState([]);
	const { user } = useAuth();
	const [isImagePreview, setIsImagePreview] = useState(false);
	const [curImage, setCurImage] = useState({});

	useEffect(() => {
		const fetchNFTs = async () => {
			try {
				const response = await fetch(
					`http://localhost:3000/users/${user?.id}`
				);
				if (!response.ok) {
				}
				const data = await response.json();
				setNFTs(data.nfts);
			} catch (error) {
				console.error("Failed to fetch Collection: ", error.message);
			}
		};

		fetchNFTs();
	}, [user.id]);

	const handleImagePreview = (image) => {
		setIsImagePreview(true);
		setCurImage(image);
	};

	return (
		<div className='p-6 bg-[var(--primary-dark)] rounded-lg shadow-md'>
			<h2 className='text-2xl font-bold mb-4'>My NFT Collection</h2>
			{NFTs ? (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{NFTs.map((nft) => (
						<div
							key={nft.id}
							className='border border-gray-700 p-4 rounded-lg'>
							<div
								className='w-full h-48 overflow-hidden rounded-md cursor-pointer'
								onClick={(e) => handleImagePreview(nft)}>
								<img
									src={nft.image}
									alt={nft.title}
									className='w-full object-cover mb-2'
								/>
							</div>
							<h3 className='text-lg font-semibold'>
								{nft.title}
							</h3>
							<p>{nft.description}</p>
							<p className='font-bold'>Price: {nft.price} ETH</p>
						</div>
					))}
				</div>
			) : (
				<p>
					Sorry, you don't have any NFTs in your collection. Start by
					uploading <Link to='/dashboard/mint'>here</Link>
				</p>
			)}
			{isImagePreview && curImage && (
				<ImagePreview
					image={curImage}
					onclick={(e) => setIsImagePreview(false)}
				/>
			)}
		</div>
	);
};

export default NFTCollection;
