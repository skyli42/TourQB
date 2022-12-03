import React from "react";
import { observer } from "mobx-react-lite";
import { Label, ILabelStyles } from "@fluentui/react";

import * as PackLoaderController from "../components/PackLoaderController";
import { UIState } from "../state/UIState";
import { PackState } from "../state/PackState";
import { AppState } from "../state/AppState";
import { FilePicker } from "./FilePicker";
import { IPack } from "../state/IPack";

export const PackLoader = observer(function PackLoader(props: IPackLoaderProps): JSX.Element | null {
    const onLoadHandler = React.useCallback((ev: ProgressEvent<FileReader>) => onLoad(ev, props), [props]);
    const uploadHandler = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, files: FileList | undefined | null) => {
            onChange(props, files, onLoadHandler, event);
        },
        [props, onLoadHandler]
    );

    const statusStyles: ILabelStyles = {
        root: {
            color: props.appState.uiState.packParseStatus?.isError ?? false ? "rgb(128, 0, 0)" : undefined,
        },
    };

    if (props.appState.uiState.yappServiceUrl == undefined) {
        return null;
    }

    return (
        <div>
            <FilePicker
                accept="application/json,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                buttonText="Load..."
                label="Pack"
                required={true}
                onChange={uploadHandler}
            />
            <Label styles={statusStyles}>{props.appState.uiState.packParseStatus?.status}</Label>
        </div>
    );
});

function onChange(
    props: IPackLoaderProps,
    files: FileList | undefined | null,
    onLoadHandler: (ev: ProgressEvent<FileReader>) => void,
    event: React.ChangeEvent<HTMLInputElement>
): void {
    event.preventDefault();
    props.appState.uiState.clearPackStatus();

    if (files == undefined || files.length === 0) {
        return;
    }

    const fileReader = new FileReader();
    fileReader.onload = onLoadHandler;

    // docx files should be read as a binaray, while json should be read as text
    const file: File = files[0];
    props.appState.uiState.setPackFilename(file.name);

    if (file.type === "application/json" || file.type === "text/plain") {
        fileReader.readAsText(file);
    } else {
        fileReader.readAsArrayBuffer(file);
    }
}

function onLoad(ev: ProgressEvent<FileReader>, props: IPackLoaderProps): void {
    // TODO: This should appear in the UI. Maybe set something in UIState.
    if (ev.target == undefined || ev.target.result == undefined) {
        props.appState.uiState.setPackStatus({ isError: true, status: "Error loading pack: no file uploaded." });
        throw "Error loading pack: no file uploaded.";
    }

    // JSON is returned as a string, docx as a binary
    if (typeof ev.target.result === "string") {
        loadJsonPack(props, ev.target.result);
        return;
    }

    loadDocxPack(props, ev.target.result);
}

async function loadDocxPack(props: IPackLoaderProps, docxBinary: ArrayBuffer): Promise<void> {
    if (props.appState.uiState.yappServiceUrl == undefined) {
        return;
    }

    const requestInfo: RequestInit = {
        method: "POST",
        body: docxBinary,
        mode: "cors",
    };

    props.appState.uiState.setPackStatus({ isError: false, status: "Contacting parsing service..." });

    try {
        const response: Response = await fetch(props.appState.uiState.yappServiceUrl, requestInfo);

        if (!response.ok) {
            let errorMessage = "";
            if (response.status == 400) {
                const errorMessageMap: IParsingServiceErrorMessage = await response.json();

                // TODO: This will now send an array of error messages. We should record all of them, and have them appear
                // line by line. Or, alternatively, fetch the top 3/4 and say how many others there are.
                errorMessage = errorMessageMap.errorMessages.join("\r\n");
            }

            props.appState.uiState.setPackStatus({
                isError: true,
                status: `Error loading pack: Parsing service returned an error (${response.status}). Message: ${errorMessage}`,
            });
            return;
        }

        const responseJson: string = await response.text();
        loadJsonPack(props, responseJson);
    } catch (e) {
        const error: Error = e as Error;
        props.appState.uiState.setPackStatus({
            isError: true,
            status: "Error loading pack: request to parsing service failed. Error: " + error.message,
        });
        console.warn(e);
    }
}

function loadJsonPack(props: IPackLoaderProps, json: string): void {
    const uiState: UIState = props.appState.uiState;

    uiState.setPackStatus({
        isError: false,
        status: "Loading pack...",
    });

    const parsedPack: IPack = JSON.parse(json) as IPack;
    const pack: PackState | undefined = PackLoaderController.loadPack(props.appState, parsedPack);
    if (pack == undefined) {
        return;
    }

    props.onLoad(pack);
}

export interface IPackLoaderProps {
    appState: AppState;
    onLoad(pack: PackState): void;
}

interface IParsingServiceErrorMessage {
    errorMessages: [string];
}
