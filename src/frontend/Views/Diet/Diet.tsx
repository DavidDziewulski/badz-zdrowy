import { observer } from "mobx-react";
import { Link, Outlet, useParams, useLinkClickHandler } from "react-router-dom";
import { store } from "../../store";
import { hook } from "../../utils";
import { DietVm } from "./Diet.vm";

export const Diet = observer(() => {
	const { id } = useParams();

	const vm = hook.useVm(() => new DietVm(), [store.articles.articles]);

	const Articles = observer(() => {
		const data = vm.articles?.map(item => (
			<div className="listed-article" onClick={useLinkClickHandler(String(item?.id))} key={item.id}>
				<div className="img" style={{ backgroundImage: `url(/assets/${item.icon})` }} />
				<div className="text">
					<h3>{item.title}</h3>
					<p>{item.description}</p>
				</div>
			</div>
		))

		return <>{data} </>
	})

	return id ? (
		<div className="article">
			<Outlet />
		</div>
	) : (
		<div className="articles">
			<Articles />
		</div>
	);
})
