var fs = require( 'fs' );
var yaml = require( 'js-yaml' );
var coffee = require( 'js2coffee' );
var util = require( 'util' );

var beautify = require( 'js-beautify' );

function jsonify( data ){
    return JSON.stringify( data, null, 2 );
}

function yamlify( plain ){
    return yaml.safeDump( plain );
}

function csonify( plain ){
    //based on https://github.com/bevry/cson/blob/master/src/lib/cson.coffee
    var json = 'var grunt_generate_configs_temp = ' + jsonify( plain );
    var result = coffee.build( json, { indent : "  " } ).code;
    result = result.replace( /^\s*grunt_generate_configs_temp\s*\=\s/, '' );
    return result;
}

function modularize( plain ){
    return beautify( 'module.exports = '
        + util.inspect( plain, { depth : null } )
        + ';',
        { indent_size : 2 }
    );
}

function coffize( plain ){
    return coffee.build( modularize( plain ),
        { indent : "  " } ).code;
}

var serializers = {
    json   : jsonify,
    yaml   : yamlify,
    yml    : yamlify,
    coffee : coffize,
    cson   : csonify,
    js     : modularize
};

module.exports = function writeFiles( opts ){
    var generated = [];

    if( fs.existsSync( opts.target ) ){
        require( 'rimraf' ).sync( opts.target );
    }
    fs.mkdirSync( opts.target );

    Object.keys( opts.data ).forEach( function( taskName ){
        var serializer = serializers[ opts.type ];
        var file = opts.target + '/' + taskName + '.' + opts.type;
        var serialized = serializer( opts.data[ taskName ] );
        fs.writeFileSync( file, serialized );
        generated.push( file );
    } );

    return generated;
}
