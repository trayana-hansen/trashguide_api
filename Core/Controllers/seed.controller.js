import fs from 'fs'
import csv from 'csv-parser'
import path from 'path';
import sequelize from '../../Config/sequelize.config.js';

import Orgs from '../../Core/Models/org.model.js';
import Groups from '../../Core/Models/group.model.js';
import Users from '../../Core/Models/user.model.js';
import UserGroupRel from '../../Core/Models/user-group-rel.model.js';

import Categories from '../../App/Models/category.model.js';
import Images from '../../App/Models/image.model.js';

/**
 * Controller for Seed Actions
 */
class SeedController {
	constructor() {
		console.log('Class Seed Controller: Running seeds');
	} 

	seed_from_csv = async () => {

		const transaction = await sequelize.transaction();
	
		try {

			// Orgs
			const orgData = await this.get_csv_data('org.csv')
			const insertedOrgs = await Orgs.bulkCreate(orgData, { transaction });

			// Groups
			const groupData = await this.get_csv_data('group.csv')
			const insertedGroups = await Groups.bulkCreate(groupData, { transaction });

			// User
			const userData = await this.get_csv_data('user.csv')
			const insertedUser = await Users.bulkCreate(userData, { transaction });

			//////////////////// 

			// Genre
			const categoryData = await this.get_csv_data('category.csv')
			const insertedGenre = await Genres.bulkCreate(categoryData, { transaction });

			// Genre
			const imageData = await this.get_csv_data('image.csv')
			const insertedImage = await Genres.bulkCreate(imageData, { transaction });


			// Confirm transaction
			await transaction.commit();
		
			console.log('Seeding completed');
		} catch (error) {
			// Hvis der opstår en fejl, rul tilbage transaktionen
			await transaction.rollback();
			console.error('Seeding error:', error);
		}		
	}

	get_csv_data = async file => {
		const csvpath = path.resolve(`./Data/${file}`);
		const data = []

		return new Promise((resolve, reject) => {
			fs.createReadStream(csvpath)
			.pipe(csv())
			.on('data', row => {
				data.push(row)
			})
			.on('end', async () => {
				resolve(data);
			})
			.on('error', error => {
				reject(error)
			})
		}) 

	}
}

export default SeedController