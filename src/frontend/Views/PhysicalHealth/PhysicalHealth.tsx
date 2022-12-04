import { observer } from "mobx-react";
import { store } from "../../store";
import { hook } from "../../utils";
import { PhysicalHealthVm } from "./PhysicalHealth.vm";


export const PhysicalHealth = observer(() => {
	const vm = hook.useVm(() => new PhysicalHealthVm(), [store.articles.articles]);

	const Content = observer(() => {
		const data = vm.articles?.map(item => (
			<div key={item.id} className="flex flex-col shadow hover:shadow-md w-full bg-white rounded-lg overflow-hidden cursor-pointer">
				<img
					className="object-fill w-full h-48"
					src={`/assets/${item.icon}`}
					alt="Flower and sky"
				/>

				<div className="relative p-4">
					<h3 className="text-base md:text-xl font-medium text-gray-800">
						{item.title}
					</h3>

					<p className="mt-4 text-base md:text-lg text-gray-600">
						{item.description}
					</p>
				</div>
			</div>

		))

		return <>{data} </>
	})

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-6 mx-2">
			<Content />
		</div>
	)
})
