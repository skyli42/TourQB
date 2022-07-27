import { Cycle } from "./Cycle";
import { IGameFormat } from "./IGameFormat";
import { PackState } from "./PackState";
import { Player } from "./TeamState";

export type IPendingNewGame = IPendingManualNewGame | IPendingFromSheetsNewGame;

export interface IPendingManualNewGame extends IBasePendingNewGame {
    firstTeamPlayers: Player[];
    secondTeamPlayers: Player[];
    cycles?: Cycle[];
    type: PendingGameType.Manual;
}

export const enum PendingGameType {
    Manual,
    Lifsheets,
    TJSheets,
    UCSDSheets,
}

export interface IPendingFromSheetsNewGame extends IBasePendingNewGame {
    rostersUrl: string | undefined;
    playersFromRosters: Player[] | undefined;
    firstTeamPlayersFromRosters: Player[] | undefined;
    secondTeamPlayersFromRosters: Player[] | undefined;
    type: PendingGameType.Lifsheets | PendingGameType.TJSheets | PendingGameType.UCSDSheets;
}

interface IBasePendingNewGame {
    pack: PackState;
    gameFormat: IGameFormat;
}
