export function generatePreview(apiEndpoint, link) {
  if (!link || !apiEndpoint) {
    return Promise.reject();
  }

  return fetch(apiEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ link }),
  }).then(webResult => webResult.json());
}
