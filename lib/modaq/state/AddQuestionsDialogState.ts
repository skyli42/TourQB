import { makeAutoObservable } from "mobx";

import { PackState } from "./PackState";

export class AddQuestionDialogState {
    public newPack: PackState;

    constructor() {
        makeAutoObservable(this);

        this.newPack = new PackState();
    }

    public setPack(pack: PackState): void {
        this.newPack = pack;
    }
}
