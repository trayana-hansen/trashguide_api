import Containers from '../Models/container.model.js'
import { QueryParamsHandle } from '../../Middleware/helpers.js'

/**
 * Controller for UserGroup Actions
 */
class ContainerController {

	/**
	 * Method List
	 * @param {Object} req Express Request Object
	 * @param {Object} res Express Response Object
	 */
	list = async (req, res) => {
		// Indhenter parametre fra request objekt
		const qp = QueryParamsHandle(req, 'id, name')

		try {
			// Eksekverer sequelize metode med management values
			const result = await Containers.findAll({
				attributes: qp.attributes,
				order: [qp.sort_key],
				limit: qp.limit
			})
			// Udskriver resultat i json format
			res.json(result)			
		} catch (error) {
			res.status(418).send({
				message: `Could not get list: ${error}`
			})												
		}
	}

	/**
	 * Method Details
	 * @param {Object} req Express Request Object
	 * @param {Object} res Express Response Object
	 */
	details = async (req, res) => {
		// Destructure assignment af id. 
		const { id } = req.params || 0

		if(id) {
			try {
				// Eksekverer sequelize metode med attributter og where clause
				const result = await Containers.findOne({
					attributes: ['id', 'name', 'description'],
					where: { id: id }
				})
				// Udskriver resultat i json format
				res.json(result)
			} catch (error) {
				res.status(418).send({
					message: `Could not get record details: ${error}`
				})					
			}	
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}

	/**
	 * Method Create
	 * @param {Object} req Express Request Object
	 * @param {Object} res Express Response Object
	 */
	create = async (req, res) => {
		// Destructure assignment af form data fra request body
		const { name, description } = req.body;
		// Tjekker felt data
		if(name && description) {
			try {
				// Opretter record
				const model = await Containers.create(req.body)
				// Sender nyt id som json object
				res.json({
					message: `Record created`,
					newId: model.id
				})				
			} catch (error) {
				res.status(418).send({
					message: `Could not create record: ${error}`
				})																						
			}
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}

	/**
	 * Method Update
	 * @param {*} req 
	 * @param {*} res 
	 */
	update = async (req, res) => {
		// Destructure assignment af id. 
		const { id } = req.params || 0
		// Destructure assignment af form data fra request body
		const { name, description } = req.body;
		// Tjekker felt data
		if(id && name && description) {
			try {
				// Opretter record
				const model = await Containers.update(req.body, {
					where: { id: id }
				})
				// Sender nyt id som json object
				res.json({ 
					message: 'Record updated' 
				})				
			} catch (error) {
				res.status(418).send({
					message: `Could not update record: ${error}`
				})																										
			}
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}	
	}

	/**
	 * Method Remove
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 */	
	remove = async (req, res) => {
		const { id } = req.body

		if(id) {
			try {
				await Containers.destroy({ 
					where: { id: id }
				})
				res.status(200).send({
					message: `Record deleted`
				})
			}
			catch(err) {
				res.status(418).send({
					message: `Could not delete record: ${error}`
				})																										
			}	
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}	
}

export default ContainerController