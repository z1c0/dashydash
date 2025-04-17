import { BaseAnimation } from './baseanimation';
import { getRandomElement, randomWithVarianceInt, randomWithVariance } from '../../../common/misc'
import { rgbs_r, rgbs_g, rgbs_b } from './fire'
import { Display } from '../core/display';
import { Color, Colors } from '../core/color';

class Particle {
	decay: number = 0;
	life: number = 0;
	startLife: number = 0;
	velocity: { x: number; y: number; } = {x: 0, y: 0};
	position: { x: number; y: number; } = {x: 0, y: 0};

	render(display: Display, colorTable: Color[]) {
		const colorIndex = Math.floor(this.life * (colorTable.length - 1) / this.startLife);
		const color = this.isDead() ? display.getClearColor() : colorTable[colorIndex];
		const x = Math.round(this.position.x);
		const y = Math.round(this.position.y);
		if (display.inBounds(x, y)) {
			display.setPixel(x, y, color);
		}
	}

	isDead() {
		return this.life <= 0.0;
	}
}

export class FireWork extends BaseAnimation {
	rounds: number = 0;
	particles: Array<Particle>;
	SPEED: number;
	LIFE_VARIANCE: number;
	LIFE: number;
	ORIGIN: { x: number; y: number; };
	ORIGIN_VARIANCE: number;
	MAX_PARTICLE_COUNT: number;
	iterations: number;
	colorTable: Color[] = [];

	constructor(dimension: number) {
		super();
		this.iterations = randomWithVarianceInt(10, 3),
		this.SPEED = 0.5;
		this.LIFE = 40;
		this.LIFE_VARIANCE = 5;
		this.ORIGIN = { x : 0, y : 0 };
		this.ORIGIN_VARIANCE = 1;
		this.MAX_PARTICLE_COUNT = 100;
		this.particles = [];
		
		this.reset(dimension);
	}

	override render(display: Display) {
		display.clear(Colors.Black);

		this.updateParticles();
		this.particles.forEach(p => {
			p.render(display, this.colorTable);
		});

		this.rounds++;

		const isGameOver = this.particles.every(p => p.isDead());
		if (isGameOver) {
			this.reset(display.dimension())
			this.iterations--;
		}
	}

	reset(dimension: number) {
		this.rounds = 0;
		this.ORIGIN = { 
			x: randomWithVarianceInt(dimension / 2, dimension),
			y: randomWithVarianceInt(dimension / 2, dimension),
		};
		this.colorTable = getRandomElement([rgbs_r, rgbs_g, rgbs_b]);
		this.particles = [];
	}	

	override isOver(): boolean {
		return this.iterations == 0;
	}

	updateParticles()	{
		this.particles.forEach(p => {
			// calculate the "life" of the particle
			const elapsed = this.rounds;
			p.life = Math.max(0, p.life - p.decay * elapsed);

			if (!p.isDead())
			{
				// update position
				p.position.x = p.position.x + (p.velocity.x * elapsed);
				p.position.y = p.position.y + (p.velocity.y * elapsed);
			}
		});

		// create new particles (up to 10 or MaxParticleCount)
		for (let i = 0; i < 10 && this.particles.length < this.MAX_PARTICLE_COUNT; i++)	{
			this.spawnParticle();
		}
	}	

	spawnParticle() {
		let x = randomWithVariance(this.ORIGIN.x, this.ORIGIN_VARIANCE);
		let y = randomWithVariance(this.ORIGIN.y, this.ORIGIN_VARIANCE);
		let life = randomWithVariance(this.LIFE, this.LIFE_VARIANCE);

		var p = new Particle();
		p.position = { x, y };
		p.startLife = life;
		p.life = life;
		p.decay = 0.5;

		let velocityMultiplier = (Math.random() + 0.25) * this.SPEED;
		let vX = (1.0 - (Math.random() * 2.0)) * velocityMultiplier;
		let vY = (1.0 - (Math.random() * 2.0)) * velocityMultiplier;

		p.velocity = { x: vX, y : vY }

		this.particles.push(p);
	}
}
