var fs = require('fs'),
  path = require('path'),
  Replace;

Replace = function(fileName, staticRoot) {
  this.fileName = fileName;
  this.staticRoot = staticRoot;
};

Replace.prototype.run = function() {
  var fileName = this.fileName,
    staticRoot = this.staticRoot,
    data;

  if (fs.existsSync(fileName)) {
    data = fs.readFileSync(fileName).toString();
    if (data && staticRoot) {
      return data.replace(/url\s*\(\s*(['"]?)([^?#"'\)]*)\1\s*\)/gi, function(match, location) {
        var dirName = path.resolve(path.dirname(fileName)),
          url,
          urlPath;

        match = match.replace(/\s/g, '');
        url = match.slice(4, -1).replace(/"|'/g, '');
        if (url[0] === '.' && dirName.indexOf(staticRoot) > -1) {
          urlPath = path.resolve(dirName + '/' + url);
          if (urlPath.indexOf(dirName) > -1) {
            url = urlPath.substr(urlPath.indexOf(staticRoot) + staticRoot.length);
          }
        }

        return 'url("' + url + '")';
      });
    }

    return data;
  }

  return '';
};

module.exports = Replace;
