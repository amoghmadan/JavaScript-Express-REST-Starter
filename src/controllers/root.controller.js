const helloWorld = async (req, res) => {
    res.status(200).json({ 'hello': 'World!' });
};

export { helloWorld };
