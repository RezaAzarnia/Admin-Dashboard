import React from 'react'
import ReactQuill from 'react-quill'
import { Field } from 'formik';
import 'react-quill/dist/quill.snow.css';

export default function TextEditor({ name }) {
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'color': [] }],          // dropdown with defaults from theme
        ['blockquote', 'code-block'],
        [{ 'header': [1, 2, 3, false] }],
        [{ 'header': 1 }],               // custom button values
        [{ 'align': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        ['link', 'image'],
        ['clean']                                         // remove formatting button
    ];
    const modules = {
        toolbar: toolbarOptions,
    }
    return (
        <Field name={name}>
            {({ field, form }) => {
                const handleQuillChange = (content) => {
                    const isEmptyParagraph = content === '<p><br></p>';
                    form.setFieldValue(name, isEmptyParagraph ? '' : content);
                };
                return (
                    <ReactQuill
                        value={field.value}
                        onChange={handleQuillChange}
                        modules={modules}
                    />
                );
            }}
        </Field>
    )
}
