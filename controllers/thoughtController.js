const { Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({
                _id: req.params.thoughtId
            })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                req.body,
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought); // Return the updated user
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json({ message: 'Thought deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createReaction(req, res) {
        try {
            const thoughtId = req.params.thoughtId;
            const thought = await Thought.findByIdAndUpdate(
                thoughtId,
                { $addToSet: { reactions: req.body } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID' })
            }

            res.json(thought);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async deleteReaction(req, res) {
        try {

        } catch (err) {

        }
    }
};