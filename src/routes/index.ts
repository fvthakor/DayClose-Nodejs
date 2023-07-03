import express from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import storeRoute from "./store.route";
import documentTypeRoute from "./documentType.route";
import skillRoute from "./skill.route";
import cityRoute from "./city.route";
import pincodeRoute from "./pincode.route";
import categoryRoute from "./category.route";
import taskStatusRoute from "./taskStatus.route";

const restRouter = express.Router();

restRouter.use('/auth', authRoute)
restRouter.use('/user', userRoute)
restRouter.use('/store', storeRoute)
restRouter.use('/document-type', documentTypeRoute)
restRouter.use('/skill', skillRoute);
restRouter.use('/city', cityRoute);
restRouter.use('/pincode', pincodeRoute);
restRouter.use('/category', categoryRoute);
restRouter.use('/task-status', taskStatusRoute);
export { restRouter };
