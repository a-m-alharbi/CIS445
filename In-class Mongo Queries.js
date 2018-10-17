//Q2:

db.products.find(
	{
        {},
        name: 1, category: 1, _id: 0
    }
);


db.products.find(
	{
    	{ },
        name: 1, category: 1, _id: 0
    }
);


db.product.find ( 
	{},
	{_id: 0,
	 name: 1,
	 category: 1,
	 company: 1
	}
);


/*Update the company ìStanleyî to ìStanley Black and Deckerî and re-run 
How many documents needed to be updated?
How many rows would MySQL have required?
Answ:
*/

db.product.update(
	{
		//1-filtering, 2-ops, 3-options {multi}
		company: "Stanley"
	}
	{
		$set: { company: "Stanley Black Decker"}
	},
	{multi: true}
);
	

/*Update the company ìStanleyî to ìStanley Black and Deckerî and re-run 
How many documents needed to be updated? Answ: 1
How many rows would MySQL have required?
*/


/*6a.Select all the products in the tools category with a price greater than 10.00. 
Answ:
*/

db.product.find ( //first param is the filter, second is the projection
	{
		$and: [	
			{category: "tools"},
			{$gt: {price:10}}
		]
	}	
);

/*6b.Now only those made by Stanley Black and Decker.
answ:
*/

db.product.find ( //first param is the filter, second is the projection
	{
		$and: [	
			{category: "tools"},
			{$gt: {price:10}},
			{company: "Stanley Black and Decker"}
		]
	}	
);

/*
7.Delete the crest company. 
Any problems? problem is that if we delete "crest", all the products that have "crest" related to them are 
going to be deleted
*/

db.product.remove( //first param is the filter criteria, second is

	{company: "crest"}
);