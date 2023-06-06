import { NextApiRequest, NextApiResponse } from 'next'
import keys from './Keys.json'
import * as jose from 'node-jose'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const keyStore = await jose.JWK.asKeyStore(JSON.stringify(keys))

  const [key] = keyStore.all({ use: 'sig' })
  if (!key) throw new Error('No signing key found')

  const opt = { compact: true, jwk: key, fields: { typ: 'jwt' } }

  const payload = JSON.stringify({
    sub: 'Custom JWT for Web3Auth Custom Auth',
    email: email, // -> must be unique to each user
    iss: 'https://my-own-auth-server', // -> to be used in Custom Authentication as JWT Field
    aud: 'my-audience-app', // -> to be used in Custom Authentication as JWT Field
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  })

  const token = await jose.JWS.createSign(opt, key).update(payload).final()

  return res.status(200).json({ token: String(token) })
}
