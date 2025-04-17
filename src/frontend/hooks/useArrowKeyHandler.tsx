import { useEffect } from "react";

export function useArrowKeyHandler(onLeft: () => void, onRight: () => void) {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") {
				onLeft();
			} else if (event.key === "ArrowRight") {
				onRight();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onLeft, onRight]);
}
