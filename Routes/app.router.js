import express from 'express'
const AppRouter = express.Router()
import EventController from '../App/Controllers/category.controller.js'
import { Authorize } from '../Middleware/auth.js'

// Event Routes
const eventcontrol = new EventController
AppRouter.get('/events', (req, res) => { eventcontrol.list(req, res) })
AppRouter.get('/events/search/:keyword([0-9a-zA-Z]*)', (req, res) => { eventcontrol.search(req, res) })
AppRouter.get('/events/:id([0-9]*)', (req, res) => { eventcontrol.details(req, res) })
AppRouter.post('/events', (req, res) => { eventcontrol.create(req, res) })
AppRouter.put('/events/:id([0-9]*)', (req, res) => { eventcontrol.update(req, res) })
AppRouter.delete('/events/:id([0-9]*)', (req, res) => { eventcontrol.remove(req, res) })

export default AppRouter