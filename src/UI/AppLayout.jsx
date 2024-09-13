import { Outlet } from "react-router-dom";
import Header from "../UI/Header";
import MobileNav from "../UI/MobileNav";

function AppLayout() {
	return (
		<div className='bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary-light)] to-[var(--primary-dark)]  w-full min-h-screen h-auto'>
			<Header />

			<main className='relative'>
				<Outlet />
				<MobileNav />
			</main>
		</div>
	);
}
export default AppLayout;
