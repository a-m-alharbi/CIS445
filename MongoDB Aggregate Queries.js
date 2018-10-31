/**
* Abdullah Mansour Alharbi. 
* Canvas ID: aalharbi1.
* Assignment: MongoDB Aggregate Queries 
* CIS 445
*/

// Q1
db.employees.aggregate([

	{$group: {"_id": "$birth_date", "count":{$sum:1}}}, {$sort: {"count":-1}}, { $limit: 10  }

]);

// Q2
db.employees.aggregate([

	{$match: {}}, 
	{$project: { _id: 0, emp_no: 1, first_name: 1, last_name: 1, salaries: 1}},
	{ $limit: 10}

]).pretty();

// Q3
db.employees.aggregate([ 

	{ "$project": { _id: 0, "salary": {"$map": {"input": "$salaries", "as": "sal", "in": "$sal.salary"}}}}, 
    { "$unwind": "$salary" }, 
    { "$group": {"_id":  "$_id", "avgSalary": { "$avg": "$salary" }, count: {$sum: 1}}} 

]);

// Q4
db.employees.aggregate([ 

    { "$project": { _id: 0, "salary": {"$map": {"input": "$salaries", "as": "sal", "in": "$sal.salary"}}}}, 
    { "$unwind": "$salaries" }, 
    { "$group": {"_id":  "$_id", "avgSalary": { "$avg": "$salary" }, count: {$sum: 1}}} 

]);


// Q4 second query
db.employees.aggregate([

    {$limit: 10},
	{$project: { _id: 0, emp_no: 1, first_name: 1, last_name: 1, departments: 1, avgSalary: 1 }}

]).pretty();


// Q5
db.employees.aggregate([

    { $limit: 20},
	{ $unwind: "$salaries"},
    {$project: {_id: 0, emp_no: 1, first_name: 1, last_name: 1, departments: 1, salaries: 1}}

]).pretty();


// Q6
db.employees.aggregate([

  { $project: {"salary": {"$map": {"input": "$salaries", "as": "sal", "in": "$sal.salary" }}}}, 
  {$unwind: "$departments"},
  {$unwind: "$salaries" },
  { $group : {_id: "$departments.dept_name", avgSalary: {$avg: "$salary"}}}
  { $sort: 1}

]).pretty();


