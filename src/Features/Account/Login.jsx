import { useState } from "react";
import { useAuth } from "../../Services/contexts/AuthProvider";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { EMAIL_REGEX } from "../../Services/constants";
import { FaRegEye, FaRegEyeSlash, FaSpinner } from "react-icons/fa6";
import GoogleAuthButton from "../../Auth/GoogleAuthButton";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const {
		handleLogin,
		walletAddress,
		handleConnectWallet,
		handleGoogleSignIn,
		isLoading,
		setIsLoading,
	} = useAuth();

	async function handleSubmit(e) {
		e.preventDefault();

		if (!email.trim()) {
			alert("Please enter your email address.");
			return;
		}

		if (!EMAIL_REGEX.test(email)) {
			alert("Please enter a valid email address.");
			return;
		}

		if (!password.trim()) {
			alert("Please enter your password.");
			return;
		}

		if (password.length < 8) {
			alert("Password must be at least 8 characters long.");
			return;
		}

		if (!walletAddress) {
			alert("Please connect your wallet to continue!");
			const address = await handleConnectWallet(); // Connect wallet

			return;
		}

		try {
			setIsLoading(true);
			const data = await handleLogin(email, password);
			if (!data)
				throw new Error("User not found, make sure to check the email");
		} catch (error) {
			console.error("Couldn't login user: ", error.message);
			alert(error.message);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className=' flex items-center justify-center w-full p-6'>
			<div className='bg-[var(--primary-dark)] translate-y-[30%] md:translate-y-50 p-8 rounded-lg shadow-md w-full max-w-md'>
				<h2 className='text-3xl font-bold text-center mb-4'>Login</h2>
				<p className='text-center text-gray-50 mb-6 md:text-md text-sm'>
					Enter your credentials to access your account
				</p>
				<form onSubmit={handleSubmit}>
					<div className='space-y-4'>
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
								defaultValue={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder='test@example.com'
							/>
						</div>
						<div className='relative'>
							<label
								htmlFor='password'
								className='block text-md font-medium text-gray-50 mb-2'>
								Password
							</label>
							<input
								id='password'
								type={showPassword ? "text" : "password"}
								className='w-full px-3 py-2 bg-[#0a0e1750] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								defaultValue={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder='********'
							/>
							<button
								type='button'
								className='absolute right-2 bottom-1 transform -translate-y-1/2 text-gray-500 hover:text-gray-300'
								onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? (
									<FaRegEyeSlash className='h-5 w-5' />
								) : (
									<FaRegEye className='h-5 w-5' />
								)}
							</button>
						</div>
						<button
							type='submit'
							className='w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
							{isLoading ? (
								<FaSpinner className='animate-spin' />
							) : (
								"Log In"
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
						<GoogleAuthButton onClick={handleGoogleSignIn} />
					</div>
					<div className='flex items-center gap-2 w-5/6 mx-auto mt-4'>
						<p className='text-center text-sm text-white'>
							don't have an account yet?
						</p>
						<Link to='/register'>SignUp</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
