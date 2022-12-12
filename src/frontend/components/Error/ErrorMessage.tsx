type Props = {
	message: string;
}

export const ErrorMessage = ({ message }: Props) => (
	<p data-role="error">
		{message}
	</p>
);
