import { ActorGrid } from "./actor-grid";
import { Actor } from "./actor";
import { Food } from "./actors/food";
import { Vector } from "./vector";
import { Executer } from "./actors/executer";

export class World {
    private actors: Actor[] = [];
    private ticks: number = 0;
    private actorGrid: ActorGrid;
    constructor(readonly width: number, readonly height: number) {

    }

    addActor(actor: Actor) {
        this.actors.push(actor);
    }

    render() {
        return this.actorGrid.clone();
    }

    getRandomPosition() {
        return new Vector(Math.floor(Math.random() * this.width), Math.floor(Math.random() * this.height));
    }

    tick() {
        this.actors.forEach((a) => a.tick());

        if (this.ticks % 1 === 0) {
            for (let i = 0; i < (this.width * this.height) / 1000; i++) {
                this.addActor(new Food(this.getRandomPosition()));
            }
        }

        if (this.ticks % 1 === 0) {
            for (let i = 0; i < (this.width * this.height) / 20000; i++) {
                const exec = new Executer(this.getRandomPosition());
                this.addActor(exec);
                this.addActor(exec.reproduce());
            }
        }

        this.actors.forEach((a) => {
            if (a instanceof Executer) {
                if (a.wantsToReproduce) {
                    this.addActor(a.reproduce());
                }
            }
            if (a.power < 0) {
                this.removeActor(a);
            }
        });
    
        debugger;
        this.actors.forEach((a) => {
            if (a.position.x >= this.width) {
                a.position = a.position.clone({x: this.width - 1});
            }
            if (a.position.y >= this.height) {
                a.position = a.position.clone({y: this.height - 1});
            }
            if (a.position.x < 0) {
                a.position = a.position.clone({x: 0});
            }
            if (a.position.y < 0) {
                a.position = a.position.clone({y: 0});
            }
        });

        /*for (let i = 0; i < this.actors.length; i++) {
            if (!this.actors[i].moved && this.actors[i].ticks > 1) {
                continue;
            }
            for (let j = i; j < this.actors.length; j++) {
                if (this.actors[i] != this.actors[j] && this.actors[i].position.x == this.actors[j].position.x && this.actors[i].position.y == this.actors[j].position.y) {
                    const dom = this.actors[i].power > this.actors[j].power ? this.actors[i] : this.actors[j];
                    const sub = this.actors[i].power > this.actors[j].power ? this.actors[j] : this.actors[i];
                    const removalAt = this.actors[i].power > this.actors[j].power ? j : i;

                    dom.power += sub.power;

                    this.removeActor(sub);
                    if (removalAt <= i) {
                        i--;
                        break;
                    }
                    if (removalAt <= j) {
                        j--;
                    }
                }
            }
        }*/

        this.actorGrid = ActorGrid.createEmpty(this.width, this.height);

        for (const actor of this.actors) {
            /*if (actor.position.x >= this.width || actor.position.y >= this.height || actor.position.x < 0 || actor.position.y < 0) {

            } else */
            
            if (this.actorGrid.get(actor.position.x, actor.position.y) == undefined) {
                this.actorGrid.set(actor.position.x, actor.position.y, actor);
            } else {
                const otherActor = this.actorGrid.get(actor.position.x, actor.position.y);

                const dom = otherActor.power > actor.power ? otherActor : actor;
                const sub = otherActor.power > actor.power ? actor : otherActor;

                dom.power += sub.power;

                this.removeActor(sub);
                this.actorGrid.set(actor.position.x, actor.position.y, dom);
            }
        }

        this.ticks++;
    }

    removeActor(actor: Actor) {
        this.actors.splice(this.actors.indexOf(actor), 1);
    }
}