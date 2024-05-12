import React from 'react';
import JoditEditor from "jodit-react";

function EditingEditor(props) {
    return (
        <>
            <JoditEditor
                ref={props.ref}
                value={props.value}
                onChange={props.onChange}/>
        </>
    );
}

export default EditingEditor;