import { shuffle, Cursor } from '../../../common/misc';
import { BaseGame } from './baseGame';
import { Snake } from '../snake';
import { TicTacToe } from '../tictactoe';
import { Pong } from '../pong';
import { SpaceInvaders } from '../spaceInvaders';
import { PacMan } from '../pacman';
import { Arkanoid } from '../arkanoid';
import { Ralph } from '../ralph';
import { Lemmings } from '../lemmings';
import { Tetris } from '../tetris';
import { Life } from '../life';
import { BaseAnimation } from '../animations/baseanimation';
import { CompoundAnimation } from '../animations/compoundAnimation';
import { Darken } from '../animations/darken';
import { FireWork } from '../animations/firework';
import { Snow } from '../animations/snow';
import { Thanos } from '../animations/thanos';
import { GameOver } from '../animations/gameover';
import { Fire } from '../animations/fire';
import { LineSwipe } from '../animations/lineswipe';
import { Matrix } from '../animations/matrix';

type CreateAnimationFunction = (_: number) => BaseAnimation;
const animations = new Cursor<CreateAnimationFunction>(shuffle([
	(_) => new GameOver(true),
  (_) => new GameOver(false),
	(dimension) => new Fire(dimension),
	(dimension) => new CompoundAnimation(new LineSwipe(), new Matrix(dimension)),
	() => new Snow(),
	() => new Thanos(),
	(dimension) => new CompoundAnimation(new Darken(), new FireWork(dimension)),
]));

type GameConstructor = new (_: HTMLCanvasElement) => BaseGame;
const games = new Cursor<GameConstructor>(shuffle([
	PacMan,
	TicTacToe,
	Pong,
	Snake,
	SpaceInvaders,
	Arkanoid,
	Ralph,
	Lemmings,
	Tetris,
	Life
]));

export class GameController {
	private animationFrameId: number | null = null;
	private canvas: HTMLCanvasElement;
	
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
	}

	clear() {
		if (this.animationFrameId) {
			window.cancelAnimationFrame(this.animationFrameId);
		}
	}

	nextGame() {
		this.clear();

		const GameConstructor = games.next();
		const game = new GameConstructor(this.canvas);
		const createAnimationFunction = animations.next();
		const gameOverAnimation = createAnimationFunction(game.dim());

		const isTestMode = false;
		const now = performance.now();
		const isGameOver = () => (performance.now() - now) > (isTestMode ? 3_000 : 60_000);
		const getInterval = () => isGameOver() ? (isTestMode ? 50 : 100) : game.getInterval();
		const isAnimationOver = () => isTestMode ? (performance.now() - now) > 6000 : gameOverAnimation.isOver();

		let last = performance.now();
		let self = this;
		let animationFramePending = false; // Prevents multiple animation frames being requested

		function step(now: number) {
			if (animationFramePending) {
				return;  // Prevent re-entry
			}
			animationFramePending = true;

			let switchToNextGame = false;
			if ((now - last) >= getInterval()) {
					last = now;
					if (!isGameOver()) {
						game.simulate();
					} else {
						gameOverAnimation.render(game.display);
						switchToNextGame = isAnimationOver();
					}
					game.render();
				}
				
			if (switchToNextGame) {
				self.nextGame();
			} else {
				animationFramePending = false;
				window.requestAnimationFrame(step);
			}
		}

		this.animationFrameId = window.requestAnimationFrame(step);
	}
}

