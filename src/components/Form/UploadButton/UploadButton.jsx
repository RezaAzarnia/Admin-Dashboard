import React, { useRef } from 'react'
import { FaUpload } from "react-icons/fa";
import { useFormikContext } from 'formik';
import './UploadButton.scss'
export default function UploadButton({ name, setCover, setError }) {
    const { setFieldValue } = useFormikContext();
    const fileRef = useRef(null)
    const handleChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            if ((file.type).split('/')[0] !== 'image') {
                setError('file should be image')
            } else if ((file.size / 1024).toFixed(2) > 200) {
                setError('File size should be less than 200kb');
            } else {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    setFieldValue(name, fileReader.result)
                    setCover(fileReader.result);
                };
                fileRef.current.value = ''
            }
        }
    }
    return (
        <div className="upload-btn">
            <FaUpload className='up-icon' />
            <label htmlFor="">upload picture</label>
            <input type='file'
                ref={fileRef}
                name={name}
                onChange={handleChange}
            />
        </div>
    )
}
