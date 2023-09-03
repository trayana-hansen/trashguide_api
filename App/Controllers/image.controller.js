import sequelize from "../../Config/sequelize.config.js"
import { QueryParamsHandle } from "../../Middleware/helpers.js"
import Images from "../Models/image.model.js"

/**
 * Controller foc City Actions
 */
class ImageController {
  /**
   * Method List
   * @param {Object} req Express Request Object
   * @param {Object} res Express Response Object
   */
  list = async (req, res) => {
		const qp = QueryParamsHandle(req, 'id, title')

    try {
    // Eksekverer sequelize metode med management values
      const result = await Images.findAll({
				order: [qp.sort_key],
				limit: qp.limit,
        attributes: ['id', 'title', 
          [
            sequelize.fn(
              "CONCAT",
              "http://localhost:4000/images/",
              sequelize.col("filename")
            ),
            "filename",
          ]]
      })
      // Udskriver resultat i json format
      res.json(result)
      
    } catch (error) {
			res.status(418).send({
				message: `Unable to get images: ${err}`
			})
      
    }
  }
}

export default ImageController
