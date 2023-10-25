module.exports = (seq, Sequelize) => {
  const user = seq.define('user', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    },
    filename: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    },
    fileOriginalName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    }
  })
  return user
}
