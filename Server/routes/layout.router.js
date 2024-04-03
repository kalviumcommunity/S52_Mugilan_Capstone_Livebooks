import ErrorHandler from "../middlewar/ErrorHandler.js";
import { authorizeRole, isAutheticated } from "../middlewar/auth.js";
import { CatchAsyncError } from "../middlewar/catchAsynErrors.js";
import express from "express";
import cloudinary from "cloudinary";
import layoutModel from "../models/layout.js";
const layoutRoutes = express.Router();

layoutRoutes.post(
  "/create-layout",
  isAutheticated,
  authorizeRole("admin"),
  CatchAsyncError(async (req, res, next) => {
    try {
      const { type } = req.body;
      const isTypeExist = await layoutModel.findOne({ type });
      if (isTypeExist) {
        return next(new ErrorHandler(`${type} is already exist`, 400));
      }
      if (type == "Banner") {
        const { image, title, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });
        const banner = {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        };
        await layoutModel.create(banner);
      }
      if (type === "FAQ") {
        const { faq } = req.body;
        const faqItems = await Promise.all(
          faq.map(async (item) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await layoutModel.create({ type: "FAQ", faq: faqItems });
      }
      if (type === "Categories") {
        const { categories } = req.body;
        const categoriesItem = await Promise.all(
          categories.map(async (item) => {
            return {
              title: item.title,
            };
          })
        );
        await layoutModel.create({
          type: "Categories",
          categories: categoriesItem,
        });
      }
      res.status(201).json({
        success: true,
        message: "Layout Created SuccessFully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// edit layout
layoutRoutes.put(
  "/edit-layout",
  isAutheticated,
  authorizeRole("admin"),
  CatchAsyncError(async (req, res, next) => {
    try {
      const { type } = req.body;

      if (type == "Banner") {
        const bannerData = await layoutModel.findOne({ type: "Banner" });

        const { image, title, subTitle } = req.body;
        if (bannerData) {
          await cloudinary.v2.uploader.destroy(bannerData.image.public_id);
        }

        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });
        const banner = {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        };
        await layoutModel.findByIdAndUpdate(bannerData._id, banner);
      }
      if (type === "FAQ") {
        const { faq } = req.body;
        const faqData = await layoutModel.findOne({ type: "FAQ" });
        const faqItems = await Promise.all(
          faq.map(async (item) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await layoutModel.findByIdAndUpdate(faqData._id, {
          type: "FAQ",
          faq: faqItems,
        });
      }
      if (type === "Categories") {
        const { categories } = req.body;
        const categoriesData = await layoutModel.findOne({
          type: "Categories",
        });

        const categoriesItem = await Promise.all(
          categories.map(async (item) => {
            return {
              title: item.title,
            };
          })
        );
        await layoutModel.findByIdAndUpdate(categoriesData._id,{
          type: "Categories",
          categories: categoriesItem,
        });
      }
      res.status(201).json({
        success: true,
        message: "Layout Update SuccessFully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);


//  getting layout by the type
layoutRoutes.post("/get-layout", CatchAsyncError(async(req, res, next) => {
    try{
        const {type} = req.body
        const layout = await layoutModel.findOne({type})
        res.status(201).json({
            success : true,
            layout
        })
    }catch(error){
        return next(new ErrorHandler(error.message, 400))
    }
}))

export default layoutRoutes;
