interface ICreateRecordPayload{
    userId: string,
    originalURL: string,
}

interface IUpdateRecordPayload{
    id: string,
    originalURL: string,
}

export {
    ICreateRecordPayload,
    IUpdateRecordPayload,
}