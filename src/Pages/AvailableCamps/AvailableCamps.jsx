import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import CampCard from "../../Components/Shared/CampCard";
import { useState } from "react";

const AvailableCamps = () => {
	const axiosPublic = useAxiosPublic();

	const { data: allCampsData = [], isPending: loading, refetch } = useQuery({
		queryKey: ["camps"],
		queryFn: async () => {
			const res = await axiosPublic.get("/camps");
			return res.data;
		},
	});

	// const [searchItem, setSearchItem] = useState("");
	// const [filteredCamps, setFilteredCamps] = useState(allCampsData);
	const [twoColumn, setTwoColumn] = useState(false)
	console.log(twoColumn)



	const [search, setSearch] = useState('')

	const { data: searchCamp = [], isLoading: searchCampLoading, refetch: reload } = useQuery({
		queryFn: () => getData(),
		queryKey: ['search', search],
		// enabled: false
	})
	const getData = async () => {
		// const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/search-job?search=${search}`)
		const { data } = await axiosPublic.get(`/search-camp?search=${search}`)
		return data
	}

	const handleSearch = async (e) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget)
		const search = form.get('search')
		setSearch(search)
		await reload();
	};














	// const handleInputChange = (e) => {
	// 	const searchTerm = e.target.value;
	// 	setSearchItem(searchTerm);

	// 	const filteredItems = allCampsData.filter((camp) =>
	// 		camp.name.toLowerCase().includes(searchTerm.toLowerCase())
	// 	);
	// 	setFilteredCamps(filteredItems);
	// 	refetch();
	// };

	// const [sortCriteria, setSortCriteria] = useState('');

	// if (sortCriteria) {
	// 	if (sortCriteria === 'mostRegistered') {
	// 		const sortedCamps = allCampsData.sort((a, b) => b.participantCount - a.participantCount);
	// 		setFilteredCamps(sortedCamps)
	// 	}
	// 	// else if (sortCriteria === 'campFees') {
	// 	// 	filteredCamps = allCampsData.sort((a, b) => parseFloat(a.fees.replace('$', '')) - parseFloat(b.fees.replace('$', '')));
	// 	// } else if (sortCriteria === 'alphabeticalOrder') {
	// 	// 	filteredCamps = allCampsData.sort((a, b) => a.name.localeCompare(b.name));
	// 	// }
	// }


	return (
		<>

			<main>
				{/* <PageHeader title="Available Camps" /> */}
				<div className="lg:flex md:flex items-center  justify-center p-5">
					<form onSubmit={handleSearch}>
						<input
							type="text"
							placeholder="Search..."
							className=" border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
							name="search"

						/>
						<button type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
						// onClick={handleSearch}
						>
							Search
						</button>
					</form>

					<div className="lg:m-4 md:m-4 my-2">
						<button className="btn" onClick={() => setTwoColumn(!twoColumn)}>
							Toggle Layout
						</button>
					</div>
				</div>




				{/* 
				<div className="w-4/6 md:w-1/2 lg:w-1/3 mx-auto flex gap-6">


					<label className="input input-bordered border-none flex items-center gap-2">
						<input type="text" className="grow" value={searchItem}
							onChange={handleInputChange} placeholder="Search" />
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
					</label>

					<div className="dropdown dropdown-hover">
						<select onChange={(e) => setSortCriteria(e.target.value)}>
							<option value="">Sort By</option>
							<option value="mostRegistered">Most Registered</option>
							<option value="campFees">Camp Fees</option>
							<option value="alphabeticalOrder">Alphabetical Order</option>
						</select>
					</div>

					<button className="btn" onClick={() => setTwoColumn(!twoColumn)}>
						Toggle Layout
					</button>
				</div>
				{loading && <span className="loading loading-spinner text-info w-40"></span>} */}

				{/* <div className="py-10">
					{
						searchItem.length > 0 ? (
							filteredCamps.length > 0 ? (
								<div className={`grid grid-cols-1 md:grid-cols-2 ${twoColumn ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} `}>
									{filteredCamps.map((camp) => (
										<CampCard key={camp._id} camp={camp} />
									))}
								</div>
							) : (
								<div className="py-10">
									<h2 className="text-5xl text-[#054279] font-semibold text-center mb-3">
										Sorry!
									</h2>
									<p className="text-3xl text-[#054279] font-semibold text-center">
										Your Search Not Found!
									</p>
								</div>
							)
						) : (
							<div className={`grid grid-cols-1 md:grid-cols-2 ${twoColumn ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}  gap-6`}>
								{allCampsData.map((camp) => (
									<CampCard key={camp._id} camp={camp} />
								))}
							</div>
						)}
				</div> */}


				{/* My  */}

				<div className="px-4">
					{
						search.length > 0 ?
							<>
								{
									searchCampLoading ? <span className="loading loading-spinner text-info"></span>
										:
										<div className={`grid grid-cols-1 md:grid-cols-2 ${twoColumn ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}  gap-6`}>
											{searchCamp.map((camp) => (
												<CampCard key={camp._id} camp={camp} />
											))}
										</div>

								}
							</>
							:
							<>
								<div className={`grid grid-cols-1 md:grid-cols-2 ${twoColumn ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}  gap-6  `}>
									{allCampsData.map((camp) => (
										<CampCard key={camp._id} camp={camp} />
									))}
								</div>
							</>

					}
				</div>
			</main>
		</>
	);
};

export default AvailableCamps;
