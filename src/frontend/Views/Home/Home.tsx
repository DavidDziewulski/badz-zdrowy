import { observer } from "mobx-react";
import { store } from "../../store";

export const Home = observer(() => (
	<body className="bg-gray-800 font-sans leading-normal tracking-normal mt-12">
		<header>
			<nav aria-label="menu nav" className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
				<div className="flex flex-wrap items-center">
					<div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
						<a href="#" aria-label="Home">
							<span className="text-xl pl-2"><i className="em em-grinning"></i></span>
						</a>
					</div>

					<div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">
						<span className="relative w-full">
							<input aria-label="search" type="search" id="search" placeholder="Search" className="w-full bg-gray-900 text-white transition border border-transparent focus:outline-none focus:border-gray-400 rounded py-3 px-2 pl-10 appearance-none leading-normal" />
							<div className="absolute search-icon" style={{ top: '1rem', left: 10 }}>
								<svg className="fill-current pointer-events-none text-white w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
									<path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
								</svg>
							</div>
						</span>
					</div>

					<div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
						<ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
							<li className="flex-1 md:flex-none md:mr-3">
								<a className="inline-block py-2 px-4 text-white no-underline" href="#">Active</a>
							</li>
							<li className="flex-1 md:flex-none md:mr-3">
								<a className="inline-block text-gray-400 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#">link</a>
							</li>
							<li className="flex-1 md:flex-none md:mr-3">
								<div className="relative inline-block">
									<button onClick={store.logOut} className="drop-button text-white py-2 px-2">
										<span className="pr-2"><i className="em em-robot_face"></i>
										</span> Hi, User <svg className="h-3 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
											<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg></button>
									<div id="myDropdown" className="dropdownlist absolute bg-gray-800 text-white right-0 mt-3 p-3 overflow-auto z-30 invisible">
										<input type="text" className="drop-search p-2 text-gray-600" placeholder="Search.." id="myInput" />
										<a href="#" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i className="fa fa-user fa-fw"></i> Profile</a>
										<a href="#" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i className="fa fa-cog fa-fw"></i> Settings</a>
										<div className="border border-gray-800"></div>
										<a href="#" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i className="fas fa-sign-out-alt fa-fw"></i> Log Out</a>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>

			</nav>
		</header>
		<div className="calculator">
			<div className='div-container w-3/5 lg:w-3/12'>
				<form className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<div className="mb-4">
						<label
							className="block text-sm font-bold mb-2"
							htmlFor="height"
						>
							Height(cm)
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="height"
							type="number"
							placeholder="e.g., 169"
						/>
					</div>
					<div className="mb-6">
						<label
							className="block text-sm font-bold mb-2"
							htmlFor="weight"
						>
							Weight(kg)
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="weight"
							type="number"
							placeholder="e.g., 68"
						/>
					</div>
					<div className="flex items-center justify-center">
						<button
							className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="button"
						>
							Calculate
						</button>
					</div>

					<div className="mt-5 text-center text-white">
						<p>Your BMI is <span className='strong'>10</span>.</p>
						<p>You are <span className='strong'></span>.</p>
					</div>

				</form>
			</div>
		</div>
	</body>
));