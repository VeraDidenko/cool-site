const orderTableName = 'order';

const getOrder = (req, res, db) => {
    db.select('*').from(orderTableName)
        .then(items => {
            res.json(items)
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
}

const postOrder = (req, res, db) => {
    const { name_and_surname, email, comment, telephone } = req.body
    console.log({ name_and_surname, email, comment, telephone})
    db(orderTableName).insert({id: undefined, name_and_surname, email, comment, telephone})
        .returning('*')
        .then(item => {
            res.json(item)
        })
        .catch(err => res.status(400).json({dbError: 'db error' + err}))
}

const putOrder = (req, res, db) => {
    const { id, name_and_surname, email, comment, telephone } = req.body
    db(orderTableName).where({id}).update({ name_and_surname, email, comment, telephone})
        .returning('*')
        .then(item => {
            res.json(item)
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteOrder = (req, res, db) => {
    const { id } = req.body
    db(orderTableName).where({id}).del()
        .then(() => {
            res.json({delete: 'true'})
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = {
    getOrder,
    postOrder,
    putOrder,
    deleteOrder
}