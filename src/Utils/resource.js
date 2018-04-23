export const MEDALS_ENDPOINT = 'https://s3-us-west-2.amazonaws.com/reuters.medals-widget/medals.json';
export const getMedals = () => get(MEDALS_ENDPOINT);

export const get = (url, options) => (
  fetch(url, Object.assign({ cache: 'no-cache', mode: 'cors' }, options))
    .then(response => response.json())
);
