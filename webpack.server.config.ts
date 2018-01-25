import * as path from "path";
const nodeExternals = require('webpack-node-externals');
import * as webpack from "webpack";

const webpackConfig: webpack.Configuration =
    {
        name: 'index',
        target: 'node',
        entry: './server/index',
        output: {
            filename: "index.js",
            path: path.join(__dirname, "server"),
            libraryTarget: 'commonjs2'
        },
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"]
        },
        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                // awesome-typescript-loader helps Webpack compile your TypeScript code using the TypeScript’s standard configuration file named tsconfig.json
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: "awesome-typescript-loader",
                        }
                    ]
                },

                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { enforce: "pre", test: /\.js$/, use: "source-map-loader" }
            ]
        },
        // https://stackoverflow.com/questions/41692643/webpack-and-express-critical-dependencies-warning
        externals: [nodeExternals()],
        node: {
            console: true,
            __dirname: false,
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        },
        watchOptions: {
            aggregateTimeout: 3500,
            poll: 1000
        }
    };

export default webpackConfig;