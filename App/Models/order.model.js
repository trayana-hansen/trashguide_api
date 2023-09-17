import sequelize from '../../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import Containers from './container.model.js'

class Orders extends Model{}

Orders.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	container_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Containers,
			key: 'id'
		}
	},
	fullname: {
		type: DataTypes.STRING,
		allowNull: false
	},
	address: {
		type: DataTypes.STRING,
		allowNull: false
	},
	zipcode: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	city: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	phone: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	sequelize,
	modelName: 'order',
	underscored: true,
})

export default Orders