import sequelize from '../../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import Categories from './category.model.js'
import Types from './type.model.js'

class CategoryTypeRel extends Model{}

CategoryTypeRel.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	category_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Categories,
			key: 'id'
		}
	},
	type_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Types,
			key: 'id'
		}
	},
	is_allowed: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
			defaultValue: false
	},
	is_home: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	is_station: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
}, {
	sequelize,
	modelName: 'category_type_rel',
	freezeTableName: true,
	timestamps: false,
	underscored: true,
})

export default CategoryTypeRel