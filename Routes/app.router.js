import express from 'express'
const AppRouter = express.Router()
import SectionController from '../App/Controllers/section.controller.js'
import { Authorize } from '../Middleware/auth.js'
import CategoryController from '../App/Controllers/category.controller.js'

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

export default AppRouter