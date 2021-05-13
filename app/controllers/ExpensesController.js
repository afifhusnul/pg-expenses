require('dotenv').config();

const 
  express = require('express'),
  router = express.Router(),    
  config = require('../utils/Setting'),  
  queries = require('../models/Expenses-db'),
  auth = require('../middleware/AuthMiddleware'),
  validateSalaryInput = require('../validation/Salary')  


/* GET all data */
router.get('/', auth, (req, res, next) => {
  try {    
    queries.getAll().then(data => {
        res.json(config.rest.createResponse(200, true, data));
    });    
  } catch(e) {    
    if (e) {
      res.status(500).json(config.rest.createResponse(500, false, e));
    } else {
      next(res.status(500).json(config.rest.createResponse(500, false, e)))
    }
  }  
})

/* GET data by id */
router.get('/:id', auth, (req, res, next) => {
    queries.getById(req.params.id)
      .then(data => {
        if (data) {
          res.json(config.rest.createResponse(200, true, data))
        } else {        
          res.status(400).json(config.rest.createResponse(400, false, undefined, 'Data not found'))          
        }
    })    
})


/* POST New data */
router.post('/', auth, (req,res,next) => {

  try {
    const { user_id,dt_salary,desc_salary,amt_salary } = req.body
    queries.create({user_id,dt_salary,desc_salary,amt_salary})
      .then(data => {
        if (data) {
          res.json(config.rest.createResponse(200, true, data));
        } else {
          res.status(400).json(config.rest.createResponse(400, false, undefined, err))
        }

      }).catch(err =>        
        res.status(500).json(config.rest.createResponse(500, false, undefined, err.detail))
        // console.log(err)
      )          

  } catch(e) {
    // statements
    console.log(e);
  }

})

/* UPDATE Salary */
router.put('/:id', auth, (req,res,next) => {

    try {
      const { desc_salary,amt_salary } = req.body      
      queries.update(req.params.id, desc_salary,amt_salary)
        .then(data => {
          if (data) {                
            res.json(config.rest.createResponse(200, true, data));
          } else {              
            res.status(500).json(config.rest.createResponse(500, false, undefined, "Data not found"))
          }            
        }).catch(err =>
          res.status(400).json(config.rest.createResponse(400, false, undefined, err))
        ) 
    } catch(e) {
      // statements
      console.log(e);
    }
})

/* DELETE data salary */
router.delete('/:id', (req,res,next) => {
  const id = req.params.id
  queries.delete(req.params.id)
    .then(data => {
      if (data) {
        res.json(config.rest.createResponse(200, true, "Delete data "+req.params.id+" Success"));    
      } else {
        res.status(400).json(config.rest.createResponse(400, false, undefined, "Data id "+req.params.id+" not found"))
      }        
    }).catch(err =>    
      res.status(400).json(config.rest.createResponse(400, false, undefined, err))
    ) 

})

module.exports = router;