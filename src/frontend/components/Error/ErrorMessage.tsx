type Props = {
	message: string;
}

export const ErrorMessage = ({ message }: Props) => (
	<p className="mt-2 text-pink-600 text-sm">
		{message}
	</p>
);