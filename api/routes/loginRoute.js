const express = require('express');
const router = express();
const connect = require('../../database/database');
const cipher = require('../../handler/security');

router.post('/',function(req,res){
    var user_email = cipher.encrypt(req.body.user_email);
    var sql = 'SELECT * FROM user';
    connect.query(sql,function(err,rows,fields){
        let valid = false;
        for(let i = 0; i<rows.length; i++){
            if(user_email===rows[i].user_email){
                valid = true;
            }
        }

        if(valid){
            let sql = 'SELECT * FROM user WHERE user_email = ?';
            let params = [user_email];
            connect.query(sql, params,function(err,rows,fields){
                let salt = rows[0].user_salt;
                let user_password = cipher.makeEncryptPassword(req.body.user_password,salt);
                let dbpassword = rows[0].user_password;
                if(user_password===dbpassword){
                    res.status(201).json(rows[0].user_id);
                }else{
                    res.status(201).json(undefined);
                }
            });
        }else{
            res.status(201).json(undefined);
        }
    });

});

module.exports = router;
