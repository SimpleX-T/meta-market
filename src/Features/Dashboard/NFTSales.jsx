import React, { useEffect, useState } from "react";

function NFTSales() {
	const [salesData, setSalesData] = useState([]);

	useEffect(() => {
		const fetchSalesData = async () => {
			const response = await fetch("http://localhost:3000/sales"); // Assuming you have a sales endpoint
			const data = await response.json();
			setSalesData(data);
		};

		fetchSalesData();
	}, []);

	return (
		<div className='p-6 bg-[var(--primary-dark)] rounded-lg shadow-md'>
			<h2 className='text-2xl font-bold mb-4'>Sales & Earnings</h2>
			<ul>
				{salesData.length > 0 &&
					salesData.map((sale, index) => (
						<li
							key={index}
							className='mb-2'>
							<span className='font-semibold'>
								{sale.nftTitle}
							</span>
							: {sale.amount} ETH on {sale.date}
						</li>
					))}
			</ul>
		</div>
	);
}

export default NFTSales;
