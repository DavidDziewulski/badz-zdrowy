import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { store } from "../../store";
import { hook } from "../../utils";
import { ArticleVm } from "./Article.vm";

export const Article = observer(() => {
	const { id } = useParams();

	const vm = hook.useVm(() => new ArticleVm(id), [store.articles.articles])

	if (!vm.article) {
		return;
	}

	const tableOfContents = vm.article.tableOfContents
		.map(text => <li>{text}</li>)


	const artContent = vm.article.content
		.map(({ title, description }) => (
			<>
				<h2 className="text-2xl text-gray-800 font-semibold mb-4 mt-4">{title}</h2>
				<p>{description}</p>
			</>

		))

	return (
		<div className="article">
			<h1>{vm.article.title}</h1>
			<div className="img" style={{ backgroundImage: `url(/assets/${vm.article.icon})` }} />
			<p>{vm.article.titleContent}</p>
			<ul>{tableOfContents}</ul>
			{artContent}
		</div>
	);
});
