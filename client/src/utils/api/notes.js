

const API_DOMAIN = process.env.REACT_APP_API;
const ENDPOINT = 'notes';


export const getUserNotes = async () => {
    try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");
        const response = await fetch(
            `${API_DOMAIN}/${ENDPOINT}/all/${userId}`,
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
            return parsedResponse.notes;
        }
        throw response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const createNote = async (body) => {
    try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");

        const response = await fetch(
            `${API_DOMAIN}/${ENDPOINT}/${userId}`,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(body),
            },
        );
        if (response.status === 200) {
            const parsedResponse = await response.json();
            return parsedResponse;
        }
        throw response;
    } catch (err) {
        console.error(err);
        throw err;
    }

}

export const updateNote = async (noteId, body) => {
    try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");

        const response = await fetch(
            `${API_DOMAIN}/${ENDPOINT}/${userId}/${noteId}`,
            {
                method: 'PATCH',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(body),
            },
        );
        if (response.status === 200) {
            const parsedResponse = await response.json();
            return parsedResponse;
        }
        throw response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
