import { NavLink } from "react-router-dom";
import { navLinks } from "./Header";

function MobileNav() {
	return (
		<nav
			role='navigation'
			className='fixed md:hidden flex items-center min-width-[350px] bottom-2 bg-[var(--primary-dark)] h-16 left-1/2 p-2 -translate-x-1/2 rounded-full shadow justify-center gap-6 mobile-nav'>
			{navLinks.map((link) => (
				<NavLink
					to={link.link}
					key={link.id}
					className='w-12 bg-transparent flex items-center justify-center rounded-full h-12 transition-colors duration-200'>
					<span className='text-white text-lg'>{link.icon}</span>
				</NavLink>
			))}
		</nav>
	);
}
export default MobileNav;
