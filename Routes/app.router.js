import express from 'express'
const AppRouter = express.Router()
import SectionController from '../App/Controllers/section.controller.js'
import { Authorize } from '../Middleware/auth.js'
import CategoryController from '../App/Controllers/category.controller.js'
import TypeController from '../App/Controllers/type.controller.js'
import ArticleController from '../App/Controllers/article.controller.js'
import ReviewsController from '../App/Controllers/review.controller.js'
import ImageController from '../App/Controllers/image.controller.js'

// Section Routes
const sectioncontrol = new SectionController
AppRouter.get('/section', (req, res) => { sectioncontrol.list(req, res) })
AppRouter.get('/section/:id([0-9]*)', (req, res) => { sectioncontrol.details(req, res) })
AppRouter.post('/section', (req, res) => { sectioncontrol.create(req, res) })
AppRouter.put('/section/:id([0-9]*)', (req, res) => { sectioncontrol.update(req, res) })
AppRouter.delete('/section/:id([0-9]*)', (req, res) => { sectioncontrol.remove(req, res) })

// Category Routes
const catcontrol = new CategoryController
AppRouter.get('/categories/:section_id([0-9]*)', (req, res) => { catcontrol.list(req, res) })
//AppRouter.get('/category/:id([0-9]*)', (req, res) => { catcontrol.details(req, res) })
AppRouter.post('/categories', (req, res) => { catcontrol.create(req, res) })
AppRouter.put('/categories/:id([0-9]*)', (req, res) => { catcontrol.update(req, res) })
AppRouter.delete('/categories/:id([0-9]*)', (req, res) => { catcontrol.remove(req, res) })

// Type Routes
const typecontrol = new TypeController
AppRouter.get('/types/:category_id([0-9]*)', (req, res) => { typecontrol.list(req, res) })
//AppRouter.get('/category/:id([0-9]*)', (req, res) => { catcontrol.details(req, res) })
AppRouter.post('/categories', (req, res) => { catcontrol.create(req, res) })
AppRouter.put('/categories/:id([0-9]*)', (req, res) => { catcontrol.update(req, res) })
AppRouter.delete('/categories/:id([0-9]*)', (req, res) => { catcontrol.remove(req, res) })

// Article Routes
const articlecontrol = new ArticleController
AppRouter.get('/articles', (req, res) => { articlecontrol.list(req, res) })
AppRouter.get('/articles/:id([0-9]*)', (req, res) => { articlecontrol.details(req, res) })

// Review Routes
const reviewcontrol = new ReviewsController
AppRouter.get('/reviews/:org_id([0-9]*)', (req, res) => { reviewcontrol.list(req, res) })
AppRouter.get('/reviews/details/:id([0-9]*)', (req, res) => { reviewcontrol.details(req, res) })
AppRouter.post('/reviews', Authorize, (req, res) => { reviewcontrol.create(req, res) })
AppRouter.put('/reviews', Authorize, (req, res) => { reviewcontrol.update(req, res) })
AppRouter.delete('/reviews/:id([0-9]*)', Authorize, (req, res) => { reviewcontrol.remove(req, res) })

// Images Routes
const imgcontrol = new ImageController;
AppRouter.get('/imagelist', (req, res) => { imgcontrol.list(req, res) })


export default AppRouter