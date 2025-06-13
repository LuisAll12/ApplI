import { DataTypes } from 'sequelize'
import { sequelize } from '../sequelize.js'

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  phone: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
