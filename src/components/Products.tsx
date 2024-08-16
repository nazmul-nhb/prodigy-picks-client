import React, { useRef, useState } from "react";
import useGetProducts from "../hooks/useGetProducts";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";

const Products: React.FC = () => {
	const [searchText, setSearchText] = useState<string>("");
	const [selectedBrand, setSelectedBrand] = useState<string>("");
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [minPrice, setMinPrice] = useState<number | "">("");
	const [maxPrice, setMaxPrice] = useState<number | "">("");
	const [itemsPerPage, setItemsPerPage] = useState(2);
	const [currentPage, setCurrentPage] = useState(1);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const axiosPublic = useAxiosPublic();

	// Get products data using hook
	const { productCount, totalPages, products, isProductsLoading } =
		useGetProducts(
			[
				"products",
				currentPage,
				itemsPerPage,
				searchText,
				selectedBrand,
				selectedCategory,
				minPrice,
				maxPrice,
			],
			{
				page: currentPage,
				size: itemsPerPage,
				search: searchText,
				brand: selectedBrand,
				category: selectedCategory,
				minPrice,
				maxPrice,
			}
		);

	const pages = [...Array(totalPages).keys()];

	const { data: categories = [] } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const res = await axiosPublic("/products/categories");
			return res.data?.categories;
		},
	});

	const { data: brands = [] } = useQuery({
		queryKey: ["brands"],
		queryFn: async () => {
			const res = await axiosPublic("/products/brands");
			return res.data?.brands;
		},
	});

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

	// Show Toast with Search Result Count
	// useEffect(() => {
	// 	if ((searchText || minPrice || maxPrice) && productCount > 0) {
	// 		toast.success(
	// 			`${productCount} ${
	// 				productCount > 1 ? "Matches" : "Match"
	// 			} Found!`
	// 		);
	// 	}
	// }, [maxPrice, minPrice, productCount, products, searchText]);

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

	// useEffect(() => {
	//     if (totalPages === 0) {
	//         setCurrentPage(0);
	//     }
	// }, [totalPages]);

	return (
		<section>
			{/* <SectionHeader heading={`Total ${productCount} Products`} /> */}
            {/* {`Total ${productCount} Products`} */}
            {/* Filter & Search Options */}
			<div className="grid md:grid-cols-2 lg:grid-cols-4 mx-auto gap-4 mb-8 text-sm">
				{/* Filter by Brand */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-2 pl-2 bg-transparent rounded-lg border border-prodigy-secondary">
						<label htmlFor="brand">Brand</label>
						<select
							id="brand"
							name="brand"
							value={selectedBrand || ""}
							onChange={(e) => {
								setSelectedBrand(e.target.value);
								setCurrentPage(1);
							}}
							className="px-2 rounded-r-lg py-1 bg-transparent border border-prodigy-secondary focus:outline-0"
						>
							<option value="">All Brands</option>
							{brands.map((brand: string) => (
								<option key={brand} value={brand}>
									{brand}
								</option>
							))}
						</select>
					</div>
				</div>
				{/* Filter by Category */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-2 pl-2 bg-transparent rounded-lg border border-prodigy-secondary">
						<label htmlFor="category">Category</label>
						<select
							id="category"
							name="category"
							value={selectedCategory || ""}
							onChange={(e) => {
								setSelectedCategory(e.target.value);
								setCurrentPage(1);
							}}
							className="px-2 rounded-r-lg py-1 bg-transparent border border-prodigy-secondary focus:outline-0"
						>
							<option value="">All Categories</option>
							{categories.map((category: string) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					</div>
				</div>
				{/* Price Range */}
				<div className="flex flex-col gap-3">
					<label htmlFor="priceRange">Price Range</label>
					<div className="flex gap-2">
						<input
							type="number"
							value={minPrice || ""}
							onChange={(e) =>
								setMinPrice(Number(e.target.value) || "")
							}
							placeholder="Min Price"
							className="border px-2 py-1 rounded-lg border-prodigy-secondary focus:outline-0"
						/>
						<input
							type="number"
							value={maxPrice || ""}
							onChange={(e) =>
								setMaxPrice(Number(e.target.value) || "")
							}
							placeholder="Max Price"
							className="border px-2 py-1 rounded-lg border-prodigy-secondary focus:outline-0"
						/>
					</div>
				</div>
				{/* Search Products */}
				<form
					onSubmit={handleSearchProduct}
					className="flex gap-2 items-center justify-start text-prodigy-secondary"
				>
					<div className="flex gap-2 w-full items-center relative pl-2 bg-transparent rounded-lg border border-prodigy-secondary">
						<label className="font-medium" htmlFor="search">
							<FaSearch />
						</label>
						<input
							ref={inputRef}
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							className="px-2 rounded-r-lg py-[9px] bg-transparent w-full border-l border-prodigy-secondary focus:outline-0"
							placeholder="Search Products"
							type="text"
							name="search"
							id="search"
						/>
						<div className="absolute right-0 flex gap-2">
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
				{isProductsLoading ? (
					"Loading..."
				) : products.length === 0 ? (
					"No products found."
				) : (
					<>
						{(searchText.trim() ||
							minPrice ||
							maxPrice ||
							selectedBrand ||
							selectedCategory) &&
							productCount > 0 && (
								<div className="flex items-center justify-center">
									{`${productCount} ${
										productCount > 1 ? "Matches" : "Match"
									} Found!`}
								</div>
							)}
						<div className="grid lg:grid-cols-2 gap-6">
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
			{totalPages > 0 && (
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
			)}
		</section>
	);
};

export default Products;
