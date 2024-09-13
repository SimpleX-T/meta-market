import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "../Services/contexts/AuthProvider";

import AppLayout from "./UI/AppLayout";
import Home from "./Features/LandingPage/Home";
import ProtectedRoute from "../Services/Routes/ProtectedRoute";
import Dashboard from "./Features/Dashboard/Dashboard";
import Login from "./Features/Account/Login";
import SignUp from "./Features/Account/SignUp";
import UserProfile from "./Pages/UserProfile";
import NFTCollectionPage from "./Pages/NFTCollectionPage";
import NFTSalesPage from "./Pages/NFTSalesPage";
import MintingPage from "./Pages/MintingPage";
import NFTMarket from "./Pages/NFTMarket";
import NFTCommunityPage from "./Pages/NFTCommunityPage";
import PromotionsPage from "./Pages/PromotionsPage";
import Settings from "./Pages/Settings";
import SupportsPage from "./Pages/SupportsPage";

//// rainbow kit ////

import "@rainbow-me/rainbowkit/styles.css";
import {
	getDefaultConfig,
	RainbowKitProvider,
	midnightTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ErrorPage from "./Pages/ErrorPage";

const config = getDefaultConfig({
	appName: "NFT minter",
	projectId: "0d497b7616dd585ff2048252c7d1e3c0",
	chains: [mainnet, polygon, optimism, arbitrum, base],
	ssr: false,
});

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					<RainbowKitProvider
						modalSize='compact'
						theme={midnightTheme({
							...midnightTheme.accentColors.blue,
							overlayBlur: "small",
						})}>
						<Router>
							<AuthProvider>
								<Routes>
									<Route element={<AppLayout />}>
										<Route
											path='/'
											element={<Home />}
										/>
										<Route
											path='/login'
											element={<Login />}
										/>
										<Route
											path='/register'
											element={<SignUp />}
										/>
									</Route>
									<Route
										path='/dashboard'
										element={
											<ProtectedRoute>
												<Dashboard />
											</ProtectedRoute>
										}>
										<Route
											index
											element={<UserProfile />}
										/>

										<Route
											path='profile'
											element={<UserProfile />}
										/>

										<Route
											path='settings'
											element={<Settings />}
										/>
										<Route
											path='nfts'
											element={<NFTCollectionPage />}
										/>
										<Route
											path='sales'
											element={<NFTSalesPage />}
										/>
										<Route
											path='mint'
											element={<MintingPage />}
										/>
										<Route
											path='listings'
											element={<NFTMarket />}
										/>
										<Route
											path='community'
											element={<NFTCommunityPage />}
										/>
										<Route
											path='promotions'
											element={<PromotionsPage />}
										/>
										<Route
											path='support'
											element={<SupportsPage />}
										/>
									</Route>
									<Route
										path='*'
										element={<ErrorPage />}
									/>
								</Routes>
							</AuthProvider>
						</Router>
					</RainbowKitProvider>
				</QueryClientProvider>
			</WagmiProvider>
			{/* <ToastContainer /> */}
		</>
	);
}

export default App;
