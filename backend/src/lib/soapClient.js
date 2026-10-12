const SOAP_API_BASE = process.env.SOAP_API_BASE || "https://api-sandbox.paywithsoap.com";

async function soapRequest(path, { method = "GET", body } = {}) {
  const res = await fetch(`${SOAP_API_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.SOAP_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data?.error || "Soap API error");
    err.status = res.status;
    err.hint = data?.hint;
    throw err;
  }

  return data;
}

module.exports = { soapRequest };
