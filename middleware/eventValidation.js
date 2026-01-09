module.exports = (req, res, next) => {
    const { title, description, date, location } = req.body;

    //tjek alle felter er udfyldt
    if (!title || !description || !date || !location) {
        return res.status(400).json({ error: 'Title, description, and date are required fields.' });
    }

    //tjek at event navn ikke er længere end 10 tegn
    if (title.length > 10) {
        return res.status(400).json({ error: 'Title cannot exceed 10 characters.' });
    }

    next();
}