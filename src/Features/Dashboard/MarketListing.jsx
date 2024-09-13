import { useEffect, useState } from "react";
import ImagePreview from "../../UI/ImagePreview";

const MarketListing = () => {
	const [listings, setListings] = useState([]);
	const [isImagePreview, setIsImagePreview] = useState(false);
	const [curImage, setCurImage] = useState({});

	const handleImagePreview = (image) => {
		setIsImagePreview(true);
		setCurImage(image);
	};
	useEffect(() => {
		const fetchListings = async () => {
			const response = await fetch("http://localhost:3000/nfts"); // Assuming all NFTs are listed
			const data = await response.json();
			setListings(data);
		};

		fetchListings();
	}, []);

	return (
		<div className='p-6 bg-[var(--primary-dark)] rounded-lg shadow-md'>
			<h2 className='text-2xl font-bold mb-4'>Marketplace Listings</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{listings.map((listing) => (
					<div
						key={listing.id}
						className='border p-4 rounded-lg'
						onClick={(e) => handleImagePreview(listing)}>
						<img
							src={listing.image}
							alt={listing.title}
							className='w-full h-48 object-cover mb-2'
						/>
						<h3 className='text-lg font-semibold'>
							{listing.title}
						</h3>
						<p>{listing.description}</p>
						<p className='font-bold'>Price: {listing.price} ETH</p>
						{/* Add buttons to edit or remove listing */}
					</div>
				))}
			</div>
			{isImagePreview && (
				<ImagePreview
					image={curImage}
					onclick={(e) => setIsImagePreview(false)}
				/>
			)}
		</div>
	);
};

export default MarketListing;
