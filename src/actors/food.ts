import { Actor } from "../actor";

export class Food extends Actor{
    power = 50;

    render() {
        return "*";
    }

    tick() {
        this.power = Math.max(50, this.power * 0.75);
    }
}