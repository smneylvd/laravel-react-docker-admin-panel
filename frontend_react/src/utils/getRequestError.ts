export const getRequestError = (e: any): string => {
    try {
        if (e.response) {
            if (e.response.status == 401) {
                localStorage.clear();
            }
            if (e.response.data) {
                let errorMsg = "";
                if (e.response.data.message) {
                    console.log(e.response.data.message);
                    errorMsg += e.response.data.message + ': ';
                }
                if (e.response.data.content) {
                    console.log(e.response.data.content);
                    errorMsg += e.response.data.content;
                }
                if (errorMsg) {
                    return errorMsg;
                }
            }
        } else {
            return "Network Error";
        }
    } catch (err) {
        console.log("ERROR PARSING RESPONSE: ", err);
    }
    return "Network Error";

};