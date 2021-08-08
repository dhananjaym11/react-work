import React, { useState, useEffect } from "react";
import { storage } from "./firebase/firebase";

export default function App() {
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const listRef = storage.ref(`/images`);
        listRef.listAll()
            .then((res) => {
                res.items.forEach((imageRef) => {
                    displayImage(imageRef);
                });
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    function displayImage(imageRef) {
        imageRef.getDownloadURL().then(function (url) {
            console.log(imageRef, url);
            setImages(images => [...images, { name: imageRef.name, url }]);
        }).catch(function (error) {
            console.log(error);
        });
    }

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    function handleUpload(e) {
        e.preventDefault();
        const ref = storage.ref(`/images/${file.name}`);
        const uploadTask = ref.put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
            displayImage(ref);
        });
    }

    function handleDelete(name) {
        const ref = storage.ref(`/images/${name}`);
        ref.delete().then(() => {
            console.log('File deleted successfully');
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="container">
            <form onSubmit={handleUpload}>
                <h2>Add Image</h2>
                <div>
                    <input type="file" onChange={handleChange} />
                    <button disabled={!file}>upload to firebase</button>
                </div>
            </form>
            <h2>Image List</h2>
            <ul className="image-list">
                {
                    images.map(image => <li key={image.url}>
                        <img src={image.url} alt={image.name} width="200" />
                        <button type="button" onClick={() => handleDelete(image.name)}>Delete</button>
                    </li>)
                }
            </ul>
        </div>
    );
}