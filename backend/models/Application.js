import { DataTypes } from 'sequelize'
import { sequelize } from '../sequelize.js'
import { User } from './User.js'

export const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  jobCompany: DataTypes.STRING,
  jobPosition: DataTypes.STRING,
  jobEmploymentType: DataTypes.STRING,
  motivation: DataTypes.TEXT,
  strengths: DataTypes.TEXT,
  education: DataTypes.STRING,
  currentJob: DataTypes.STRING,
  yearsExperience: DataTypes.INTEGER,
  generatedLetter: DataTypes.TEXT('long')
})

User.hasMany(Application, { foreignKey: 'userId' })
Application.belongsTo(User, { foreignKey: 'userId' })
