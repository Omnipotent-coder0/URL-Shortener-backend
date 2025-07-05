import { RecordRepository } from "../../RecordModue/Repositories/record.repository";
import { BadRequestError, PageNotFoundError } from "../../shared/utils/apiError";

export class ShortURLService{
    private recordRepository: RecordRepository;
    constructor(){
        this.recordRepository = new RecordRepository();
    }
    async getOriginalURL(shortURL: string){
        const record = await this.recordRepository.getRecordByShortURL(shortURL);
        if(!record) throw new PageNotFoundError('Invalid shortURL');
        return record.originalURL;
    }
}