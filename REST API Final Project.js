/**
* Abdullah Mansour Alharbi. 
* Canvas ID: aalharbi1.
* CIS 445
* Assignment: REST API Final Project
**/

const mongoClient = require('mongodb').MongoClient; 
var express = require("express");
var application = express();
var parser = require("body-parser");

application.use(parser.urlencoded( {extended: false } ));
application.use(parser.json());

mongoClient.connect("mongodb://omega.unasec.info:27017", function(err, client) { 

  if(!err) {

    console.log("Successful connection to mongodb.");
    
    const collection = client.db('amazon').collection('reviews');

    application.get("/review/:reviewid", function(req, res) {

        console.log("Request received");
        let reviewid = req.params.reviewid;
        
        collection.aggregate([{$match: {"review.id": reviewid}}]).toArray(function(err, results) { 

                for(var i = 0; i < results.length; i++) {
                   
                   console.log(results[i]);
                   res.send(results[i]);  
                }
                
        	res.end();
     	}); 
    });
    
    
    application.get("/review/random/:n/:stars", function(req, res) {

		console.log("Request received");

        let stars = req.params.stars;
        let n = req.params.n;
        
        collection.aggregate([
        
            {$match: {"review.star_rating": stars}}
            
        ]).toArray(function(err, results) { 

			for(var i = 0; i < results.length; i++) {
        	
        		console.log(results[i]);
            	res.send(results[i]);  
            }

        	res.end();
    	});
    });
    
    application.get("/review/:n/:from_date/:to_date", function(req, res) {
       
        console.log("Request received");
        
        let from_date = req.params.from_date;
        let to_date = req.params.to_date;
        let n = req.params.n;
        
        let from = new Date(from_date);
        let to = new Date(to_date);
        
        collection.aggregate([
        	{$match: {
        		$and: [
                	{"review.date" : { "$gte"  :  to}},  
                	{"review.date" : { "$lte" : from}}
              	] 
            }}
            
        ]).toArray(function(err, results) { 

   		    for(var i = 0; i < results.length; i++) {
                   
            	console.log(results[i]);
                res.send(results[i]);  
            }

        	res.end();
     	});
    });
    
    application.delete("/review/:reviewid", function(req, res) {
       
        console.log("Delete request received");
        let reviewid = req.params.reviewid;
        
        collection.deleteOne(
            
            { "review.id" : { $eq: reviewid } } 
            
        ).toArray(function(err, results) { 

            for(var i = 0; i < results.length; i++) {
                console.log(results[i]);
                res.send(results[i]);  
            }
            
        	res.send("Review with id number " + reviewid + " has been deleted");
        	res.end();s
        });
    });
    
    application.post("/review/:reviewid", function(req, res) {
       
        console.log(req.body);
       
        let reviewid = req.params.reviewid;
        db.products.insertOne( {"review.id": reviewid} );

        res.end();
    });
    
    application.put("/review/:reviewid", function(req, res) {
       
        console.log("Request received");
        
        let reviewid = req.params.reviewid;
        
        collection.update(
        
            {"review.id": reviewid},
            { $set: {"review.body": "updated"} }
            
        ).toArray(function(err, results) { 

            for(var i = 0; i < results.length; i++) {
                console.log(results[i]);
                res.send(results[i]);  
            }

		        res.end();
     	}); 
    });
    
    
    application.get("/review/:from/:to", function(req, res) {

        console.log("Request received");

        let from_date = req.params.from;
        let to_date = req.params.to;
        let n = req.params.n;
        
        let from = new Date(from_date);
        let to = new Date(to_date);
        
        collection.aggregate([
           
            {$match: {
            	$and: [
                	{"review.date" : { "$gte"  :  to}},  
                	{"review.date" : { "$lte" : from}}
              	]
            }},
            {$group : {
            
            	_id: null,
                averageStar: {$avg : "$review.star_rating"}
            }
            }
            
        ]).toArray(function(err, results) { 

             for(var i = 0; i < results.length; i++) {
        	
        	     console.log(results[i]);
         	     res.send(results[i]);  
        	 }

        	res.end();
     	}); 
    });
    
    application.get("review/helpful/:prodid", function(req, res) {
        
        console.log("Request received");
        
        let prodid = req.params.prodid;
        
        collection.aggregate([
            {$match: {"product.id": prodid}},
            {$group : {
                _id: null,
                averageVotes: {$avg : "$votes.helpful_votes"}
            }
            }
        ]).toArray(function(err, results) {
                
        	for(var i = 0; i < results.length; i++) {
        	
        		console.log(results[i]);
                res.send(results[i]);  
            }
            
        	res.end();
     	});
    });
    
    
    application.get("review/helpful/:custid", function(req, res) {
    	console.log("Request received");
        
        let custid = req.params.custid;
        
        collection.aggregate([
            {$match: {"customer_id": custid}},
            {$group : {
                _id: "$product.category",
                averageStar: {$avg : "$votes.star_rating"},
                averageVotes: {$avg : "$votes.helpful_votes"}
            }
            }
        ]).toArray(function(err, results) { 

            for(var i = 0; i < results.length; i++) {
        	    console.log(results[i]);
                res.send(results[i]);  
       		}

     	   res.end();
     	});
    });
    
  	application.listen(8080);
  
  } 
}); 


