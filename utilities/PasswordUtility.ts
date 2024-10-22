import { APP_SECRET_KEY } from '../configs'
import { AuthPayload } from '../dto/Auth.dto'
import { Request } from 'express'
import { VandorPayload } from '../dto'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const GenerateSalt = async () => {
  return await bcrypt.genSalt()
}

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword
}

export const GenerateSignature = (payload: VandorPayload) => {
  return jwt.sign(payload, APP_SECRET_KEY, { expiresIn: '30m' })
}

export const ValidateSignature = async (req: Request) => {
  const signature = req.get('Authorization')

  if (signature) {
    try {
      const payload = (await jwt.verify(
        signature.split(' ')[1],
        APP_SECRET_KEY
      )) as AuthPayload

      req.user = payload

      return true
    } catch (err) {
      return false
    }
  }

  return false
}
