import { CatchAsyncError } from "../middlewar/catchAsynErrors.js";
import cheetSheetModel from "../models/CheetSheet.schema.js";
import cloudinary from "cloudinary";
export const createCheetSheet = CatchAsyncError(async (data, res) => {
  const cheetSheetContent = [];

  for (let contetType of data.content) {
    if (contetType.type == "image") {
      const myCloud = cloudinary.v2.uploader.upload(contetType.image, {
        folder: "cheetSheet",
      });

      cheetSheetContent.push({
        type: contetType.type,
        image: {
          public_id: myCloud.public_id,
          url : myCloud.url
        },

      });
    }
    else{
      cheetSheetContent.push(contetType)
    }
  }
  const cheetSheet = await cheetSheetModel.create({
    heading: data.heading,
    subHeading: data.subHeading,
    content : cheetSheetContent
  });

  res.status(201).json({
    success: true,
    cheetSheet,
  });
});
