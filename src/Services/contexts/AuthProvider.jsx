import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [walletAddress, setWalletAddress] = useState("");
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem("user"));
		const walletAddress = localStorage.getItem("walletAddress");

		if (storedUser) {
			setUser(storedUser);
		}

		if (walletAddress) {
			setWalletAddress(walletAddress);
		}

		setLoading(false);
	}, []);

	async function handleConnectWallet(address) {
		setWalletAddress(address);

		localStorage.setItem("walletAddress", address);
		return address;
	}

	async function handleNewUser(userData) {
		try {
			const response = await fetch("http://localhost:3000/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});
			const data = await response.json();
			if (data) handleLogin(data.email);
			return data;
		} catch (error) {
			console.error("Error creating user:", error);
		}
	}

	async function handleUpdateUser(id, userData) {
		try {
			const response = await fetch(`http://localhost:3000/users/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});
			const data = await response.json();
			if (data) handleLogin(data.email);
			return data;
		} catch (error) {
			console.error("Error creating user:", error);
		}
	}

	async function handleLogin(email) {
		try {
			const response = await fetch(
				`http://localhost:3000/users?email=${email}`
			);

			const data = await response.json();

			if (data.length > 0) {
				const user = data[0];
				setUser(user);
				localStorage.setItem("user", JSON.stringify(user));
				navigate("/dashboard");
				return user;
			} else {
				alert(
					"User not found, please make sure to input the correct email and try again!"
				);
				throw new Error("No user found");
			}
		} catch (error) {
			console.error("Error logging in:", error);
		}
	}

	function logout() {
		setUser(null);
		localStorage.removeItem("user");
		navigate("/login");
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				walletAddress,
				loading,
				handleConnectWallet,
				handleLogin,
				logout,
				setUser,
				handleNewUser,
				updateUser: handleUpdateUser,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);

	if (context === undefined)
		throw new Error("AuthContext was used outside the scope");

	return context;
}

export { AuthProvider, useAuth };
