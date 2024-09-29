import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import Spinner from "../../UI/Spinner";

const ProtectedRoute = ({ children }) => {
	const { user, isLoading, handleLogout } = useAuth();
	const navigate = useNavigate();

	if (isLoading) {
		return <Spinner />;
	}

	if (!user) {
		navigate("/login");

		handleLogout();
		localStorage.removeItem("user");
	}

	return children;
};

export default ProtectedRoute;
