import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useAuth } from "../../Services/contexts/AuthProvider";

function WalletConnect() {
	const { address } = useAccount();
	const { handleConnectWallet, walletAddress } = useAuth();

	useEffect(() => {
		if (address) {
			console.log("calling again!");
			handleConnectWallet(address);
		}
	}, [address]);

	return (
		<ConnectButton
			accountStatus={{
				smallScreen: "avatar",
				largeScreen: "address",
			}}
			chainStatus='none'
			showBalance={{ smallScreen: false, largeScreen: false }}
		/>
	);
}

export default WalletConnect;
