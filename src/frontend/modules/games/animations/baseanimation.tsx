import { Display } from "../core/display";

export abstract class BaseAnimation {
	abstract render(_: Display): void;
	abstract isOver(): boolean;
}