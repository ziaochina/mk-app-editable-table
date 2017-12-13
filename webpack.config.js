var webpack = require("webpack");
var path = require("path");
var env = process.env.NODE_ENV
var compress = process.env.COMPRESS

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var plugins = []

plugins.push(new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(env)
}))

if (env === 'production' && compress) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            output: {
                "ascii_only": true
            },
            compressor: {
                warnings: false
            }
        })
    )
}

const extractCSS = new ExtractTextPlugin("mk-app-editable-table.css");
plugins.push(extractCSS)


module.exports = {
    entry: ["./index.umd.js"],
    output: {
        path: path.join(__dirname, "/dist/"),
        library: "MKAppEditableTable",
        libraryTarget: "umd"
    },

    resolve: {
        extensions: [".js"]
    },

    externals: {
        "react": {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        "react-dom": {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        },
        "immutable": {
            root: 'Immutable',
            commonjs2: 'immutable',
            commonjs: 'immutable',
            amd: 'immutable'
        },
        "moment": "moment",
        "mk-sdk": "MK",
        "mk-app-loader": {
            root:["MK","appLoader"],
            commonjs:"MK.appLoader",
            commonjs2:"MK.appLoader",
            amd:"MK.appLoader"
        },
        "mk-utils": {
            root:["MK","utils"],
            commonjs2:"MK.utils",
            amd:"MK.utils",
            commonjs:"MK.utils",
           
        },
        "mk-component": {
            root:["MK","component"],
            commonjs2:"MK.component",
            amd:"MK.component",
            commonjs:"MK.component"
        },
        "mk-meta-engine":  {
            commonjs:["MK","metaEngine"],
            commonjs2:"MK.metaEngine",
            amd:"MK.metaEngine",
            root:"MK.metaEngine"
        },
        "mk-aar-grid":"mk-aar-grid"
    },

    module: {
        rules: [{
            test: /\.css$/,
            use: extractCSS.extract({
                fallback: "style-loader",
                use: ['css-loader']
            })
        }, {
            test: /\.less$/,
            use: extractCSS.extract({
                fallback: "style-loader",
                use: ['css-loader', 'less-loader']
            })
        }, {
            test: /\.js?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    limit: 8192
                }
            }
        }]
    },

    plugins: plugins
}

if (env === 'development') {
    module.exports.devtool = 'source-map'
}
