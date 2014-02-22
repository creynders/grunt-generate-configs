# grunt-generate-configs [![GitHub version](https://badge.fury.io/gh/creynders%2Fgrunt-generate-configs.png)](http://badge.fury.io/gh/creynders%2Fgrunt-generate-configs)[![Build Status](https://secure.travis-ci.org/creynders/grunt-generate-configs.png?branch=master)](http://travis-ci.org/creynders/grunt-generate-configs)

> Generate separate grunt configuration files automatically

This grunt task will take your big, fat grunt configuration object and automatically generate separate files to store the task configuration objects in.
It's a one time operation to be done before you start using [load-grunt-configs][load-grunt-configs]

## Getting Started

This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-generate-configs
```

_(There's no need for the `--save` flags, since this task should be run only once.)_

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-generate-configs');
```

Don't forget to remove that line once you're finished !

## The "generate_configs" task

### Overview

#### Settings

_grunt-generate-configs_ has no configuration settings.

#### Running the task

```shell
grunt generate_configs
```

The task will parse your grunt configuration object and automatically create files for each task.
For example, if this is your grunt configuration inside `Gruntfile.js`:

```javascript
grunt.initConfig({
    jshint   : {
        all     : [
            'Gruntfile.js', 'tasks/*.js', '<%=nodeunit.tests%>'
        ],
        options : {
            jshintrc : '.jshintrc',
        },
    },

    // Before generating any new files, remove any previously-created files.
    clean    : {
        config : ['config'],
    },

    // Unit tests.
    nodeunit : {
        tests : ['tests/*_test.js'],
    },
});
```

It will create the files `jshint.json`, `clean.json` and `nodeunit.json` inside a `config` directory, containing the configuration objects:

```javascript
//file: config/jshint.json
{
  "all": [
    "Gruntfile.js",
    "tasks/*.js",
    "<%=nodeunit.tests%>"
  ],
  "options": {
    "jshintrc": ".jshintrc"
  }
}
```
```javascript
//file: config/clean.json
{
  "config": [
    "config"
  ]
}
```
```javascript
//file: config/nodeunit.json
{
  "tests": [
    "tests/*_test.js"
  ]
}
```

Once these files are generated, use the [load-grunt-configs][load-grunt-configs] module to automatically load all configuration files:

```shell
npm install load-grunt-configs --save-dev
```

and inside your `Gruntfile.js` replace the grunt configuration object with:

```javascript
var configs = require('load-grunt-configs')(grunt);
grunt.initConfig(configs);
```

See the project for more information, options and examples: [load-grunt-configs][load-grunt-configs]

### Command line options

* `--target=<dir>` you can specify the output directory using the `target`-flag. E.g.: `grunt generate_configs --target=foo` will create a `foo` directory instead of `config`.
* `--type=[js|json]` allows you to output the configuration objects as `json` files or javascript modules. E.g.: `grunt  generate_configs --type=js`
 
## Example output

* [json](/demos/json)
* [js](/demos/js)
* [yaml](/demos/yaml)
* [coffee](/demos/coffee)

## Changelog

### v0.3.0

* Adds demos
* Adds yaml support
* Adds Coffeescript support

### v0.2.0

* Test all possibilities, idiot!
* fixes #2, incorrect ext for js files

### v0.1.2

* Fixes #1, moved inquirer from devDeps to deps

### v0.1.1

* keywords, keywords, keywords, sigh

### v0.1.0

* Fixes CLI options examples
* creates task grunt-generate-configs

## License

Copyright (c) 2014 Camille Reynders
Licensed under the MIT license.

[![Analytics](https://ga-beacon.appspot.com/UA-12080113-4/grunt-generate-configs/README.md)](https://github.com/igrigorik/ga-beacon)

[load-grunt-configs]: https://creynders.github.io/load-grunt-configs
