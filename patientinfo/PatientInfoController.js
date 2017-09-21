var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
router.use(bodyParser.urlencoded({ extended: true }));
var PatientProvider = require('./patientinfo');
var User=require('./User');

parseParameters = function (req) {
    var provider_state = req.query.state;
    var max_discharges = parse(req.query.max_discharges);
    var min_discharges = parse(req.query.min_discharges);
    var max_average_covered_charges = parse(req.query.max_average_covered_charges);
    var min_average_covered_charges = parse(req.query.min_average_covered_charges);
    var max_average_medicare_payments = parse(req.query.max_average_medicare_payments);
    var min_average_medicare_payments = parse(req.query.min_average_medicare_payments);
    var queryObj = {};
    if (max_discharges && min_discharges) {
        queryObj['TotalDischarges'] = { $gte: min_discharges, $lte: max_discharges };
        // queryarray.push(TotalDischarges);
    }
    else if (max_discharges) {
        queryObj['TotalDischarges'] = { $lte: max_discharges };
        // queryarray.push(TotalDischarges);
    }
    else if (min_discharges) {
        queryObj['TotalDischarges'] = { $gte: min_discharges };
        //  queryarray.push(TotalDischarges);
    }
    if (provider_state) {
        queryObj['ProviderState'] = provider_state;
    }
    if (max_average_covered_charges && min_average_covered_charges) {
        queryObj['AverageCoveredCharges'] = { $gte: min_average_covered_charges, $lte: max_average_covered_charges };
    }
    else if (max_average_covered_charges) {
        queryObj['AverageCoveredCharges'] = { $lte: max_average_covered_charges };
    }
    else if (min_average_covered_charges) {
        queryObj['AverageCoveredCharges'] = { $lte: min_average_covered_charges };
    }
    if (max_average_medicare_payments && min_average_medicare_payments) {
        queryObj['AverageMedicarePayments'] = { $gte: min_average_medicare_payments, $lte: max_average_medicare_payments };
    }
    else if (max_average_medicare_payments) {
        queryObj['AverageMedicarePayments'] = { $lte: max_average_medicare_payments };
    }
    else if (min_average_medicare_payments) {
        queryObj['AverageMedicarePayments'] = { $lte: min_average_medicare_payments };
    }

    return queryObj;
}
parse = function (val) {
    if (val)
        return Number(val) || undefined;

    else
        return undefined;
}

// route middleware to verify a token
router.use(function(req, res, next) {
    
      // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
      // decode token
      if (token) {
    
        // verifies secret and checks exp
        jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {      
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });    
          } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;    
            next();
          }
        });
    
      } else {
    
        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    
      }
    });

// route to find all the patients for the supplied query(GET http://localhost:3000/providers)
router.get('/', function (req, res) {
   var selectClause= req.headers['options'];
    var queryObj = parseParameters(req);
    // var q=JSON.parse(queryObj);
    // console.log(User);
    PatientProvider.find(queryObj,selectClause, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});


module.exports = router;