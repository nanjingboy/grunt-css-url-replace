var fs = require('fs'),
    path = require('path'),
    Replace;

Replace = function(fileName, serverRoot) {
    this.fileName = fileName;
    this.serverRoot = serverRoot;
};

Replace.prototype.run = function() {
    var fileName = this.fileName,
        serverRoot = this.serverRoot,
        data;

    if (fs.existsSync(fileName)) {
        data = fs.readFileSync(fileName).toString();
        if (data !== '') {
            return data.replace(/url\(.*\)/gi, function(match, location) {
                var currentUrl = match.slice(4, -1).replace(/"|'/g, ''),
                    url;

                if (currentUrl.indexOf('/') !== 0) {
                    url = path.resolve(path.dirname(fileName) + '/' + currentUrl);
                    if (url.indexOf(serverRoot) > -1) {
                        url = '/' + url.substr(url.indexOf(serverRoot));
                    } else {
                        url = currentUrl;
                    }
                } else {
                    url = currentUrl;
                }

                return 'url(' + url + ')';
            });
        }
    }

    return '';
};

module.exports = Replace;