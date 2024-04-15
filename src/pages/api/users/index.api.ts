import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Rotas back-end no Next aceita todos os métodos HTTP.
  // Logo, deve-se tratar o método de antemão.
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { name, username } = req.body

  const user = await prisma.user.create({
    // data: Quais dados quero utilizar para criar o usuário
    data: {
      name,
      username,
    },
    // select: Quais dados retorno do usuário após sua criação
    // select: {},
  })

  return res.status(201).json(user)
}
