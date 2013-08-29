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
      return data.replace(/url\(.*\)/gi, function(match, location) {
        var dirName = path.resolve(path.dirname(fileName)),
          url = match.slice(4, -1).replace(/"|'/g, '');

        if (url.indexOf('/') !== 0 && dirName.indexOf(staticRoot) > -1) {
          url = path.resolve(dirName + '/' + url);
          url = url.substr(url.indexOf(staticRoot) + staticRoot.length);
        }

        return 'url("' + url + '")';
      });
    }
    
    return data;
  }

  return '';
};

module.exports = Replace;
