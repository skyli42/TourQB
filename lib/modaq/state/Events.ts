import { IPlayer } from "./TeamState";
import { IBuzzMarker } from "./IBuzzMarker";

// TODO: Consider folding IBonusAnswerEvent into ITossupAnswerEvent, so we don't need to keep two events in sync. We
// could do a union type where the bonusAnswer only exists if marker.correct is true. We'd probably have to fold the
// IBuzzMarker interface into ITossupAnswerEvent, which should be fine.
export interface ITossupAnswerEvent {
    tossupIndex: number;
    marker: IBuzzMarker;
}

export interface IBonusAnswerEvent {
    bonusIndex: number;
    receivingTeamName: string;

    // Deprecated
    correctParts: IOldCorrectBonusAnswerPart[];

    // This should have all of the parts
    parts: IBonusAnswerPart[];
}

export type IBonusAnswerPart = ICorrectBonusAnswerPart | { teamName: ""; points: 0 };

export interface ICorrectBonusAnswerPart {
    teamName: string;
    points: number;
}

export interface IOldCorrectBonusAnswerPart {
    index: number;
    points: number;
}

export interface ITossupProtestEvent extends IProtestEvent {
    position: number;
}

export interface IBonusProtestEvent extends IProtestEvent {
    partIndex: number;
}

export interface IPlayerJoinsEvent {
    inPlayer: IPlayer;
}

export interface IPlayerLeavesEvent {
    outPlayer: IPlayer;
}

export interface ISubstitutionEvent {
    inPlayer: IPlayer;
    outPlayer: IPlayer;
}

export interface ITimeoutEvent {
    teamName: string;
}

export interface IThrowOutQuestionEvent {
    questionIndex: number;
}

export type PlayerChangeEvent = IPlayerJoinsEvent | IPlayerLeavesEvent | ISubstitutionEvent;

// TODO: Consider adding a "note" or "free" event, that can tell the TD something special about this cycle

interface IProtestEvent {
    questionIndex: number;
    reason: string;
    teamName: string;

    // Undefined in old versions, but should be required now
    givenAnswer: string | undefined;
}
