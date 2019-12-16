import { Vector } from "./vector";

export class Actor {
    power: number = 0;
    moved: boolean = false;
    ticks: number = 0;
    constructor(private _position: Vector) {
        
    }

    render(): string {
        return "@";
    }

    tick() {
        this.moved = false;
        this.ticks++;
    }

    set position(value: Vector) {
        this._position = value;
        this.moved = true;
    }

    get position() {
        return this._position;
    }
}