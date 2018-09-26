import request from "../utils/request";

export const changeUser = (username) => {
    return request(`/login/${username}`, {
        method: "GET",
    })
}