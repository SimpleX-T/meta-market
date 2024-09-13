import { useNavigation } from "react-router-dom";

function ErrorPage() {
	const navigate = useNavigation();
	return (
		<div>
			<h1 className='text-6xl'>404</h1>
			<p>The page you are looking for does not exist</p>
			<button onClick={(e) => navigate(-1)}>Go Back</button>
		</div>
	);
}
export default ErrorPage;
