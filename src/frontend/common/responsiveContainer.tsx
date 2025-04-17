import { useEffect, useRef, useState, ReactNode } from "react";

interface ResponsiveContainerProps {
	children: ReactNode;
	minSize?: number; // Minimum font size
	maxSize?: number; // Maximum font size
	scaleFactor?: number; // How aggressive scaling should be
}

export const ResponsiveContainer = ({ children, minSize = 16, maxSize = 150, scaleFactor = 6 }: ResponsiveContainerProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [fontSize, setFontSize] = useState(minSize);

	useEffect(() => {
		const observer = new ResizeObserver(([entry]) => {
			if (entry?.contentRect) {
				//const d = Math.min(entry.contentRect.width, entry.contentRect.height) * 1.1;
				const d = entry.contentRect.width;
				const newSize = Math.max(minSize, Math.min(d / scaleFactor, maxSize));
				setFontSize(newSize);
			}
		});
		if (containerRef.current) observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, [minSize, maxSize, scaleFactor]);

	return (
		<div ref={containerRef} style={{ fontSize, width: "100%", height: "100%" }}>
			{children}
		</div>
	);
};
