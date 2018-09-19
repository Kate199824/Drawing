import request from "../utils/request";

export const uploadDrawing = ( points ) => {
    return request(`/upload`, {
        method: "POST",
        body: {points}
    })
};