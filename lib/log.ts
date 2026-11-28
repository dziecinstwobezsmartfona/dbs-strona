// Error messages and objects from Mongo, fetch and Brevo can quote submitted values
// (a duplicate-key error contains the email address), so they must not be logged as they are.

/** The parts of an error that are safe to log. */
export function errorSummary(error: unknown) {
  const { name, code, cause } = (error ?? {}) as {
    name?: string;
    code?: string | number;
    cause?: { code?: string };
  };
  // fetch keeps the network error code (ENOTFOUND, ECONNREFUSED, ...) on the cause
  return { name, code: code ?? cause?.code };
}

/** Brevo's machine-readable error code. The accompanying `message` can quote the recipient address. */
export async function brevoErrorCode(response: Response): Promise<string> {
  const body = await response.json().catch(() => null);
  return typeof body?.code === 'string' ? body.code : 'unknown';
}
