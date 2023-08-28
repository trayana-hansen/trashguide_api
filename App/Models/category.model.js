import sequelize from '../../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import Images from './image.model.js'

// Skriver ny klasse og udvider den med SQ's Model klasse
class Categories extends Model {}

// Initialiserer model
Categories.init({
	// Definerer felt egenskaber
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'Ikke navngivet'
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: true
	},
	color: {
		type: DataTypes.STRING,
		allowNull: true
	},
	image_id: {
		type: DataTypes.TEXT,
		allowNull: true,
		references: {
			model: Images,
			key: 'id'
		}
	}
}, {
	sequelize, // Sequelize objekt
	modelName: 'event', // Model (tabel) navn
	underscored: true, // Brug underscore istedet for camelcase
	//freezeTableName: false, // Lås tabelnavne til ental
	//createdAt: true, // Undlad createdAt felt
	//updatedAt: true //Undlad updatedAt felt
})

export default Categories