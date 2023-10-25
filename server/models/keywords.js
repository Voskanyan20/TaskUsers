module.exports = (seq, Sequelize) => {
  const keywords = seq.define('keywords', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    }
  })
  return keywords
}
