import { Actor } from "../actor";
import { Vector } from "../vector";

const legalCharacters = "!#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏ"

const executionInstructionNames = [
    "moveBody",    //0000
    "moveMemory",  //0001
    "say",         //0010
    "ifEqual",     //0011
    "add",         //0100
    "subtract",    //0101
    "multiply",    //0110
    "divide",      //0111
    "reproduce",    //1000
    "setMemory",
]

interface Memory {
    [index: number]: number;
    0: number; //power
    1: number; //letter
}

interface Instruction {
    name: number;
    args: [number, number];
}

enum NextLineExecution {
    WHEN_IN_ORDER, NOW, SKIP
}

export class Executer extends Actor {
    memory: Memory = {
        0: 0,
        1: 63
    };
    instructions: number[][];
    instructionIndex: number = 0;
    instructionsPacketIndex: number = 0;
    wantsToReproduce: boolean = false;
    power = 100;
    nextLineExecution: NextLineExecution;

    constructor(position: Vector) {
        super(position);

        this.instructions = [
            []
        ]
    }
    
    tick () {
        super.tick();
        this.power *= 0.95
        this.power -= 1;
        this.memory = {
            ...this.memory,
            0: this.power
        };

        if (this.instructions[this.instructionsPacketIndex].length != 0 && this.nextLineExecution != NextLineExecution.SKIP) {
            this.nextLineExecution = this.execute(expandInstruction(this.instructions[this.instructionsPacketIndex][this.instructionIndex]));
            if (this.nextLineExecution == NextLineExecution.NOW) {
                this.goToNextInstruction();
                this.execute(expandInstruction(this.instructions[this.instructionsPacketIndex][this.instructionIndex]));
            }
        } else {
            this.nextLineExecution = NextLineExecution.WHEN_IN_ORDER;
        }

        this.goToNextInstruction();
    }

    goToNextInstruction() {
        this.instructionIndex++;
        if (this.instructionIndex >= this.instructions[this.instructionsPacketIndex].length) {
            this.instructionIndex = 0;
            this.instructionsPacketIndex++;

            if (this.instructionsPacketIndex >= this.instructions.length) {
                this.instructionsPacketIndex = 0;
            }
        }
    }

    execute(instruction: Instruction) {
        this.power - 0.05;
        let nextLineExecution = NextLineExecution.WHEN_IN_ORDER;

        switch(executionInstructionNames[instruction.name]) {
            case "moveBody":
                const xDir = instruction.args[0].toString(2).padStart(4,"0")[3] == "0" ? -1 : 1;
                const yDir = instruction.args[0].toString(2).padStart(4,"0")[2] == "0" ? -1 : 1;

                this.position = this.position.clone({
                    x: this.position.x + xDir,
                    y: this.position.y + yDir
                });
                break;

            case "moveMemory":
                this.memory[instruction.args[1]] = this.memory[instruction.args[0]];
                break;

            case "ifEqual":
                if (instruction.args[0] == instruction.args[1]) {
                    nextLineExecution = NextLineExecution.NOW;
                } else {
                    nextLineExecution = NextLineExecution.SKIP;
                }
                break;
            
            case "add":
                this.memory[instruction.args[0]] += this.memory[instruction.args[1]];
                break;
            
            case "subtract":
                this.memory[instruction.args[0]] -= this.memory[instruction.args[1]];
                break;

            case "multiply":
                this.memory[instruction.args[0]] *= this.memory[instruction.args[1]];
                break;

            case "divide":
                this.memory[instruction.args[0]] /= this.memory[instruction.args[1]];
                break;

            case "reproduce":
                this.wantsToReproduce = true;
                break;

            case "setMemory":
                this.memory[instruction.args[0]] = instruction.args[0];
                break;
        }

        return nextLineExecution;
    }

    reproduce() {
        this.power -= 110;

        const child = new Executer(this.position.clone({y: this.position.y + 1}));

        if (Math.random() < 0.1) {
            child.instructions.push([]);
        }

        child.instructions = this.instructions.map((ip) => {
            const nip = ip.map((i) => {
                if (Math.random() < 0.1) {
                    const instr = i.toString(2);
                    const spliceSpot = Math.floor(Math.random() * instr.length);
                    return parseInt(instr.substring(0,spliceSpot) + (instr[spliceSpot] == "1" ? "0" : "1") + instr.substring(spliceSpot + 1, instr.length), 2);
                } else {
                    return i;
                }
            });

            if (Math.random() < 0.1) {
                nip.push(Math.floor(Math.random() * 4096));
            }

            return nip;
        });

        return child;
    }

    render() {
        return legalCharacters[Math.floor(Math.min(this.memory[1], legalCharacters.length))];
    }
}

function collapseInstruction(instruction: Instruction) {
    return parseInt(instruction.name.toString(2) + instruction.args[0].toString(2) + instruction.args[1].toString(2),2);
}

function expandInstruction(collapsedInstruction: number): Instruction {
    const binaryInstruction = collapsedInstruction.toString(2).padStart(12,"0");
    return {
        name: parseInt(binaryInstruction.substr(0,4),2),
        args: [
            parseInt(binaryInstruction.substr(4,4),2),
            parseInt(binaryInstruction.substr(8,4),2),
        ]
    }
}

(window as any).expandInstruction = expandInstruction;
(window as any).collapseInstruction = collapseInstruction;