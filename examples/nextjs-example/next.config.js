/** @type {import('next').NextConfig} */

const { patchWebpackConfig } = require('next-global-css')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')



const nextConfig = {
  reactStrictMode: true,  
  // 👇 custom webpack config source: https://github.com/graphql/graphiql/blob/main/examples/monaco-graphql-nextjs/README.md
  webpack(config, options) {
    // config.module.rules.push({
    //   test: /\.worker\.js$/,
    //   loader: 'worker-loader',
    //   // use: { loader: "worker-loader" },
    //   // options: { inline: true }, // also works
    //   options: {
    //     filename: 'static/[hash].worker.js',
    //     publicPath: '/_next/',
    //   },
    // });
    return config    
    // // this fixes some issues with loading web workers
    // // config.output.publicPath = '/_next/'
    // // config.output.publicPath = '/some_cool_path/'
    // // because next.js doesn't like node_modules that import css files
    // // this solves the issue for monaco-editor, which relies on importing css files
    // patchWebpackConfig(config, options)
    // config.resolve.alias = {
    //   ...config.resolve.alias,

    //   // this solves a bug with more recent `monaco-editor` versions in next.js,
    //   // where vscode contains a version of `marked` with modules pre-transpiled, which seems to break the build.
    //   //
    //   // (the error mentions that exports.Lexer is a const that can't be re-declared)
    //   '../common/marked/marked.js': 'marked',

    //   // this alias fixes a console warning ("require function is used in a way in which dependencies cannot be statically extracted")
    //   // this was only a warning and was not breaking dev or build, but annoying nonetheless
    //   'vscode-languageserver-types':
    //     '../../vscode-languageserver-types/lib/esm/main.js'
    // }
    // if (!options.isServer) {
    //   config.plugins.push(
    //     // if you find yourself needing to override
    //     // MonacoEnvironment.getWorkerUrl or MonacoEnvironment.getWorker,
    //     // you probably just need to tweak configuration here.
    //     new MonacoWebpackPlugin({
    //       // publicPath: "/monacoeditorwork",
    //       // you can add other languages here as needed
    //       languages: ['json', 'graphql'],
    //       filename: 'static/monacoeditorwork/[name].worker.js',
    //       // this is not in the plugin readme, but saves us having to override
    //       // MonacoEnvironment.getWorkerUrl or similar.
    //       customLanguages: [
    //         {
    //           label: 'graphql',
    //           worker: {
    //             id: 'graphql',
    //             entry: require.resolve('monaco-graphql/esm/graphql.worker.js')
    //           }
    //         }
    //       ]
    //     })
    //   )
    // }
    // // load monaco-editor provided ttf fonts
    // config.module.rules.push({
    //   test: /monaco-editor\/.*\.ttf$/,
    //   type: 'asset/resource'
    // })
    // return config
  }, 
}

module.exports = nextConfig;
