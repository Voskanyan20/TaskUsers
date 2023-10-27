const database = require('../conf/db_config')
const { Op } = require('sequelize')
const customOnError = require('./error')

const getUser = async (req, res) => {
  await database.user
    .findAll({
      include: [
        {
          model: database.keywords,
          attributes: ['id', 'name']
        }
      ]
    })
    .then(result => res.json(result))
    .catch(error => customOnError(req, res, error.name))
}

const createUser = async (req, res) => {
  const { firstName, lastName, keywords } = req.body
  const file = req.file
  const keyword = JSON.parse(keywords)
  let options = []

  if (firstName && lastName && keyword && file) {
    try {
      await database.user
        .create({
          firstName: firstName,
          lastName: lastName,
          filename: file.filename,
          fileOriginalName: file.originalname
        })
        .then(async result => {
          for (let i = 0; i < keyword.length; i++) {
            options.push({ name: keyword[i], userId: result.id })
          }
          if (result && options.length > 0) {
            await database.keywords
              .bulkCreate(options)
              .then(_ => {
                console.log('Created')
              })
              .catch(err => {
                customOnError(req, res, err.name)
              })
          }
          res.json(result)
        })
        .catch(err => {
          customOnError(req, res, err.name)
        })
    } catch (e) {
      customOnError(req, res, e.name)
    }
  } else {
    res.send('Some Field(s) not found')
  }
}

const searchUsers = async (req, res) => {
  const { firstName, lastName, keywords } = req.body

  try {
    const items = await database.user.findAll({
      where: {
        firstName: firstName
          ? { [Op.like]: `%${firstName.toLowerCase()}%` }
          : { [Op.not]: null },
        lastName: lastName
          ? { [Op.like]: `%${lastName.toLowerCase()}%` }
          : { [Op.not]: null }
      },
      include: [
        {
          model: database.keywords
        },
        {
          model: database.keywords,
          where: {
            name: keywords
              ? { [Op.like]: `%${keywords.toLowerCase()}%` }
              : { [Op.not]: null }
          }
        }
      ],
    })

    if (items) {
      const findResult = await database.user.findAll({
        where: {
          id: {[Op.in]: items.map(item => item.id)}
        },
        include: [
          {
            model: database.keywords,
            attributes: ['id', 'name']
          }
        ]
      })
      res.json(findResult)
    } else {
      console.log("not found");
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  getUser,
  createUser,
  searchUsers
}
