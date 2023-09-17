import sequelize from '../../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'

class Containers extends Model{}

Containers.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false
	}
}, {
	sequelize,
	modelName: 'container',
	underscored: true
})

export default Containers