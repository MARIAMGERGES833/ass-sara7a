


export const findDocument = async (model, query) => {

    if (!model || !query) return { msg: "invalid arguments", status: "404", success: false }

    const isDocExist = await model.findOne(query)

    if (!isDocExist) return { msg: "document not founded", status: "404", success: false }
    return { msg: "document founded", isDocExist, success: true }
}


export const createDocument = async (model, data) => {

    if (!model || !data) return { msg: "invalid arguments", status: "404", success: false }

    const isDocExist = await model.create(data)
    
    if (!isDocExist) return { msg: "document not founded", status: "404", success: false }
    return { msg: "document founded", isDocExist, success: true }
}