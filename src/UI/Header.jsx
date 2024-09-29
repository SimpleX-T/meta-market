import { NavLink } from "react-router-dom";
import { ethers } from "ethers";
import Logo from "./Logo";
import { useState } from "react";
import { useAuth } from "../Services/contexts/AuthProvider";
import {
	FaGift,
	FaHome,
	FaQuestion,
	FaQuestionCircle,
	FaUsers,
} from "react-icons/fa";
import WalletConnect from "./WalletConnect";

export const navLinks = [
	{
		id: 1,
		link: "/",
		title: "Home",
		icon: <FaHome />,
	},
	{
		id: 3,
		link: "/features",
		title: "Features",
		icon: <FaGift />,
	},
	{
		id: 5,
		link: "/home/#about",
		title: "About Us",
		icon: <FaUsers />,
	},
];

function Header() {
	const { walletAddress, handleConnectWallet } = useAuth();

	return (
		<header className='flex items-center gap-4 bg-[#0a0e1760] border border-[#8cacf220] backdrop-blur-md w-[90%] md:w-5/6 h-20 md:h-24 rounded-lg z-[5] absolute left-1/2 transform -translate-x-1/2 top-6 px-3 md:p-8 mx-auto'>
			<Logo />

			<nav className='md:flex hidden items-center mr-auto gap-8'>
				{navLinks.map((link) => (
					<NavLink
						className='text-md font-medium hover:text-white/45 relative'
						to={link.link}
						key={link.id}>
						{link.title}
					</NavLink>
				))}
			</nav>

			<div className='flex items-center'>
				<WalletConnect />
			</div>
		</header>
	);
}
export default Header;
