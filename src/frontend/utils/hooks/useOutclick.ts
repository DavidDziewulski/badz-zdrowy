import { MutableRefObject, useEffect } from "react";

type Props = {
	ref: MutableRefObject<HTMLElement>;
	onClose: () => void;
}

export const useOutClick = ({ ref, onClose }: Props) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent & { target: HTMLElement }) => {
			if (ref && ref.current && !ref.current.contains(event.target)) {
				onClose();
			}
		}

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [ref]);
}