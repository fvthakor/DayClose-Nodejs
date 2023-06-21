import express from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import storeRoute from "./store.route";
import documentTypeRoute from "./documentType.route";

const restRouter = express.Router();

restRouter.use('/auth', authRoute)
restRouter.use('/user', userRoute)
restRouter.use('/store', storeRoute)
restRouter.use('/document-type', documentTypeRoute)
export { restRouter };
