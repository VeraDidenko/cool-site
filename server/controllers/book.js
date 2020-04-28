const bookTableName = 'book';

const getBook = (req, res, db) => {
    db.select('*').from(bookTableName)
        .then(items => {
            res.json(items)
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
}

const postBook = (req, res, db) => {
    const { title, author, details } = req.body
    console.log({title, author, details})
    db(bookTableName).insert({id: undefined, title, author, details})
        .returning('*')
        .then(item => {
            res.json(item)
        })
        .catch(err => res.status(400).json({dbError: 'db error' + err}))
}

const putBook = (req, res, db) => {
    const { id, title, author, details } = req.body
    db(bookTableName).where({id}).update({ title, author, details})
        .returning('*')
        .then(item => {
            res.json(item)
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteBook = (req, res, db) => {
    const { id } = req.body
    db(bookTableName).where({id}).del()
        .then(() => {
            res.json({delete: 'true'})
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = {
    getBook,
    postBook,
    putBook,
    deleteBook
}
