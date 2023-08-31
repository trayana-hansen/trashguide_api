import Categories from '../Models/category.model.js'
import Types from '../Models/type.model.js';
import CategoryTypeRel from '../Models/category_type_rel.model.js';
import { QueryParamsHandle } from '../../Middleware/helpers.js';

class CategoryController {

	/**
	 * List Metode - henter alle records
	 * @param {object} req 
	 * @param {object} res 
	 * @return {array} Returnerer JSON array
	 */
	list = async (req, res) => {
		const qp = QueryParamsHandle(req, 'id, title')
		const { incl_types } = req.query

		const arrIncludes = []

		if(incl_types) {
			// Definerer relation mellem by og hotel - one to many
			Types.belongsToMany(Categories, { through: CategoryTypeRel });
			Categories.belongsToMany(Types, { through: CategoryTypeRel });

			arrIncludes.push({
				model: Types,
				attributes: ['title'],
			})			
		}		

		try {
			// Kalder SQ model
			const result = await Categories.findAll({
				order: [qp.sort_key],
				limit: qp.limit,
				attributes: qp.attributes,
				include: arrIncludes
			})
			// Parser resultat som json
			res.json(result)
		} catch(err) {
			res.status(418).send({
				message: `Unable to list records: ${err}`
			})
		}
	}

	/**
	 * Search Metode - henter alle records ud fra en funden søgestrengf 
	 * @param {object} req 
	 * @param {object} res 
	 * @return {array} Returnerer JSON array
	 */
	 search = async(req, res) => {
		const { keyword } = req.params

		if(keyword) {
			try {
				// Sætter resultat med sq metode
				const result = await Events.findAll({
					// where clause
					where: {
						// Søg på titel
						title: {
							[Op.like]: `%${req.params.keyword}%`
						},
						// Søg på titel
						description: {
							[Op.like]: `%${req.params.keyword}%`
						} 
					},
					// Attributter: array med felter
					attributes: ['id', 'title', 'image', 'startdate', 'stopdate'],
					// Inkluderer relationelle data fra artist via id
					include: [{
						model: GenreModel,
						attributes: ['id', 'name']
					},
					{
						model: StageModel,
						attributes: ['id', 'name']
					}]
				})
				// Parser result som json
				res.json(result)
			} catch (err) {
				res.status(403).send({
					message: `Something went wrong: ${err}`
				})					
			}			
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}


	/**
	 * GET Metode henter record ud fra id
	 * @param {object} req 
	 * @param {object} res 
	 * @return {object} Returnerer JSON object med detaljer
	 */
	details = async (req, res) => {
		const { id } = req.params

		if(id) {
			// Sætter resultat efter sq metode
			try {
				const result = await Events.findOne({
					attributes: [
						'id', 'title', 'description', 'image', 'startdate', 'stopdate', 'duration_minutes',
						'price', 'created_at'
					],
					include: [{
						model: GenreModel,
						attributes: ['id', 'name']
					}, {
						model: StageModel,
						attributes: ['id', 'name']
					}],
					// Where clause
					where: { id: req.params.id}
				});
				// Parser resultat som json
				res.json(result)
					
			} catch (error) {
				res.status(403).send({
					message: `Something went wrong: ${err}`
				})					
			}
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}


	/**
	 * Create Metode - opretter nyt event
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 * @return {number} Returnerer nyt id
	 */
	 create = async (req, res) => {
		const { 
				title, description, image, startdate, stopdate, duration_minutes, 
				price, genre_id, stage_id } = req.body

		if(title && description && image && startdate && stopdate && genre_id && stage_id) {
			try {
				const model = await Events.create(req.body)
				return res.json({
					message: `Record created`,
					newId: model.id
				})					
			} catch (error) {
				res.status(403).send({
					message: `Could not create record: ${err}`
				})									
			}
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}

	/**
	 * Update Metode - opdaterer event
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 */	
	 update = async (req, res) => {
		const { id } = req.params
		const { title, description, image, startdate, stopdate, duration_minutes, 
			price, genre_id, stage_id } = req.body

		if(id && title && description && image && startdate && stopdate) {
			try {
				const model = await Events.update(req.body, {
					where: {id: id}
				})
				return res.json({
					message: `Record updated`
				})					
			} catch (error) {
				res.status(403).send({
					message: `Could not update record: ${err}`
				})					
			}
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}

	/**
	 * Delete Metode - sletter bruger ud fra id i url parameter
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 */	
	remove = async (req, res) => {
		const { id } = req.params.id

		if(id) {
			try {
				await Events.destroy({ 
					where: { id: id }
				})
				res.sendStatus(200)
			}
			catch(err) {
				res.status(418).send({
					message: `Could not delete record: ${err}`
				})
			}	
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}	
}

export default CategoryController