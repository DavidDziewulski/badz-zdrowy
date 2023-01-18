import { Link } from "react-router-dom";

export const NotFound = () => (
	<div className="notfound">
		<h1>😥 Page Not Found</h1>
		<Link to="/">Back to Home</Link>
	</div>
);
