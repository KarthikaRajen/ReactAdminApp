/*auth the employee*/
exports.auth = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM employee WHERE email = ?',[input.credentials.email],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            if(rows.length > 0){
                res.send(JSON.stringify({"status": 200, "error": null, "response": rows}));
            }else{
                res.status(400).json({errors:{global : "Invalid Credentials"}});
            }

        });

    });
};

/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM employee',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );
            
            res.send(JSON.stringify({"status": 200, "error": null, "response": rows}));

         });

         //console.log(query.sql);
    });

};

exports.add = function(req, res){
  res.render('add_employee',{page_title:"Add Customers - Node.js"});
};

exports.edit = function(req, res){

    var id = req.params.id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM employee WHERE id = ?',[id],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.send(JSON.stringify({"status": 200, "error": null, "response": rows}));

         });

    });
};

/*Save the employee*/
exports.save = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {

            name    : input.data.name,
            email   : input.data.email,
            address   : input.data.address,
            phone   : input.data.phone

        };

        var query = connection.query("INSERT INTO employee(email,name,address,phone) VALUES (?,?,?,?) ",[data.email,data.name,data.address,data.phone], function(err, rows)
        {

          if (err)
              console.log("Error inserting : %s ",err );

              res.send(JSON.stringify({"status": 200, "error": null, "response": rows}));

        });

       // console.log(query.sql); get raw query

    });
};

exports.save_edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {

            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone

        };

        connection.query("UPDATE employee set ? WHERE id = ? ",[data,id], function(err, rows)
        {

          if (err)
              console.log("Error Updating : %s ",err );

          res.redirect('/employees');

        });

    });
};


exports.delete_employee = function(req,res){

     var id = req.params.id;

     req.getConnection(function (err, connection) {

        connection.query("DELETE FROM employee  WHERE id = ? ",[id], function(err, rows)
        {

             if(err)
                 console.log("Error deleting : %s ",err );

             res.redirect('/employees');
             
        });
        
     });
};


