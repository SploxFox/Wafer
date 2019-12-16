import { Actor } from "./actor";

export class ActorGrid {
    constructor(private characters: Array<Array<Actor>>) {

    }
    static createEmpty(width: number, height: number) {
        const rows = [];
        for(let i = 0; i < height; i++) {
            let row = [];
            for(let j = 0; j < width; j++) {
                row.push(undefined);
            }
            rows.push(row);
        }

        return new ActorGrid(rows);
    }
    get width() {
        return this.getRow(0).length;
    }
    get height() {
        return this.getRows().length;
    }
    get(x: number, y: number) {
        return this.characters[y][x];
    }
    set(x: number, y: number, value: Actor) {
        try {
            this.characters[y][x] = value;
        } catch (e) {
            console.log("Invalid spot for actor!");
        }
    }
    getRow(row: number) {
        return this.characters[row];
    }
    getRows() {
        return this.characters;
    }
    toString() {
        return this.getRows().map((row) => row.map((a) => a == undefined ? " " : a.render()).join(" ")).join("\n");
    }
    clone() {
        const characters = [];

        for (const row of this.characters) {
            characters.push(row.slice());
        }

        return new ActorGrid(characters);
    }
}