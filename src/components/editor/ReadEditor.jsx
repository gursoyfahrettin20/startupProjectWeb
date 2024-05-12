import React from 'react';
import JoditEditor from "jodit-react";

function ReadEditor(props) {

    const conf = (
        {
            readonly: true,
            useSearch: false,
            toolbar: false,
            showCharsCounter: false,
            showWordsCounter: false,
            showXPathInStatusbar: false,
            language: "tr",
            direction: "ltr",
            inline: true,
            toolbarInlineForSelection: true,
            showPlaceholder: false
        }
    )

    return (<>
        <JoditEditor
            config={conf}
            ref={props.ref}
            value={props.value}
            disable={props.disable ? props.disable : false}/>
    </>);
}

export default ReadEditor;