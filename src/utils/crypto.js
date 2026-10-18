/**
 * Calculates SHA-256 hex string directly in the client browser using Web Crypto API.
 */
export async function calculateSHA256(data) {
  let buffer;

  if (typeof data === 'string') {
    const encoder = new TextEncoder();
    buffer = encoder.encode(data);
  } else {
    buffer = await data.arrayBuffer();
  }

  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hexString = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hexString;
}

/**
 * Truncates a 64-char hash for compact display, e.g. 8f4d...3c2a
 */
export function truncateHash(hash, lead = 8, tail = 8) {
  if (!hash || hash.length <= lead + tail) return hash;
  return `${hash.slice(0, lead)}...${hash.slice(-tail)}`;
}
