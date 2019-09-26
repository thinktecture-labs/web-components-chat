const generateLinkPreview = require('./link-preview');

module.exports = function simpleApiBackend(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method.toLowerCase() === 'post' && req.url === '/api/link-preview') {
    console.log('link preview requested');
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      if (!body) {
        res.writeHead(204);
        res.end();
        return;
      }

      let link = '';

      try {
        link = JSON.parse(body).link;
      } catch {
        res.writeHead(204);
        res.end();
        return;
      }

      generateLinkPreview(link).then(
        result => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(result));
          res.end();
        },
        () => {
          res.writeHead(500);
          res.end();
        },
      );
    });

    req.on('error', () => req.end());

    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ nix: 'gut' }));
  res.end();
};
