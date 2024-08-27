import React from 'react';
import JoditEditor from "jodit-react";

function EditingEditor(props) {
    return (
        <>
            <JoditEditor
                config={{language: localStorage.lang}}
                ref={props.ref}
                value={props.value}
                onBlur={props.onChange}/>
        </>
    );
}

export default EditingEditor;