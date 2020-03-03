import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI
});

export const apiCall = () => (req, res) => {
    const { input } = req.body;
    if (!input) {
        return res.status(400).json('Invalid URL')
   }
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('API call failed'))
}

export const ImageRec = (db) => (req, res) => {
    const { id } = req.body;
    db('users')
    .returning('entries')
    .where('id', '=', id)
    .increment('entries', 1)
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json(err))
}