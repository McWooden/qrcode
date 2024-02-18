// import axios from "axios";
// import { useState } from "react";
// import { REST_API } from "../../utils";

// export default function Admin() {
//     function rand(min, max) {
//         return Math.floor(Math.random() * (max - min + 1)) + min;
//     }

//     const apiUrl = "https://4bb9-125-160-98-84.ngrok-free.app";
//     const pathReq = "/sendMessage";
//     const userIP = "114.79.46." + rand(11, 299);

//     const sendData = {
//         nama: `Rizqi Lasheva Purnama Putra`,
//         kelas: "XI-F1",
//         noAbs: "31",
//         nomor: {
//             user: "6289683094141",
//             ortu: "6289683094141",
//         },
//         ip: userIP,
//     };

//     async function sendMessage() {
//         const url = apiUrl+pathReq
//         console.log(url)
//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'ngrok-skip-browser-warning': 'true' // Header ngrok-skip-browser-warning
//             },
//             body: JSON.stringify(sendData)
//         })
//         .then(response => response.json())
//         .then(res => console.log(res.data))
//         .catch(error => console.error('Error:', error));
//     }


//     return (
//         <div className="flex flex-col">
//             <div className="btn btn-primary" onClick={sendMessage}>Halo</div>
//         </div>
//     );
// }

// export default function Admin() {
//     const [succeedList, setSucceedList] = useState([])
//     const [errorList, setErrorList] = useState([])

//     async function sendMessage() {
//         await axios
//             .post(REST_API + '/sendMessage', {data: }, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "ngrok-skip-browser-warning": "true", // Header ngrok-skip-browser-warning
//                 },
//             })
//             .then((response) => console.log(response.data))
//             .catch((error) => console.error("Error:", error));
//     }

//     return (
//         <div className="flex flex-col gap-2">
//             <div className="btn btn-primary" onClick={sendMessage}>Halo</div>
//         </div>
//     );
// }
export default function Admin() {
    // const [succeedList, setSucceedList] = useState([])
    // const [errorList, setErrorList] = useState([])

    // async function sendMessage() {
    //     await axios
    //         .post(REST_API + '/sendMessage', {data: }, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "ngrok-skip-browser-warning": "true", // Header ngrok-skip-browser-warning
    //             },
    //         })
    //         .then((response) => console.log(response.data))
    //         .catch((error) => console.error("Error:", error));
    // }

    return (
        <div className="flex flex-col gap-2">
            {/* <div className="btn btn-primary" onClick={sendMessage}>Halo</div> */}
            <div className="btn btn-primary">Halo</div>
        </div>
    );
}
