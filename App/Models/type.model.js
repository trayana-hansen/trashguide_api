import sequelize from '../../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import Categories from './category.model.js'

class Types extends Model{}

Types.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	image_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Image,
			key: 'id'
		}
	},
	category_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Categories,
			key: 'id'
		}
	}	
}, {
	sequelize,
	modelName: 'image',
	underscored: true,
})

export default Types