import * as express from "express";
import * as path from "path";

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
    // the same instance of webpack is used for client and server watch functionality
    // It probably causes multiple building of client in case of server change.
    const webpack = require("webpack")
    const webpackClientConfig = require("../webpack.client.config").default
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackHotClientMiddleware = require('webpack-hot-middleware');

    const clientCompiler = webpack(webpackClientConfig);

    // creates bundle in memory and in case of change rebuilds it
    app.use(webpackDevMiddleware(clientCompiler, {
        noInfo: true,
        serverSideRender: true,
        publicPath: webpackClientConfig.output.publicPath,
        stats: {
            colors: true
        },
        watchOptions: {
            aggregateTimeout: 3500,
            poll: 1000
        }
    }));

    app.use(webpackHotClientMiddleware(clientCompiler,
        { log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000 }));

}

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.set("Content-Type", "text/html")
        .status(200)
        .end(renderFullPage());
});


server = app.listen(app.get("port"), () => {
    console.log(`Express started in ${app.get("env")} mode on http://localhost:${app.get("port")}; press Ctrl+C toterminate`);
});

// Render Initial HTML
const renderFullPage = () => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name=viewport content="width=device-width, initial-scale=1">
        <title>Tech-Stack</title>
    </head>
    <body>
    <div id="app">
        <p id="time">Date</p>
        <input
            type="text" size="40" style="text-align: center"
            placeholder="Type something in here to prove state isn't lost"
        />
    </div>
    <script src="static/bundle.js"></script>
    </body>
    </html>`;
};



