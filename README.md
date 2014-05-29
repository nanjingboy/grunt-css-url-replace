# grunt-css-url-replace

> Grunt task to replace css urls with absolute path

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-css-url-replace --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-css-url-replace');
```

### Options

#### options.staticRoot
Type: `String`
Default value: `'public'`

The root static directory in your website

### Usage Examples

```js
grunt.initConfig({
  css_url_replace: {
    options: {
      staticRoot: 'public'
    },
    files: {
      'dest/build.css': ['css/application.css', 'css/users/default.css']
    }
  }
});
```

In this example, imagine the following folder structure and css contents:

```
public
├── css
│   └─── application.css
|   └─── users
|        └─── default.css
├── images
|   └── baner.png
|   └── avatar.png
```

#### css/application.css
```css
  .baner{background-image:url("../images/baner.png");}
  .baner{background-image:url("../images/baner.png#test");}
  .http { background-image: url("http://somehost.com/image.png"); }
  .https_urls { background-image: url("https://somehost.com/image.png"); }
```

#### css/users/default.css
```css
  .avatar{background-image:url("../../images/avatar.png");}
  .avatar{background-image:url("../../images/avatar.png?name=test");}
  .data_urls { background-image: url('data:image/png:base64,0'); }
```

#### the generated file dest/build.css is would be:
```css
  .baner{background-image:url("/images/baner.png");}
  .baner{background-image:url("/images/baner.png#test");}
  .http { background-image: url("http://somehost.com/image.png"); }
  .https_urls { background-image: url("https://somehost.com/image.png"); }
  .avatar{background-image:url("/images/avatar.png");}
  .avatar{background-image:url("/images/avatar.png?name=test");}
  .data_urls { background-image: url('data:image/png:base64,0'); }
```

## Contributors
>- [superbug](https://github.com/superbug)
>- [andersjanmyr](https://github.com/andersjanmyr)
>- [Nehle](https://github.com/Nehle)

## License
>- [MIT](https://github.com/NanJingBoy/grunt-css-url-replace/blob/master/LICENSE-MIT)

## Release History
_2014-05-29   v0.1.7   Fixed parser error for absolute url_

_2014-01-22   v0.1.5   Fixed parser error when url include hash and question mark values_

_2013-09-05   v0.1.3   Fixed parser error when url is like images/demo.png_

_2013-09-05   v0.1.1   Fixed parser error when has more then 2 urls in one line content_

_2013-08-29   v0.1.0   Release the first version_