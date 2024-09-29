import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth, googleProvider } from "../../config/firebase";
import {
	signInWithEmailAndPassword,
	signOut,
	createUserWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";

const AuthContext = createContext();

function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [walletAddress, setWalletAddress] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem("user"));
		let walletAddress;

		const wagmiStore = localStorage.getItem("wagmi.store") || {};
		const { state } = JSON.parse(wagmiStore);

		if (state.connections.value.length > 0) {
			walletAddress = state.connections.value[0][1].accounts[0];
		} else walletAddress = localStorage.getItem("walletAddress");

		if (storedUser) {
			setUser(storedUser);
		}

		if (walletAddress) {
			setWalletAddress(walletAddress);
		}

		setIsLoading(false);
	}, []);

	async function handleConnectWallet(address) {
		setWalletAddress(address);

		localStorage.setItem("walletAddress", address);
		return address;
	}

	async function handleNewUser(userData) {
		try {
			const data = await createUserWithEmailAndPassword(
				useFirebaseAuth,
				userData.email,
				userData.password
			);
			console.log(data);
			// if (data) handleLogin(data.email);
			// return data;
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

	async function handleLogin(email, password) {
		try {
			const data = await signInWithEmailAndPassword(
				useFirebaseAuth,
				email,
				password
			);

			console.log(data);

			if (!data) {
				const { user } = data;
				setUser(user);
				localStorage.setItem("user", JSON.stringify(user));
				navigate("/dashboard");
				return user;
			} else {
				throw new Error("No user found");
			}
		} catch (error) {
			console.error("Error logging in:", error);
		}
	}

	const handleGoogleSignIn = async () => {
		try {
			setIsLoading(true);
			const data = await signInWithPopup(useFirebaseAuth, googleProvider);
			const { user } = data;

			return user;
		} catch (error) {
			console.error("Error signing in with Google:", error);
		} finally {
			setIsLoading(false);
		}
	};

	async function logout() {
		await signOut(useFirebaseAuth);
		navigate("/login");
		setUser(null);
		localStorage.removeItem("user");
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				walletAddress,
				isLoading,
				setIsLoading,
				handleConnectWallet,
				handleLogin,
				logout,
				handleLogout: logout,
				handleNewUser,
				updateUser: handleUpdateUser,
				handleGoogleSignIn,
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
