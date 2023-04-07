const express = require('express');
const router = express.Router();
const { getAsync, setAsync } = require('../redis');

router.get('/', async (_, res) => {
    let addedTodos = await getAsync("added_todos");
    return res.json({ "added_todos": Number(addedTodos) })
})

module.exports = router