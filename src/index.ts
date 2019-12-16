import { ActorGrid } from "./actor-grid";
import { World } from "./world";
import { Actor } from "./actor";
import { Vector } from "./vector";

export function paint(characterGrid: ActorGrid) {
    document.getElementById("character-grid-element").textContent = characterGrid.toString();
}

const world = new World(1000,50);
world.addActor(new Actor(new Vector(10,10)));

(window as any).world = world;

export function tick() {
    requestAnimationFrame(tick);
    world.tick();
    paint(world.render());
}

requestAnimationFrame(tick);