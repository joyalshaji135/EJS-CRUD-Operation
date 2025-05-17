const Concert = require('../models/Concert');

exports.getAllConcerts = async (req, res) => {
    try {
        const concerts = await Concert.find().sort({ date: 1 });
        res.render('concerts/index', { concerts });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getNewConcertForm = (req, res) => {
    res.render('concerts/new');
};

exports.createConcert = async (req, res) => {
    try {
        const { name, date, time, venue, ticketPrice, availableTickets, image } = req.body;
        const newConcert = new Concert({
            name,
            date,
            time,
            venue,
            ticketPrice,
            availableTickets,
            image: image || 'https://via.placeholder.com/300'
        });
        await newConcert.save();
        res.redirect('/concerts');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getConcert = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if (!concert) {
            return res.status(404).send('Concert not found');
        }
        res.render('concerts/show', { concert });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getEditConcertForm = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if (!concert) {
            return res.status(404).send('Concert not found');
        }
        res.render('concerts/edit', { concert });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.updateConcert = async (req, res) => {
    try {
        const { name, date, time, venue, ticketPrice, availableTickets, image } = req.body;
        const updatedConcert = await Concert.findByIdAndUpdate(
            req.params.id,
            {
                name,
                date,
                time,
                venue,
                ticketPrice,
                availableTickets,
                image: image || 'https://via.placeholder.com/300'
            },
            { new: true }
        );
        if (!updatedConcert) {
            return res.status(404).send('Concert not found');
        }
        res.redirect(`/concerts/${updatedConcert._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.deleteConcert = async (req, res) => {
    try {
        const deletedConcert = await Concert.findByIdAndDelete(req.params.id);
        if (!deletedConcert) {
            return res.status(404).send('Concert not found');
        }
        res.redirect('/concerts');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};