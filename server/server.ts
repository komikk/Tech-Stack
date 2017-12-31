import * as path from "path";
import * as express from "express";

export const serverRenderer = () => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.set("Content-Type", "text/html")
            .status(200)
            .end(renderFullPage());
    }
};

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

