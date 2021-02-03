import {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";

export default function FileDropzone(props) {
    const [fileCount, setFileCount] = useState(0);
    const [files, setLocalFiles] = useState([]);
    const _files = []
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(file => {
            _files.push(file)
        })
        setLocalFiles(_files)
        setFileCount(_files.length)
        props.setFiles(_files)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
            <input name="files[]" id="file" {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>גררו קבצים לכאן. {fileCount}</p>
            }
        </div>
    )
}