class RootController {
    async helloWorld(req, res) {
        res.status(200).json({ 'hello': 'World!' });
    }
}

export const rootController = new RootController();
