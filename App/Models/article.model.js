import sequelize from '../../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import Images from './image.model.js'

class Article extends Model{}

Article.init({
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
	teaser: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	publish_date: {
		type: DataTypes.DATE,
		allowNull: false
	},	
	image_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Images,
			key: 'id'
		}
	}
}, {
	sequelize,
	modelName: 'article',
	underscored: true,
})

export default Article