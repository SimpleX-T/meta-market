import { Link } from "react-router-dom";

function Logo() {
	return (
		<Link
			to='/'
			className='block mr-auto'>
			<img
				src='logo.png'
				alt='nft wallet'
				className='w-16 md:w-24 object-cover'
			/>
		</Link>
	);
}
export default Logo;
