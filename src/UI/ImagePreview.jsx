function ImagePreview({ image, onclick }) {
	return (
		<div
			className='w-full min-h-screen fixed top-0 left-0 bg-black/10 backdrop-blur-sm flex items-center justify-center'
			onClick={onclick}>
			<div className='w-4/5 md:w-[350px] rounded-lg overflow-hidden'>
				<img
					src={image.image}
					alt={image.title}
					className='w-full h-full object-cover'
				/>
			</div>
		</div>
	);
}
export default ImagePreview;
