import App from "./App";

try {
    const app = App.getInstance();
    app.run();
} catch (err) {
    console.error(err);
}
