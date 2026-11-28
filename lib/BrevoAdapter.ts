import type { EmailAdapter } from 'payload'
import { brevoErrorCode } from './log'

interface BrevoAdapterArgs {
  apiKey: string
  defaultFromAddress: string
  defaultFromName: string
}

type AddressInput = string | { address: string; name?: string }

// Normalize Payload/Nodemailer-style recipients into Brevo's { email, name } shape
const toRecipients = (
  to?: AddressInput | AddressInput[],
): { email: string; name?: string }[] => {
  if (!to) return []
  const list = Array.isArray(to) ? to : [to]
  return list.map((entry) =>
    typeof entry === 'string'
      ? { email: entry }
      : { email: entry.address, name: entry.name },
  )
}

/**
 * Sends transactional email through Brevo's HTTPS API (port 443) instead of SMTP.
 * Use this on hosts that block outbound SMTP ports (e.g. Railway).
 */
export const brevoAdapter = ({
  apiKey,
  defaultFromAddress,
  defaultFromName,
}: BrevoAdapterArgs): EmailAdapter =>
  () => ({
    name: 'brevo-http',
    defaultFromAddress,
    defaultFromName,
    sendEmail: async (message) => {
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          sender: { email: defaultFromAddress, name: defaultFromName },
          to: toRecipients(message.to as AddressInput | AddressInput[]),
          ...(message.cc && {
            cc: toRecipients(message.cc as AddressInput | AddressInput[]),
          }),
          ...(message.bcc && {
            bcc: toRecipients(message.bcc as AddressInput | AddressInput[]),
          }),
          subject: message.subject,
          ...(typeof message.html === 'string' && { htmlContent: message.html }),
          ...(typeof message.text === 'string' && { textContent: message.text }),
        }),
      })

      if (!res.ok) {
        // Payload logs this error, so it must not carry the response body
        throw new Error(`Brevo API error ${res.status}: ${await brevoErrorCode(res)}`)
      }

      return res.json()
    },
  })
  