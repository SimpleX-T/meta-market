import { NavLink } from "react-router-dom";
import {
	FaUser,
	FaImages,
	FaDollarSign,
	FaPlusCircle,
	FaStore,
	FaComments,
	FaBullhorn,
	FaQuestionCircle,
	FaCog,
} from "react-icons/fa";
import { useAuth } from "../../Services/contexts/AuthProvider";
import { MdLogout } from "react-icons/md";

const dashboardLinks = [
	{
		id: 1,
		title: "Profile Overview",
		link: "/dashboard/profile",
		icon: <FaUser />,
	},
	{
		id: 2,
		title: "NFT Collection",
		link: "/dashboard/nfts",
		icon: <FaImages />,
	},
	{
		id: 3,
		title: "Sales & Earnings",
		link: "/dashboard/sales",
		icon: <FaDollarSign />,
	},
	{
		id: 4,
		title: "Mint New NFT",
		link: "/dashboard/mint",
		icon: <FaPlusCircle />,
	},
	{
		id: 5,
		title: "Marketplace Listings",
		link: "/dashboard/listings",
		icon: <FaStore />,
	},
	{
		id: 6,
		title: "Community Engagement",
		link: "/dashboard/community",
		icon: <FaComments />,
	},
	{
		id: 7,
		title: "Promotional Tools",
		link: "/dashboard/promotions",
		icon: <FaBullhorn />,
	},
	{
		id: 8,
		title: "Support & Resources",
		link: "/dashboard/support",
		icon: <FaQuestionCircle />,
	},
	{
		id: 9,
		title: "Settings",
		link: "/dashboard/settings",
		icon: <FaCog />,
	},
];

function DashboardLink({ link }) {
	const { title, link: url, icon } = link;
	return (
		<NavLink
			to={url}
			className='font-medium py-3 pl-4 text-sm my-2 hover:bg-[var(--primary-light)] hover:shadow-sm rounded-md flex items-center gap-2'>
			<span
				className='inline-block text-2xl md:text-base'
				title={title}>
				{icon}
			</span>
			<span className='hidden md:block'>{title}</span>
		</NavLink>
	);
}

function Sidebar() {
	const { logout } = useAuth();
	return (
		<aside className='dashboard-sidebar w-full rounded-r-lg  bg-[var(--primary-dark)] text-[var(--text-primary)] relative h-full px-2 shadow-md'>
			<h2 className='text-center hidden md:block text-3xl font-bold py-4'>
				Dashboard
			</h2>
			<ul className='mt-4 mb-auto w-full'>
				{dashboardLinks.map((link, index) => (
					<DashboardLink
						link={link}
						key={index}
					/>
				))}
			</ul>

			<div className='w-full absolute bottom-4 left-0 px-2 pb-4'>
				<button
					onClick={logout}
					className='font-medium py-3 pl-4 w-full hover:bg-[var(--primary-light)] hover:shadow-sm rounded-md flex items-center gap-1'>
					<span className='text-3xl md:text-lg'>
						<MdLogout />
					</span>
					<span className='hidden md:block'>Logout</span>
				</button>
			</div>
		</aside>
	);
}

export default Sidebar;
