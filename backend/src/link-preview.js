const request = require('request');

function requestSource(link) {
  console.log('requesting source for', link);
  return new Promise((resolve, reject) => {
    request(link, (err, _, body) => {
      if (err) {
        return reject(err);
      }

      resolve(body);
    });
  });
}

function extract(regEx, source) {
  const result = regEx.exec(source);

  if (!result) {
    return '';
  }

  return result[1];
}

const titleRegEx = /<title.*>(.*?)<\/title>/i;
function extractTitle(source) {
  return extract(titleRegEx, source);
}

const descriptionRegEx = /<meta.*?(?:property|name)="(?:(?:og|twitter):)?description".*?content="(.*?)".*?\/?>/i;
function extractDescription(source) {
  return extract(descriptionRegEx, source);
}

const urlRegEx = /<link.*?rel="canonical".*?href="(.*?)".*?\/?>(?:<\/link>)?/i;
function extractUrl(link, source) {
  return extract(urlRegEx, source) || link;
}

const imageRegEx = /meta.*?(?:property|name)="(?:(?:og|twitter):)?image".*?content="(.*?)".*?\/?>/i;
function extractImage(source) {
  return extract(imageRegEx, source);
}

function extractMetadata(link, source) {
  return {
    title: extractTitle(source),
    description: extractDescription(source),
    url: extractUrl(link, source),
    image: extractImage(source),
  };
}

const requestCache = {};

module.exports = (link) => {
  const cacheItem = requestCache[link];

  if (cacheItem instanceof Promise) {
    return cacheItem;
  }

  if (requestCache[link]) {
    return Promise.resolve(requestCache[link]);
  }

  return requestCache[link] = requestSource(link)
    .then(source => requestCache[link] = extractMetadata(link, source));
};
