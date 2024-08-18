import ripple from "../assets/ripple.svg";
import search from "../assets/search.svg";

const ProfileLoader = (
	<div className="flex flex-col items-center justify-center">
		<img
			className="w-9 md:w-12 h-9 md:h-12"
			src={ripple}
			alt="Loading..."
		/>
	</div>
);

const ButtonLoader = (
	<div className="flex flex-col items-center justify-center">
		<img className="w-6 aspect-square" src={ripple} alt="Loading..." />
	</div>
);

const MainLoader = (
	<div className="flex flex-col items-center justify-center">
		<img src={ripple} alt="Loading..." />
	</div>
);

const SearchLoader = (
	<div className="flex flex-col items-center justify-center">
		<img src={search} alt="Searching..." />
	</div>
);

export { ProfileLoader, ButtonLoader, MainLoader, SearchLoader };
