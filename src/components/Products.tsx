import React, { useState } from "react";
import useGetProducts from "../hooks/useGetProducts";
import ProductCard from "./ProductCard";

const Products: React.FC = () => {
	const [itemsPerPage, setItemsPerPage] = useState(4);
	const [currentPage, setCurrentPage] = useState(1);

	// Get products data using hook
	const { productCount, totalPages, products, isProductsLoading } =
		useGetProducts(
			["products", currentPage.toString(), itemsPerPage.toString()],
			`sort=price_desc&page=${currentPage}&size=${itemsPerPage}`
		);

	const pages = [...Array(totalPages).keys()];

	const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const pageValue = parseInt(e.target.value);
		setItemsPerPage(pageValue);
		setCurrentPage(1); // Reset to first page when items per page changes
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<section>
			{/* <SectionHeader heading={`Total ${productCount} Products`} /> */}
			{`Total ${productCount} Products`}
			<div className="grid lg:grid-cols-2 gap-6">
				{isProductsLoading
					? "Loading..."
					: products?.map((product) => (
							<ProductCard key={product._id} product={product} />
					  ))}
			</div>
			<div className="flex flex-col gap-4 justify-center items-center font-semibold mt-8 lg:mt-16">
				<p className="text-prodigy-primary">
					Page: {currentPage} of {totalPages}
				</p>
				<div className="flex gap-3">
					<button
						className="px-3 border disabled:text-gray-500 disabled:border-gray-500 disabled:hover:text-gray-500 disabled:hover:bg-transparent text-prodigy-primary border-prodigy-primary hover:bg-prodigy-primary hover:text-white"
						disabled={currentPage === 1}
						onClick={handlePreviousPage}
					>
						Previous
					</button>

					{pages.map((page) => (
						<button
							className={`px-3 border ${
								currentPage === page + 1
									? "bg-prodigy-primary border-prodigy-primary text-white hover:bg-transparent hover:text-prodigy-primary"
									: "text-prodigy-primary border-prodigy-primary hover:bg-prodigy-primary hover:text-white"
							}`}
							onClick={() => setCurrentPage(page + 1)}
							key={page}
						>
							{page + 1}
						</button>
					))}

					<button
						className="px-3 border disabled:text-gray-500 disabled:border-gray-500 disabled:hover:text-gray-500 disabled:hover:bg-transparent text-prodigy-primary border-prodigy-primary hover:bg-prodigy-primary hover:text-white"
						disabled={
							currentPage === totalPages || totalPages === 0
						}
						onClick={handleNextPage}
					>
						Next
					</button>
				</div>
				<select
					className="border px-2 py-1 focus:text-prodigy-primary outline-prodigy-primary border-prodigy-primary text-prodigy-primary bg-transparent focus:border-2 mx-auto mb-12"
					value={itemsPerPage}
					onChange={handleItemsPerPage}
					name="products"
					id="products"
				>
					<option value="2">Products Per Page: 2</option>
					<option value="6">Products Per Page: 6</option>
					<option value="8">Products Per Page: 8</option>
					<option value="16">Products Per Page: 16</option>
				</select>
			</div>
		</section>
	);
};

export default Products;
