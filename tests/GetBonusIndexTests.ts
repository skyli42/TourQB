import { expect } from "chai";

import { Cycle } from "src/state/Cycle";
import { Player } from "src/state/TeamState";
import { GameState } from "src/state/GameState";
import { PackState, Tossup, Bonus } from "src/state/PackState";

const firstTeamPlayer: Player = new Player("Alice", "A", /* isStarter */ true);
const secondTeamPlayer: Player = new Player("Bob", "B", /* isStarter */ true);
const players: Player[] = [firstTeamPlayer, secondTeamPlayer];

const defaultPack: PackState = new PackState();
defaultPack.setTossups([
    new Tossup("first q", "first a"),
    new Tossup("second q", "second a"),
    new Tossup("third q", "third a"),
    new Tossup("fourth q", "fourth a"),
]);
defaultPack.setBonuses([
    new Bonus("first leadin", [{ question: "first q", answer: "first a", value: 10 }]),
    new Bonus("second leadin", [{ question: "second q", answer: "second a", value: 10 }]),
    new Bonus("third leadin", [{ question: "third q", answer: "third a", value: 10 }]),
    new Bonus("fourth leadin", [{ question: "fourth q", answer: "fourth a", value: 10 }]),
]);

describe("GameStateTests", () => {
    describe("getBonusIndex", () => {
        it("No buzzes, same bonus", () => {
            const game: GameState = createDefaultGame();

            for (let i = 0; i < game.cycles.length; i++) {
                expect(game.getBonusIndex(i)).to.equal(0);
            }
        });
        it("No correct buzzes, same bonus", () => {
            const game: GameState = createDefaultGame();
            const buzzCycleIndex = 1;
            game.cycles[buzzCycleIndex].addWrongBuzz(
                {
                    player: firstTeamPlayer,
                    position: 1,
                    points: -5,
                },
                0,
                game.gameFormat
            );

            for (let i = 0; i < game.cycles.length; i++) {
                expect(game.getBonusIndex(i)).to.equal(0);
            }
        });
        it("Correct buzz changes next cycle's bonus", () => {
            const game: GameState = createDefaultGame();

            const buzzCycleIndex = 1;
            game.cycles[buzzCycleIndex].addCorrectBuzz(
                {
                    player: firstTeamPlayer,
                    position: 1,
                    points: 10,
                },
                0,
                game.gameFormat,
                0,
                defaultPack.bonuses[0].parts.length
            );

            expect(game.getBonusIndex(0)).to.equal(0);
            expect(game.getBonusIndex(buzzCycleIndex)).to.equal(0);
            expect(game.getBonusIndex(2)).to.equal(1);
        });
        it("Thrown out bonus changes this cycle's bonus", () => {
            const game: GameState = createDefaultGame();

            const buzzCycleIndex = 1;
            game.cycles[buzzCycleIndex].addCorrectBuzz(
                {
                    player: firstTeamPlayer,
                    position: 1,
                    points: 10,
                },
                0,
                game.gameFormat,
                0,
                defaultPack.bonuses[0].parts.length
            );
            game.cycles[buzzCycleIndex].addThrownOutBonus(0);

            expect(game.getBonusIndex(0)).to.equal(0);
            expect(game.getBonusIndex(buzzCycleIndex)).to.equal(1);
            expect(game.getBonusIndex(2)).to.equal(2);
        });
        it("Thrown out bonuses changes this cycle's bonus", () => {
            const game: GameState = createDefaultGame();

            const buzzCycleIndex = 1;
            const cycle: Cycle = game.cycles[buzzCycleIndex];
            cycle.addCorrectBuzz(
                {
                    player: firstTeamPlayer,
                    position: 1,
                    points: 10,
                },
                0,
                game.gameFormat,
                0,
                defaultPack.bonuses[0].parts.length
            );
            cycle.addThrownOutBonus(0);
            cycle.addThrownOutBonus(1);

            expect(game.getBonusIndex(0)).to.equal(0);
            expect(game.getBonusIndex(buzzCycleIndex)).to.equal(2);
            expect(game.getBonusIndex(2)).to.equal(3);
        });
        it("Correct buzzes changes multiple cycle's bonus", () => {
            const game: GameState = createDefaultGame();

            const buzzCycleIndex = 0;
            const secondBuzzCycleIndex = 1;
            game.cycles[buzzCycleIndex].addCorrectBuzz(
                {
                    player: firstTeamPlayer,
                    position: 1,
                    points: 10,
                },
                0,
                game.gameFormat,
                0,
                defaultPack.bonuses[0].parts.length
            );

            game.cycles[secondBuzzCycleIndex].addCorrectBuzz(
                {
                    player: secondTeamPlayer,
                    position: 2,
                    points: 10,
                },
                1,
                game.gameFormat,
                1,
                defaultPack.bonuses[1].parts.length
            );

            expect(game.getBonusIndex(buzzCycleIndex)).to.equal(0);
            expect(game.getBonusIndex(secondBuzzCycleIndex)).to.equal(1);
            expect(game.getBonusIndex(secondBuzzCycleIndex + 1)).to.equal(2);
        });
        it("Not enough bonuses", () => {
            const game: GameState = createDefaultGame();

            const buzzCycleIndex = 0;
            const buzzCycle: Cycle = game.cycles[buzzCycleIndex];
            buzzCycle.addCorrectBuzz(
                {
                    player: firstTeamPlayer,
                    position: 1,
                    points: 10,
                },
                0,
                game.gameFormat,
                0,
                defaultPack.bonuses[0].parts.length
            );

            // Throw out all but the last two bonuses. The next cycle will use the last bonus, then we can verify that
            // throwing it out returns -1 for getBonusIndex
            for (let i = 0; i < game.pack.bonuses.length - 2; i++) {
                buzzCycle.addThrownOutBonus(i);
            }

            const nextBuzzCycleIndex = 1;
            const nextBuzzCycle: Cycle = game.cycles[nextBuzzCycleIndex];
            nextBuzzCycle.addCorrectBuzz(
                {
                    player: firstTeamPlayer,
                    position: 2,
                    points: 10,
                },
                1,
                game.gameFormat,
                game.pack.bonuses.length - 1,
                defaultPack.bonuses[game.pack.bonuses.length - 1].parts.length
            );

            expect(game.getBonusIndex(buzzCycleIndex)).to.equal(game.pack.bonuses.length - 2);
            expect(game.getBonusIndex(nextBuzzCycleIndex)).to.equal(game.pack.bonuses.length - 1);

            nextBuzzCycle.addThrownOutBonus(game.pack.bonuses.length - 1);
            expect(game.getBonusIndex(nextBuzzCycleIndex)).to.equal(-1);
            expect(game.getBonusIndex(nextBuzzCycleIndex + 1)).to.equal(-1);
        });
    });
});

function createDefaultGame(): GameState {
    const game: GameState = new GameState();
    game.addPlayers(players);
    game.loadPack(defaultPack);
    return game;
}
