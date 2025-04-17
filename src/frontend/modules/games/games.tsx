import { memo, useEffect, useRef } from 'react';
import { GameController } from './core/gameController';

export const Games = memo(() => {
	const refDiv = useRef<HTMLDivElement>(null);
	const refCanvas = useRef<HTMLCanvasElement>(null);
	useEffect(
		() => {
			const div = refDiv.current;
			if (!div) return;
			const w = Math.min(div.clientWidth, div.clientHeight);
			const canvas = refCanvas.current;
			if (!canvas) return;
			canvas.style.width = w.toString();
			canvas.style.height = w.toString();
			canvas.style.marginLeft = ((div.clientWidth - w) / 2) + 'px';
			canvas.style.marginTop = ((div.clientHeight - w) / 2) + 'px';
			canvas.width = w;
			canvas.height = w;
	
			const gameController = new GameController(canvas);
			gameController.nextGame();

			return () => gameController.clear();
		},
		[refDiv.current, refCanvas.current]
	);

	return (
		<div ref={refDiv} id="games">
			<canvas ref={refCanvas} width="0" height="0"/>
		</div>
	);
});
Games.displayName = 'Games';

