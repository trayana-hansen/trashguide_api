import sequelize from '../../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'

// Skriver ny klasse og udvider den med SQ's Model klasse
class Sections extends Model {}

// Initialiserer model
Sections.init({
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
	image_filename: {
		type: DataTypes.STRING,
		allowNull: true
	}
}, {
	sequelize, // Sequelize objekt
	modelName: 'section', // Model (tabel) navn
	underscored: true, // Brug underscore istedet for camelcase
	//freezeTableName: false, // Lås tabelnavne til ental
	//createdAt: true, // Undlad createdAt felt
	//updatedAt: true //Undlad updatedAt felt
})

export default Sections