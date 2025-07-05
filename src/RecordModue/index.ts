import { Router } from "express";
import { responseProcessor } from "../shared/utils/responseProcessor";
import { validate } from "../shared/validate";
import { RecordController } from "./Controllers/record.controller";
import { checkRecordOwnership } from "../shared/middlewares/record.middlewares";
import { patchRecord, postRecord } from "./validators/record.validator";

export class RecordModule {
    public router: Router;
    private controller: RecordController;
    constructor(){
        this.router = Router();
        this.controller = new RecordController();
        this.initializeRoutes();
    }
    private initializeRoutes = async()=>{
        this.router.route('/')
            .get(responseProcessor(this.controller.getUserRecords))
            .post(validate(postRecord), responseProcessor(this.controller.createRecord));
        this.router.route('/:id')
            .get(checkRecordOwnership, responseProcessor(this.controller.getRecordById))
            .patch(checkRecordOwnership, validate(patchRecord), responseProcessor(this.controller.updateRecord))
            .delete(checkRecordOwnership, responseProcessor(this.controller.deleteRocordById));

    }
}