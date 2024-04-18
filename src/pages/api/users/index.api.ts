import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'
import { prisma } from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // NOTE: Rotas back-end no Next aceitam todos os métodos HTTP.
  // Logo, deve-se tratar o método de antemão.
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { name, username } = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    return res.status(400).json({
      message: 'Username already exists.',
    })
  }

  const user = await prisma.user.create({
    // data: Quais dados quero utilizar para criar o usuário
    data: {
      name,
      username,
    },
    // select: Quais dados retorno do usuário após sua criação
    // select: {},
  })

  // NOTE: Cookie permite a existência de informações que podem ser buscadas pelo back e front
  setCookie({ res }, '@ignitecall:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 dias em segundos
    path: '/', // todas as rotas podem acessar esse cookie
  })

  return res.status(201).json(user)
}
