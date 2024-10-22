import {
  AddFood,
  GetFood,
  GetVandorProfile,
  UpdateVandorProfile,
  UpdateVandorService,
  VandorLogin
} from '../controllers'
import express, { NextFunction, Request, Response } from 'express'

import { Authenticate } from '../middlewares'

// import multer from "multer";

// const imageStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + "_" + file.originalname);
//   },
// });

// const images = multer({ storage: imageStorage }).array("images", 10);
// console.log(images, "route image");

const router = express.Router()

router.post('/login', VandorLogin)

router.use(Authenticate)
router.get('/profile', GetVandorProfile)
router.patch('/profile', UpdateVandorProfile)
// router.patch("/coverimage", images, UpdateVandorCoverImage);
router.patch('/service', UpdateVandorService)

router.post('/food', AddFood)
router.get('/foods', GetFood)

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: 'Hello from vandor ' })
})

export { router as VandorRoute }
