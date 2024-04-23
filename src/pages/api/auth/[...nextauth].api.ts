/* No Next.js, o uso do colchetes "[]" indica que o nome da rota é dinâmica,
 * permitindo que qualquer valor seja passado logo após o "/auth".
 * Ex.: http://localhost:3000/api/auth/a82nxiuay2ei
 *
 * As reticências dentro do colchetes significam que podem ser repassados
 * múltiplos parâmetros.
 * Ex.: http://localhost:3000/api/auth/a82nxiuay2ei/1234/abcd/a1b2c3d4
 */

import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
}

export default NextAuth(authOptions)
