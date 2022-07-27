import * as gameFormats from "./src/state/GameFormats";
import { IGameFormat as gameFormat } from "./src/state/IGameFormat";
import { IBonus as bonus, IPack as pack, ITossup as tossup } from "./src/state/IPack";
import { IPlayer as player } from "./src/state/TeamState";
import { ModaqControl as control, IModaqControlProps as controlProps } from "./src/components/ModaqControl";

export const ModaqControl = control;

export type IModaqControlProps = controlProps;

export type IPack = pack;

export type ITossup = tossup;

export type IBonus = bonus;

export type IPlayer = player;

export type IGameFormat = gameFormat;

export const GameFormats = gameFormats;
