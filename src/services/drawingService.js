import request from "../utils/request";

export const uploadDrawing = (points, userFilename) => {
    return request(`/upload`, {
        method: "POST",
        body: {"points": points,
                "userFilename": userFilename}
    })
};

export const downloadDrawing = (filename) => {
    return request(`/download/${filename}`, {
        method: "GET",
    })
}

export const getResult = (filename) => {
    return request(`/result/${filename}`, {
        method: "GET",
    })
}

export const getShapeName = (filename) => {
    return request(`/shapeName/${filename}`, {
        method: "GET",
    })
}

export const getAllProjects = () => {
    return request(`/all`, {
        method: "GET",
    })
}

export const deleteProject = (filename) => {
    return request(`/delete/${filename}`, {
        method: "GET",
    })
}