import ErrorHandler from "../middlewar/ErrorHandler.js";
import { authorizeRole, isAutheticated } from "../middlewar/auth.js";
import { CatchAsyncError } from "../middlewar/catchAsynErrors.js";
import express from "express";
import { generateLast12MonthsData } from "../utils/analytics.generator.js";
import cheetSheetModel from "../models/CheetSheet.schema.js";
import { createCheetSheet } from "../service/cheetSheet.service.js";
const cheetRoutes = express.Router();

// creating cheetSheet

cheetRoutes.post("/create-cheetSheet", isAutheticated, authorizeRole('admin'), CatchAsyncError(async(req, res, next) => {
    try{
        const data = req.body
        console.log(data)
        if(!data.content){
            return next(new ErrorHandler("CheetSheet is not be empty"))
        }
        createCheetSheet(data,res)
    }catch(error){
        return next(new ErrorHandler(error.message, 400))
    }
}))

// editing the CheetSheet

cheetRoutes.put(
  '/edit-cheetSheet/:id',
  isAutheticated,
  authorizeRole('admin'),
  CatchAsyncError(async (req, res, next) => {
    try {
      const cheetSheetId = req.params.id;
      const updatedData = req.body;

      const cheetSheet = await cheetSheetModel.findById(cheetSheetId);

      if (!cheetSheet) {
        return next(new ErrorHandler('CheetSheet not found', 404));
      }

      const updatedContent = [];

      for (const contentItem of updatedData.content) {
        if (contentItem.type === 'image') {
// creating new image if the old image and new image is not equal
          if (contentItem.image && contentItem.image !== cheetSheet.content.find(item => item.type === 'image')?.image?.url) {
            const imageUploadResponse = await cloudinary.v2.uploader.upload(contentItem.image, {
              folder: 'cheetsheets',
            });

            updatedContent.push({
              type: contentItem.type,
              image: {
                public_id: imageUploadResponse.public_id,
                url: imageUploadResponse.secure_url,
              },
            });
          } else {
// if it is same creaating new image
            updatedContent.push(cheetSheet.content.find(item => item.type === 'image'));
          }
        } else {
          updatedContent.push(contentItem);
        }
      }

      cheetSheet.heading = updatedData.heading || cheetSheet.heading;
      cheetSheet.subHeading = updatedData.subHeading || cheetSheet.subHeading;
      cheetSheet.content = updatedContent;

      const updatedCheetSheet = await cheetSheetModel.findByIdAndUpdate(
        cheetSheetId,
        {$set: cheetSheet},
        {new: true}
      )

      res.status(200).json({
        success: true,
        updatedCheetSheet,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

export default cheetRoutes