import * as express from "express";
import * as path from "path";
import { serverRenderer } from './server';

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
    const compiler = webpack(webpackConfig[0]);

    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: false,
        publicPath: webpackConfig[0].output.publicPath,
        stats: {
            colors: true
        }
    }));

    app.use(require("webpack-hot-middleware")(compiler,
        { log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000 }));
}
app.use(serverRenderer());

server = app.listen(app.get("port"), () => {
    console.log(`Express started in ${app.get("env")} mode on http://localhost:${app.get("port")}; press Ctrl+C toterminate`);
});




