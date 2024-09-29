import { FcGoogle } from "react-icons/fc";

function GoogleAuthButton({ onClick }) {
	return (
		<button
			onClick={onClick}
			className='w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-200 bg-[var(--primary-light)] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
			<FcGoogle className='h-5 w-5 mr-2' />
			Sign in with Google
		</button>
	);
}

export default GoogleAuthButton;
