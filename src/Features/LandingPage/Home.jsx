import { Link } from "react-router-dom";

import { FaExternalLinkAlt } from "react-icons/fa";
import { useState, useEffect } from "react";

const nfts = [
	{
		id: 1,
		imageUrl: "nfts/nft1.jpg",
	},
	{
		id: 2,
		imageUrl: "nfts/nft2.jpg",
	},
	{
		id: 3,
		imageUrl: "nfts/nft3.jpg",
	},
	{
		id: 4,
		imageUrl: "nfts/nft4.jpg",
	},
	{
		id: 5,
		imageUrl: "nfts/nft5.jpg",
	},
	{
		id: 6,
		imageUrl: "nfts/nft6.jpg",
	},
	{
		id: 7,
		imageUrl: "nfts/nft7.jpg",
	},
	{
		id: 8,
		imageUrl: "nfts/nft8.jpg",
	},
	{
		id: 9,
		imageUrl: "nfts/nft9.jpg",
	},
	{
		id: 10,
		imageUrl: "nfts/nft10.jpg",
	},
	{
		id: 11,
		imageUrl: "nfts/nft11.jpg",
	},
	{
		id: 12,
		imageUrl: "nfts/nft12.jpg",
	},
];

function ImageSlider() {
	const shuffledNfts = [...nfts].sort(() => Math.random() - 0.5);

	return (
		<div
			className='slider'
			style={{
				"--width": "200px",
				"--height": "200px",
				"--amount": nfts.length,
			}}>
			<div
				className='list'
				style={{
					"--min-width": 200 * nfts.length + "px",
				}}>
				{shuffledNfts.map((image, index) => (
					<div
						key={image.id}
						style={{
							animationDelay:
								(42 / nfts.length) * (index + 1 - 1) - 33 + "s",
						}}
						className='item overflow-hidden rounded-2xl'>
						<img
							src={image.imageUrl}
							alt={`NFT ${image.id}`}
							className='object-cover'
						/>
					</div>
				))}
			</div>
		</div>
	);
}

function BlurryCircle() {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e) => {
			setPosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<div
			className='w-32 h-32 rounded-full absolute -z-10 bg-gradient-to-tr from-[var(--accent-blue)] via-[var(--accent-green)] to-[var(--accent-purple)]'
			style={{
				left: `${position.x}px`,
				top: `${position.y}px`,
				transform: "translate(-50%, -50%)",
				transition: "left 0.3s ease, top 0.3s ease",
				filter: "blur(20px)",
				opacity: 0.7,
			}}></div>
	);
}

function Home() {
	return (
		<div className='bg-[url("nft_background.jpg")] bg-cover bg-no-repeat w-full relative z-0 pt-12'>
			<div className='absolute overflow-hidden bg-gradient-to-tl from-[var(--primary-light)] to-[var(--primary-dark)] w-full h-full top-0 left-0 mix-blend-multiply'>
				<BlurryCircle />
			</div>
			<section className='w-full mt-[80px] px-6 md:p-0'>
				<div className='w-full md:w-5/6 mx-auto p-6 rounded-lg bg-[#0a0e1760] border border-[#8cacf220] backdrop-blur-md'>
					<div className='w-full mx-auto mb-8'>
						<h1 className='text-5xl md:text-[5rem] leading-[1.15] md:leading-[1] capitalize text-white text-center font-extrabold'>
							discover unique digital art
						</h1>
					</div>

					<div className='w-full mx-auto text-center mb-6 mx'>
						<h3 className='md:text-3xl text-md font-semibold mb-2 capitalize'>
							mint, and Trade NFTs with Ease
						</h3>
						<p className='text-sm md:text-xl'>
							Join a vibrant community of artists and collectors.
							Our platform makes it simple to showcase your
							creativity and invest in unique digital assets.
						</p>
					</div>

					<div className='flex items-center w-fit gap-8 px-4 mb-10 justify-around mx-auto'>
						<Link
							to=''
							className='capitalize hidden md:flex items-center gap-2 hover:text-white/45 py-2 px-4 border rounded-3xl'>
							<span>explore marketplace</span>
							<FaExternalLinkAlt />
						</Link>
						<Link
							to='/login'
							className='capitalize bg-white text-black hover:bg-transparent hover:text-white	 py-2 px-4 border rounded-3xl'>
							mint your art
						</Link>
					</div>
					<div className='mb-6 hidden md:block'>
						<ImageSlider />
					</div>
				</div>
			</section>
			<div className='h-32'></div>
		</div>
	);
}
export default Home;
