import * as React from "react";
import { observer } from "mobx-react-lite";
import { Text } from "@fluentui/react";
import { mergeStyleSets, memoizeFunction } from "@fluentui/react";

import { CancelButton } from "../CancelButton";

// TODO: Think on how to make this keyboard friendly
export const CycleItem = observer(
    (props: ICycleItemProps): JSX.Element => {
        const classes: ICycleItemClassNames = getClassNames();
        const deleteButton: JSX.Element | undefined =
            props.onDelete != undefined ? <CancelButton title="Delete" onClick={props.onDelete} /> : undefined;

        return (
            <div className={classes.eventContainer}>
                <Text variant="medium">{props.text}</Text>
                {deleteButton}
            </div>
        );
    }
);

// TODO: CycleItem should be generic (accept an event as the generic argument), and onDelete should pass in the cycle and
// that event. That way we just need one function for it.
export interface ICycleItemProps {
    text: string;
    onDelete?: () => void;
}

interface ICycleItemClassNames {
    eventContainer: string;
}

const getClassNames = memoizeFunction(
    (): ICycleItemClassNames =>
        mergeStyleSets({
            eventContainer: {
                marginBottom: 5,
            },
        })
);
