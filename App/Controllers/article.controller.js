import sequelize from "../../Config/sequelize.config.js"
import Article from "../Models/article.model.js"
import Images from "../Models/image.model.js"
import { Sequelize } from "sequelize"

// Definerer relation mellem by og hotel - one to many
Images.hasMany(Article)
Article.belongsTo(Images)

/**
 * Controller foc City Actions
 */
class ArticleController {
  /**
   * Method List
   * @param {Object} req Express Request Object
   * @param {Object} res Express Response Object
   */
  list = async (req, res) => {
    // Destructure Assignment - optional list management
    let { sortkey, sortdir, limit, attributes } = req.query
    // Sætter array til sort og retning
    const order = [sortkey ? sortkey : "id"]
    order.push(sortdir || "ASC")
    // Sætter limit antal
    limit = parseInt(limit) || 1000
    // Sætter attributter (table felter)
    const attr = attributes
      ? attributes.split(",")
      : new Array("id", "title", "teaser")

    // Eksekverer sequelize metode med management values
    const result = await Article.findAll({
      attributes: attr,
      order: [order],
      limit: limit,
      include: [
        {
          model: Images,
          attributes: [
            'filename',
            [Sequelize.fn(
              'CONCAT', 
              'http://localhost:3000/Assets/Images/Database/', 
              Sequelize.col('filename')
            ), 'absolute_path']
          ]
        }
      ],
    })
    // Udskriver resultat i json format
    res.json(result)
  }

  /**
   * Method Details
   * @param {Object} req Express Request Object
   * @param {Object} res Express Response Object
   */
  details = async (req, res) => {
    // Destructure assignment af id.
    const { id } = req.params || 0
    // Eksekverer sequelize metode med attributter og where clause
    const result = await Article.findOne({
      attributes: ["id", "publish_date", "title", "teaser", "content"],
      where: { id: id },
      include: [
        {
          model: Images,
          attributes: ["filename"]
        }
      ]
    })
    // Udskriver resultat i json format
    res.json(result)
  }
}

export default ArticleController
