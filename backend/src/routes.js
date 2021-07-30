const express = require('express');
const UserController = require('./controllers/UserController');
const CasesController = require('./controllers/CaseController');
const OngController = require('./controllers/OngController');
const DoadorController = require('./controllers/DoadorController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const FindCasesbyCityController = require('./controllers/FindCasesbyCityController')
const FindCasesbyStatusController = require('./controllers/FindCasesbyStatusController')
const FindCasesbyCaseIdController = require('./controllers/FindCasesbyCaseIdController')

const routes = express.Router();

routes.post('/users', UserController.create);
routes.delete('/users/:id', UserController.delete);
routes.put('/users/:id', UserController.update);

routes.get('/ong', OngController.index);
routes.get('/donor', DoadorController.index);

routes.get('/cases', CasesController.index);
routes.post('/cases', CasesController.create);
routes.put('/cases/:id', CasesController.update);
routes.delete('/cases/:id', CasesController.delete);

routes.get('/profile', ProfileController.index);
routes.post('/sessions', SessionController.create);

routes.get('/findbycity', FindCasesbyCityController.index);
routes.get('/findbystatus', FindCasesbyStatusController.index);

routes.get('/findbyCaseId', FindCasesbyCaseIdController.index);

routes.get('/loginDoador', function(req, res){
	res.sendFile(__dirname + "/src/pages/loginDoador.html");
	
});

routes.get('/loginOng', function(req, res){
	res.sendFile(__dirname + "/src/pages/loginOng.html");
	
});

module.exports = routes;
