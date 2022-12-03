import React from 'react';

function Warning(props: IWarningProps) {
    return (
        <div className="warning">{props.text}</div>
    );
}

export interface IWarningProps {
    text: string
}
export default Warning;
