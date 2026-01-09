module.exports = (req, res, next) => {
    const { title, description, date, location } = req.body;

    //tjek alle felter er udfyldt
    if (!title || !description || !date || !location) {
        return res.status(400).json({ error: 'Title, description, and date are required fields.' });
    }

    next();
}