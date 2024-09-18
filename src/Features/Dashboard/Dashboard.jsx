import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
	return (
		<div className='bg-gradient-to-br from-[var(--primary-light)] via-[var(--primary-dark)] to-[var(--primary-light)] w-full min-h-screen grid grid-cols-[70px_1fr] md:grid-cols-[230px_1fr] gap-x-0 md:gap-x-4'>
			<Sidebar />
			<div className='p-4 md:p-6 relative'>
				<Outlet />
			</div>
		</div>
	);
};

export default Dashboard;
