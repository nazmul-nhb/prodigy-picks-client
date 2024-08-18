import React, { useRef, useState } from "react";
import useGetProducts from "../hooks/useGetProducts";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";
import { FaFilter, FaSearch, FaSortAmountDown } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { MainLoader, SearchLoader } from "./Loaders";

const Products: React.FC = () => {
	const [searchText, setSearchText] = useState<string>("");
	const [selectedBrand, setSelectedBrand] = useState<string>("");
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [minPrice, setMinPrice] = useState<number | "">("");
	const [maxPrice, setMaxPrice] = useState<number | "">("");
	const [sortBy, setSortBy] = useState<string>("");
	const [itemsPerPage, setItemsPerPage] = useState(12);
	const [currentPage, setCurrentPage] = useState(1);

	const inputRef = useRef<HTMLInputElement | null>(null);

	// Get products data using hook
	const {
		productCount,
		totalPages,
		products,
		brands,
		categories,
		isProductsLoading,
	} = useGetProducts(
		[
			"products",
			currentPage,
			itemsPerPage,
			searchText,
			selectedBrand,
			selectedCategory,
			minPrice,
			maxPrice,
			sortBy,
		],
		{
			page: currentPage,
			size: itemsPerPage,
			search: searchText,
			brand: selectedBrand,
			category: selectedCategory,
			minPrice,
			maxPrice,
			sort: sortBy,
		}
	);

	const pages = [...Array(totalPages).keys()];

	const handleSearchProduct = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (searchText.trim() === "") {
			return toast.error("Cannot Perform Empty Search!");
		}
		setSearchText(searchText.trim());
		setCurrentPage(1);
	};

	// Clear Search Text after a search
	const clearSearchText = () => {
		setSearchText("");
		if (inputRef.current) inputRef.current.value = "";
		setCurrentPage(1);
	};

	const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const pageValue = parseInt(e.target.value);
		setItemsPerPage(pageValue);
		setCurrentPage(1);
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
		<section className="w-full overflow-x-hidden mx-auto">
			{/* <SectionHeader heading={`Total ${productCount} Products`} /> */}

			{/* Filter & Search Options */}
			<div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mx-auto gap-4 mb-8 text-sm">
				{/* Filter by Brand */}
				<div className="flex gap-2 w-full items-center relative pl-2 bg-transparent rounded-lg border border-prodigy-secondary">
					<label className="font-medium" htmlFor="brand">
						<FaFilter />
					</label>
					<select
						id="brand"
						name="brand"
						value={selectedBrand || ""}
						onChange={(e) => {
							setSelectedBrand(e.target.value);
							setCurrentPage(1);
						}}
						className="redesign px-2 rounded-r-lg py-2 border-l bg-transparent w-full border-prodigy-secondary focus:outline-0"
					>
						<option value="">All Brands</option>
						{brands?.map((brand: string) => (
							<option key={brand} value={brand}>
								{brand}
							</option>
						))}
					</select>
				</div>

				{/* Filter by Category */}
				<div className="flex gap-2 w-full items-center relative pl-2 bg-transparent rounded-lg border border-prodigy-secondary">
					<label className="font-medium" htmlFor="category">
						<FaFilter />
					</label>
					<select
						id="category"
						name="category"
						value={selectedCategory || ""}
						onChange={(e) => {
							setSelectedCategory(e.target.value);
							setCurrentPage(1);
						}}
						className="redesign px-2 rounded-r-lg py-2 border-l bg-transparent w-full border-prodigy-secondary focus:outline-0"
					>
						<option value="">All Categories</option>
						{categories?.map((category: string) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

				{/* Price Range */}
				<div className="flex gap-2 w-full items-center relative bg-transparent rounded-lg border border-prodigy-secondary">
					<input
						type="number"
						value={minPrice || ""}
						onChange={(e) =>
							setMinPrice(Number(e.target.value) || "")
						}
						placeholder="$ Minimum Price"
						className="px-2 rounded-r-lg py-2 bg-transparent w-full border-prodigy-secondary focus:outline-0"
					/>
					<input
						type="number"
						value={maxPrice || ""}
						onChange={(e) =>
							setMaxPrice(Number(e.target.value) || "")
						}
						placeholder="$ Maximum Price"
						className="px-2 rounded-r-lg py-2 bg-transparent w-full border-l border-prodigy-secondary focus:outline-0"
					/>
				</div>

				{/* Sort Products */}
				<div className="flex gap-2 w-full items-center relative pl-2 bg-transparent rounded-lg border border-prodigy-secondary">
					<label className="font-medium" htmlFor="sort">
						<FaSortAmountDown />
					</label>
					<select
						id="sort"
						value={sortBy}
						onChange={(e) => {
							setSortBy(e.target.value);
							setCurrentPage(1);
						}}
						className="redesign px-2 rounded-r-lg py-2 border-l bg-transparent w-full border-prodigy-secondary focus:outline-0"
					>
						<option value="">Sort Products</option>
						<option value="date_desc">Newest First</option>
						<option value="date_asc">Oldest First</option>
						<option value="price_asc">Price: Low to High</option>
						<option value="price_desc">Price: High to Low</option>
						<option value="ratings_asc">
							Ratings: Low to High
						</option>
						<option value="ratings_desc">
							Ratings: High to Low
						</option>
					</select>
				</div>

				{/* Search Products */}
				<form
					onSubmit={handleSearchProduct}
					className="sm:col-span-2 lg:col-span-2 xl:col-span-1 flex gap-2 items-center justify-start text-prodigy-secondary"
				>
					<div className="flex gap-2 w-full items-center relative pl-2 pr-8 bg-transparent rounded-lg border border-prodigy-secondary">
						<label className="font-medium" htmlFor="search">
							<FaSearch />
						</label>
						<input
							ref={inputRef}
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							className="px-2 rounded-r-lg py-2 bg-transparent w-full border-l border-prodigy-secondary focus:outline-0"
							placeholder="Search Products"
							type="text"
							name="search"
							id="search"
						/>
						<div className="absolute right-1 flex gap-2">
							{searchText !== "" && (
								<button
									title="Clear Search Field"
									onClick={clearSearchText}
									className="text-2xl hover:text-prodigy-primary transition-all duration-500 z-10"
									type="button"
								>
									<MdClear />
								</button>
							)}
						</div>
					</div>
				</form>
			</div>

			{/* Show Product Cards */}
			<div className="">
				{!searchText && isProductsLoading ? (
					MainLoader
				) : searchText && isProductsLoading ? (
					SearchLoader
				) : productCount === 0 ? (
					<div className="flex items-center justify-center mb-6 text-2xl md:text-3xl font-bold font-kreonSerif text-prodigy-secondary">
						No Products Found!
					</div>
				) : (
					<>
						{/* Showing Text for Sort Options */}
						{sortBy && productCount > 0 && (
							<div className="flex items-center justify-center mb-6 text-2xl md:text-3xl font-bold font-kreonSerif text-prodigy-secondary">
								{`Showing ${
									document.querySelector(
										"#sort option:checked"
									)?.textContent
								}`}
							</div>
						)}
						{/* Showing Text for Search & Filters */}
						{(searchText.trim() ||
							minPrice ||
							maxPrice ||
							selectedBrand ||
							selectedCategory) &&
							productCount > 0 && (
								<div className="flex items-center justify-center mb-6 text-2xl md:text-3xl font-bold font-kreonSerif text-prodigy-secondary">
									{`${productCount} ${
										productCount > 1 ? "Matches" : "Match"
									} Found!`}
								</div>
							)}

						{/* Main Grid for Showing Cards */}
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{products?.map((product) => (
								<ProductCard
									key={product._id}
									product={product}
								/>
							))}
						</div>
					</>
				)}
			</div>

			{/* Pagination Logic & Styles */}
			{totalPages > 0 && (
				<div className="flex flex-col gap-4 justify-center items-center font-semibold mt-8 lg:mt-16">
					<p className="text-prodigy-primary">
						Page: {currentPage} of {totalPages}
					</p>
					<div className="flex gap-3">
						{/* Previous Button */}
						<button
							className="px-3 border disabled:text-gray-500 disabled:border-gray-500 disabled:hover:text-gray-500 disabled:hover:bg-transparent disabled:cursor-not-allowed text-prodigy-primary border-prodigy-primary hover:bg-prodigy-primary hover:text-white"
							disabled={currentPage === 1}
							onClick={handlePreviousPage}
						>
							Previous
						</button>

						{/* Numbered Buttons */}
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

						{/* Next Button */}
						<button
							className="px-3 border disabled:text-gray-500 disabled:border-gray-500 disabled:hover:text-gray-500 disabled:hover:bg-transparent disabled:cursor-not-allowed text-prodigy-primary border-prodigy-primary hover:bg-prodigy-primary hover:text-white"
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
						<option value="12">Products Per Page: 12</option>
						<option value="24">Products Per Page: 24</option>
						<option value="36">Products Per Page: 36</option>
						<option value="48">Products Per Page: 48</option>
					</select>
				</div>
			)}
		</section>
	);
};

export default Products;
