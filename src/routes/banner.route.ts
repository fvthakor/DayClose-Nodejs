import express from "express";
import { BannerController } from "../controllers";
import { checkAuth } from "../middleware";
import uploadFile from "../middleware/UploadMiddleware";

const bannerRoute = express.Router();
const cpUpload = uploadFile.fields(
    [{name:'banner', maxCount: 1}]
);
bannerRoute.post('/', [checkAuth(['admin','manager']), cpUpload], BannerController.create);
bannerRoute.get('/', [checkAuth(['manager', 'manager','admin'])], BannerController.getAll);
bannerRoute.get('/all', BannerController.getAllData);
bannerRoute.get('/:id', [checkAuth(['manager', 'manager','admin'])], BannerController.getOne);
bannerRoute.put('/:id', [checkAuth(['admin']), cpUpload], BannerController.update);
bannerRoute.delete('/:id', [checkAuth(['admin'])], BannerController.delete);

export default bannerRoute;