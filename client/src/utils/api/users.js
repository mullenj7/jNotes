

const API_DOMAIN = process.env.REACT_APP_API;
const ENDPOINT = 'users';


export const getUser = async () => {
    try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");
        const response = await fetch(
            `${API_DOMAIN}/${ENDPOINT}/${userId}`,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            },
        );
        if (response.status === 200) {

            const parsedResponse = await response.json();
            console.log(parsedResponse);
            return parsedResponse.user;
        }

        throw response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// export const updateUser = async (body) => {
//     try {
//         const token = await getIdToken();
//         const userId = await getUserId();

//         const response = await fetch(
//             `${API_DOMAIN}/${ENDPOINT}/${userId}`,
//             {
//                 method: 'PUT',
//                 mode: 'cors',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: token,
//                 },
//                 body: JSON.stringify(body),
//             },
//         );
//         if (response.status === 200) {
//             const parsedResponse = await response.json();
//             return parsedResponse;
//         }
//         throw response;
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// };
