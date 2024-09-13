import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import Spinner from "../../src/UI/Spinner";

const ProtectedRoute = ({ children }) => {
	const { user, loading, setUser } = useAuth();
	const navigate = useNavigate();

	if (loading) {
		return <Spinner />;
	}

	if (!user) {
		navigate("/login");

		setUser(null);
		localStorage.removeItem("user");
	}

	return children;
};

export default ProtectedRoute;
