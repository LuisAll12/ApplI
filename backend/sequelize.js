// /sequelize.js
import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('appli_db', 'root', 'dein_passwort', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false,
})
