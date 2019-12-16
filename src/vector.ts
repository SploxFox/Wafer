interface VectorProps {
    x: number,
    y: number
}

export class Vector {
    constructor(public readonly x: number, public readonly y: number) {
    }

    clone(change?: Partial<VectorProps>) {
        return new Vector(change && change.x != undefined ? change.x : this.x, change && change.y != undefined ? change.y : this.y);
    }
}