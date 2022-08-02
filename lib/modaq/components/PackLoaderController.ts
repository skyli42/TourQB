import { AppState } from "../state/AppState";
import { IPack } from "../state/IPack";
import { Bonus, BonusPart, PackState, Tossup } from "../state/PackState";
import { UIState } from "../state/UIState";

export function loadPack(appState: AppState, parsedPack: IPack): PackState | undefined {
    const uiState: UIState = appState.uiState;

    if (parsedPack.tossups == undefined) {
        uiState.setPackStatus({
            isError: true,
            status: "Error loading pack: Pack doesn't have a tossups field.",
        });
        return;
    }

    const tossups: Tossup[] = parsedPack.tossups.map(
        (tossup) => new Tossup(tossup.question, tossup.answer, tossup.metadata)
    );
    let bonuses: Bonus[] = [];

    if (parsedPack.bonuses) {
        bonuses = parsedPack.bonuses.map((bonus, index) => {
            if (bonus.answers.length !== bonus.parts.length || bonus.answers.length !== bonus.values.length) {
                const errorMessage = `Error loading pack: Unequal number of parts, answers, and values for bonus ${index}. Answers #: ${bonus.answers.length}, Parts #: ${bonus.parts.length}, Values #: ${bonus.values.length}`;
                uiState.setPackStatus({
                    isError: true,
                    status: errorMessage,
                });
                throw errorMessage;
            }

            const parts: BonusPart[] = [];
            for (let i = 0; i < bonus.answers.length; i++) {
                parts.push({
                    answer: bonus.answers[i],
                    question: bonus.parts[i],
                    value: bonus.values[i],
                    difficultyModifier: bonus.difficultyModifiers ? bonus.difficultyModifiers[i] : undefined,
                });
            }

            return new Bonus(bonus.leadin, parts, bonus.metadata);
        });
    }

    const pack = new PackState();
    pack.setTossups(tossups);
    pack.setBonuses(bonuses);

    const packName: string = uiState.packFilename != undefined ? `"${uiState.packFilename}"` : "";
    uiState.setPackStatus({
        isError: false,
        status: `Pack ${packName} loaded. ${tossups.length} tossup(s), ${bonuses.length} bonus(es).`,
    });

    return pack;
}
