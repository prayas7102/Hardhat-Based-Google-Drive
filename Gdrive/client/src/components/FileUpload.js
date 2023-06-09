import { useState } from "react";
import axios from "axios";
import { create } from 'ipfs-http-client'
import "./FileUpload.css";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [cidData, setCid] = useState([]);
  const [fileName, setFileName] = useState("No image selected");

//  import React, { useState, useEffect } from 'react';
// import { create } from 'ipfs-http-client';

// const ipfs = create({ url: 'https://ipfs.infura.io' });

// function App() {
//   const [imageURL, setImageURL] = useState('');

//   useEffect(() => {
//     async function getImage() {
//       try {
//         const cid = 'your_cid_here';
//         const image = await ipfs.get(cid);
//         const url = URL.createObjectURL(new Blob([image.content]));
//         setImageURL(url);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getImage();
//   }, []);

//   return (
//     <div>
//       {imageURL ? (
//         <img src={imageURL} alt="IPFS Image" />
//       ) : (
//         <p>Loading Image...</p>
//       )}
//     </div>
//   );
// }

export default App;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ipfs =await create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    const formData = new FormData();
    formData.append("file", file);
    const cid = await ipfs.addAll('formData');
    cidData.push(cid)
    console.log(`Image uploaded to IPFS with cid: ${cid}`, cidData);

    // if (file) {
    //   try {
    //     const formData = new FormData();
    //     formData.append("file", file);
    //     console.log(file)
    //     const resFile = await axios({
    //       method: "post",
    //       url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    //       data: formData,
    //       headers: {
    //         pinata_api_key: `84cf60ff21ad9981a46a`,
    //         pinata_secret_api_key: `47ae073803cf772429231840a3ad1ccc103ac0eddf89c1ecb69c14831735e2b9`,
    //         "Content-Type": "multipart/form-data",
    //       },
    //     });
    //     const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
    //     const signer = contract.connect(provider.getSigner());
    //     signer.add(account, ImgHash);
    //   } catch (e) {
    //     alert(e,"Unable to upload image to Pinata");
    //   }
    // }

    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};
export default FileUpload;

// import { useState } from "react";
// import axios from "axios";
// import "./FileUpload.css";
// function FileUpload({ contract, provider, account }) {
//   // const [urlArr, setUrlArr] = useState([]);
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No image selected");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (file) {
//         try {
//           const formData = new FormData();
//           formData.append("file", file);

//           const resFile = await axios({
//             method: "post",
//             url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//             data: formData,
//             headers: {
//               pinata_api_key: `95f328a012f1634eab8b`,
//               pinata_secret_api_key: `8ea64e6b39c91631c66128a7c0e0dde35a6fbdf797a8393cc5ba8bf8d58e9b54`,
//               "Content-Type": "multipart/form-data",
//             },
//           });

//           const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
//           const signer = contract.connect(provider.getSigner());
//           signer.add(account, ImgHash);

//           //setUrlArr((prev) => [...prev, ImgHash]);

//           //Take a look at your Pinata Pinned section, you will see a new file added to you list.
//         } catch (error) {
//           alert("Error sending File to IPFS");
//           console.log(error);
//         }
//       }

//       alert("Successfully Uploaded");
//       setFileName("No image selected");
//       setFile(null); //to again disable the upload button after upload
//     } catch (error) {
//       console.log(error.message); //this mostly occurse when net is not working
//     }
//   };
//   const retrieveFile = (e) => {
//     const data = e.target.files[0];
//     console.log(data);

//     const reader = new window.FileReader();

//     reader.readAsArrayBuffer(data);
//     reader.onloadend = () => {
//       setFile(e.target.files[0]);
//     };
//     setFileName(e.target.files[0].name);
//     e.preventDefault();
//   };
//   return (
//     <div className="top">
//       <form className="form" onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="choose">
//           {/*turn around for avoding choose file */}
//           Choose Image
//         </label>
//         <input
//           disabled={!account} //disabling button when metamask account is not connected
//           type="file"
//           id="file-upload"
//           name="data"
//           onChange={retrieveFile}
//         />
//         <span className="textArea">Image: {fileName}</span>
//         {/* choose file */}
//         <button type="submit" disabled={!file} className="upload">
//           Upload file
//         </button>
//       </form>
//     </div>
//   );
// }

// export default FileUpload;
