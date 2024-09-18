import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { EMAIL_REGEX } from "../../Services/constants";
import { useAuth } from "../../Services/contexts/AuthProvider";
import { FaSpinner } from "react-icons/fa6";

function SignUp() {
	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [profilePhoto, setProfilePhoto] = useState("");
	const { handleConnectWallet, walletAddress, handleNewUser } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name.trim()) {
			alert("Please enter your full name.");
			return;
		}

		if (!email.trim()) {
			alert("Please enter your email address.");
			return;
		}

		if (!EMAIL_REGEX.test(email)) {
			alert("Please enter a valid email address.");
			return;
		}

		if (!walletAddress) {
			alert("Please connect your wallet to continue!");
			handleConnectWallet();
			return;
		}

		try {
			setIsLoading(true);
			const date = new Date();
			const joinDate = date.toISOString();
			const userData = {
				name,
				email,
				walletAddress,
				profilePhoto: profilePhoto ? profilePhoto : "",
				joinDate,
				nfts: [],
				sales: [],
			};
			console.log(userData);

			const data = await handleNewUser(userData);
			if (!data) throw new Error("Unable to create new user");
		} catch (error) {
			console.error("User creation failed", error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handlePhotoChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setProfilePhoto(URL.createObjectURL(file));
			console.log(profilePhoto);
		}
	};

	return (
		<div className='flex items-center justify-center w-full px-6'>
			<div className='bg-[var(--primary-dark)] mt-48 mb-20 p-8 rounded-lg shadow-md w-full max-w-md'>
				<h2 className='text-3xl font-bold text-center mb-4'>Sign Up</h2>
				<p className='text-center text-gray-50 mb-6 text-md'>
					Create your account to get started
				</p>
				<form onSubmit={handleSubmit}>
					<div className='space-y-4'>
						<div>
							<label
								htmlFor='name'
								className='block text-md font-medium text-gray-50 mb-2'>
								Full Name
							</label>
							<input
								id='name'
								type='text'
								className='w-full px-3 py-2 bg-[#0a0e1750] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder='John Doe'
							/>
						</div>

						<div>
							<label
								htmlFor='email'
								className='block text-md font-medium text-gray-50 mb-2'>
								Email
							</label>
							<input
								id='email'
								type='email'
								className='w-full px-3 py-2 bg-[#0a0e1750] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder='test@example.com'
							/>
						</div>

						<div>
							<label
								htmlFor='pfp'
								className='block text-md font-medium text-gray-50 mb-2'>
								Profile Picture
							</label>
							<input
								id='pfp'
								type='file'
								accept='image/*'
								className='w-full px-3 py-2 bg-[#0a0e1750] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								onChange={handlePhotoChange}
							/>
						</div>

						<div>
							<label
								htmlFor='address'
								className='block text-md font-medium text-gray-50 mb-2'>
								Wallet Address
							</label>
							<input
								id='address'
								type='text'
								className='w-full px-3 py-2 bg-[#0a0e1750] opacity-50 cursor-not-allowed border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								disabled
								value={`${walletAddress.slice(
									0,
									6
								)}...${walletAddress.slice(-4)}`}
							/>
						</div>

						<button
							type='submit'
							className='w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
							{isLoading ? (
								<FaSpinner className='animate-spin text-lg' />
							) : (
								<span>Sign Up</span>
							)}
						</button>
					</div>
				</form>

				<div className='mt-6'>
					<div className='relative'>
						<div className='absolute inset-0 flex items-center'>
							<div className='w-full border-t border-gray-300'></div>
						</div>
						<div className='relative flex justify-center text-sm'>
							<span className='px-2 bg-white text-gray-900'>
								Or continue with
							</span>
						</div>
					</div>
					<div className='mt-6'>
						<button className='w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-200 bg-[var(--primary-light)] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
							<FcGoogle className='h-5 w-5 mr-2' />
							Sign up with Google
						</button>
					</div>
					<div className='flex items-center gap-2 w-5/6 mx-auto mt-4'>
						<p className='text-center text-white text-sm'>
							Already have an account?
						</p>
						<Link to='/login'>Login</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
