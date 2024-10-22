import { NextFunction, Request, Response } from 'express'
import { EditVandorInputs, VandorLoginInputs } from '../dto'
import { FindVandor } from './AdminController'
import { GenerateSignature, ValidatePassword } from '../utilities'

export const VandorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = <VandorLoginInputs>req.body

  const existingVandor = await FindVandor('', email)

  if (existingVandor !== null) {
    // Validation and give access
    const validation = await ValidatePassword(
      password,
      existingVandor.password,
      existingVandor.salt
    )

    if (validation) {
      const signature = GenerateSignature({
        _id: existingVandor.id,
        email: existingVandor.email,
        name: existingVandor.name
      })

      return res.json({ bearerAccessToken: `Bearer ${signature}` })
    } else return res.status(404).json({ message: 'Password is not valid' })
  }

  return res.json({ message: 'Login credential not valid' })
}

export const GetVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user
  if (user) {
    const existingVandor = await FindVandor(user._id)

    return res.json(existingVandor)
  } else
    return res.status(404).json({ message: 'Vandor information not found' })
}

export const UpdateVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, foodType, phone, address } = <EditVandorInputs>req.body

  const user = req.user
  if (user) {
    const existingVandor = await FindVandor(user._id)
    if (existingVandor !== null) {
      existingVandor.name = name
      existingVandor.foodType = foodType
      existingVandor.phone = phone
      existingVandor.address = address
      const savedResult = await existingVandor.save()
      return res.json(savedResult)
    }

    return res.json(existingVandor)
  } else
    return res.status(404).json({ message: 'Vandor information not found' })
}

export const UpdateVandorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user
  if (user) {
    const existingVandor = await FindVandor(user._id)

    if (existingVandor !== null) {
      existingVandor.serviceAvailable = !existingVandor.serviceAvailable

      const savedResult = await existingVandor.save()
      return res.json(savedResult)
    }

    return res.json(existingVandor)
  } else
    return res.status(404).json({ message: 'Vandor information not found' })
}

export const AddFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user
  if (user) {
  } else
    return res.status(404).json({ message: 'Vandor information not found' })
}

export const GetFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user
  if (user) {
  } else
    return res.status(404).json({ message: 'Vandor information not found' })
}
