/** En este helper voy a definir un fetch con token y otro sin token */

const baseURL = process.env.REACT_APP_API_URL;

const fetchSinToken = (endpoint, data, method = 'GET') => {
  const url = `${baseURL}${endpoint}`;

  if (method === 'GET') {
    return fetch(url);
  }
  return fetch(url, {
    method,
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export { fetchSinToken };
