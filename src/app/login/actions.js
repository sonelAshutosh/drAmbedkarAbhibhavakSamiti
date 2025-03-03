'use server'

import bcrypt from 'bcryptjs'
import Users from '@/models/Users'
import dbConnect from '@/lib/dbConnect'
import jwt from 'jsonwebtoken'

export async function login(formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  await dbConnect()

  try {
    const user = await Users.findOne({ email })

    if (user && bcrypt.compareSync(password, user.password)) {
      const accessToken = jwt.sign(
        { email: user.email, id: user._id.toString() },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      )

      return {
        status: 'success',
        user: { email: user.email, id: user._id.toString() },
        accessToken,
      }
    } else {
      return { status: 'error', message: 'Invalid credentials' }
    }
  } catch (error) {
    console.error('Error during login:', error)
    return { status: 'error', message: 'Internal server error' }
  }
}
