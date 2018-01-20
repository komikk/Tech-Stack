import * as express from "express";
import * as path from "path";
import serverRenderer from './server';

// Changes in this file are being watched by webpack-hot-server-middleware
// You must restart whole application if want to see changes in development mode

let app = express();
let server;

app.set("port", process.env.PORT || 3001);

// static middleware allows to designate one or more 
// directories as containing static resources that are 
// simply to be delivered to the client without any special handling. 
// thinks like images, css, client side js files
// static is prefix for path to real static content. use it in this way <script src="static/bundle.js"></script>
let staticPath = process.env.NODE_ENV === "development" ? "/static" : path.resolve('dist/server/static');
app.use("/static", express.static(staticPath));


if (process.env.NODE_ENV === "development") {
    const webpack = require("webpack")
    const webpackConfig = require("../webpack.config").default
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
    const webpackHotClientMiddleware = require('webpack-hot-middleware');

    // webpack-hot-server-middleware use output path for getting server renderer function
    // server renderer function must be in form (options) => (req, res, next) => void
    webpackConfig[1].output.path = __dirname;
    const compiler = webpack(webpackConfig);

    // creates bundle in memory and in case of change rebuilds it
    app.use(webpackDevMiddleware(compiler, {
        noInfo: false,
        serverSideRender: true,
        publicPath: webpackConfig[0].output.publicPath,
        stats: {
            colors: true
        }
    }));

    app.use(webpackHotClientMiddleware(compiler.compilers.find(compiler => compiler.name === 'client'),
        { log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000 }));

    app.use(webpackHotServerMiddleware(compiler));
} else {
    app.use(serverRenderer({} as any));
}

server = app.listen(app.get("port"), () => {
    console.log(`Express started in ${app.get("env")} mode on http://localhost:${app.get("port")}; press Ctrl+C toterminate`);
});




