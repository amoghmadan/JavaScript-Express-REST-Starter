import App from './App';

try {
    let app = App.getInstance();
    app.run();
} catch (err) {
    console.error(err);
}
