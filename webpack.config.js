var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // entry: {
    //     'vendor': './app/vendor.ts',
    //     'main': './app/main.ts',
    //     'index': './app/index.html'
    // },
    // output: {
    //     path: __dirname + "/public/build",
    //     filename: "[name].js"
    // },
    // resolve: {
    //     extensions: ['', '.ts', '.js','.ttf'],
    //     alias: {
    //             materializecss: 'materialize-css/dist/css/materialize.css',
    //             materialize: 'materialize-css/dist/js/materialize.js',
    //       }
    // },
    // module: {
    //     loaders: [
    //         { test: /\.html/, loader: 'file?name=[name].[ext]' },
    //         {
    //             test: /\.ts$/,
    //             loader: 'ts'
    //         },
    //         {
    //             test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
    //             loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    //         },
    //         {
    //             test: /\.js$/,
    //             loader: 'source-map-loader',
    //             exclude: [
    //                 // these packages have problems with their sourcemaps
    //                 './node_modules/rxjs',
    //                 './node_modules/@angular'
    //             ]
    //         }
    //     ]
    // },
    // plugins: [
    //   new CopyWebpackPlugin([
    //        { from: './app/assets' }
    //    ]),
    //   new webpack.ProvidePlugin({
    //       $: "jquery",
    //       jQuery: "jquery",
    //       "window.jQuery": "jquery"
    //   })
// ]
}
