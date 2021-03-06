var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
router.use(bodyParser.urlencoded({ extended: true }));
var PatientProvider = require('./patientinfo');
var User=require('./User');

parseParameters = function (req) {
    var provider_state = req.query.state;
    var max_discharges = req.query.max_discharges;
    var min_discharges = req.query.min_discharges;
    var max_average_covered_charges = req.query.max_avg_covered_charges;
    var min_average_covered_charges = req.query.min_avg_covered_charges;
    var max_average_medicare_payments = req.query.max_avg_medicare_payments;
    var min_average_medicare_payments = req.query.min_avg_medicare_payments;
    var queryObj = {};
    if (max_discharges && min_discharges) {
        queryObj['TotalDischarges'] = { $gte:  parse(min_discharges), $lte: parse(max_discharges) };
        // queryarray.push(TotalDischarges);
    }
    else if (max_discharges) {
        queryObj['TotalDischarges'] = { $lte: parse(max_discharges) };
        // queryarray.push(TotalDischarges);
    }
    else if (min_discharges) {
        queryObj['TotalDischarges'] = { $gte:  parse(min_discharges) };
        //  queryarray.push(TotalDischarges);
    }
    if (provider_state) {
        queryObj['ProviderState'] = provider_state.toUpperCase();
    }
    if (max_average_covered_charges && min_average_covered_charges) {
        queryObj['AverageCoveredCharges'] = { $gte:  parse(min_average_covered_charges), $lte:  parse(max_average_covered_charges) };
    }
    else if (max_average_covered_charges) {
        queryObj['AverageCoveredCharges'] = { $lte:  parse(max_average_covered_charges) };
    }
    else if (min_average_covered_charges) {
        queryObj['AverageCoveredCharges'] = { $gte:  parse(min_average_covered_charges) };
    }
    if (max_average_medicare_payments && min_average_medicare_payments) {
        queryObj['AverageMedicarePayments'] = { $gte:  parse(min_average_medicare_payments), $lte:  parse(max_average_medicare_payments) };
    }
    else if (max_average_medicare_payments) {
        queryObj['AverageMedicarePayments'] = { $lte:  parse(max_average_medicare_payments) };
    }
    else if (min_average_medicare_payments) {
        queryObj['AverageMedicarePayments'] = { $gte:  parse(min_average_medicare_payments) };
    }

    return queryObj;
}
parse = function (val) {
    if (val)
    {
        if(val=="0")
        {
            return 0;
        }
        else
        return Number(val) || undefined;
    }
       

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
    var pageOptions = {
        page: req.headers["page"] || 0,
        limit: req.headers["limit"] || 40
    }
   var selectClause= req.headers['options'];
    var queryObj = parseParameters(req);
    // var q=JSON.parse(queryObj);
    // console.log(User);
    PatientProvider.find(queryObj,selectClause)
    .skip(pageOptions.page*pageOptions.limit)
    .limit(pageOptions.limit).exec( function (err, users) {
        PatientProvider.count(queryObj,function(error,totalCount){
            if (err) return res.status(500).send("There was a problem finding the users.");
            res.status(200).send({data:users,totalCount:totalCount});
        });
       
    });
});


module.exports = router;