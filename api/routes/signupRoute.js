const express = require('express');
const router = express();
const connect = require('../../database/database');
const cipher = require('../../handler/security');

router.post('/',function(req,res){
    var ouser_job = req.body.user_job;
    var ouser_major = req.body.user_major;
    var ouser_email = req.body.user_email;   //암호화 진행
    var ouser_password = req.body.user_password; //암호화 진행
    var ouser_name = req.body.user_name; //암호화 진행
    var ouser_nickname = req.body.user_nickname;
    var ouser_gender = req.body.user_gender;

    const user_email = cipher.encrypt(req.body.user_email);

    let sql = 'SELECT user_email FROM user';
    let params = [user_email];
    connect.query(sql,params,function(err,rows,fields){
        if(err){
            console.log(err);
        }
        let invalid=false;
        for(let i = 0; i<rows.length;i++){
            if(rows[i].user_email===user_email){
                invalid=true;
            }
        }

        if(invalid===true){
            res.status(201).json(undefined);
        }else{
            const user_serverTime = (new Date()).getTime();
            const user_id = cipher.makeIndex(user_serverTime);
            const user_salt = cipher.makeSalt();
            const user_password = cipher.makeEncryptPassword(req.body.user_password,user_salt);
            const user_name = cipher.encrypt(req.body.user_name);
            const user_job = req.body.user_job;
            const user_major = req.body.user_major;
            const user_nickname = req.body.user_nickname;
            const user_gender = req.body.user_gender;

            let sql = 'INSERT INTO user (user_id, user_job, user_major, user_email, user_password, user_name, user_nickname, user_gender, user_salt, user_serverTime) VALUES(?,?,?,?,?,?,?,?,?,?)';
            let params = [user_id, user_job, user_major, user_email, user_password, user_name, user_nickname, user_gender, user_salt, user_serverTime];

            connect.query(sql, params, function(err,rows,fields){
                res.status(201).json(rows);
            });
        }
    });
});

function encrypt(data){
    const cipher = crypto.createCipher('aes-256-cbc', accessKey.accessKey);
    let result = cipher.update(data,'utf-8','base64');
    result += cipher.final('base64');
    return result;
}

function decrypt(data){
    const cipher = crypto.createDecipher('aes-256-cbc', 'parkchoyang6316111');
    let result = cipher.update(data, 'base64', 'utf-8');
    result += cipher.final('utf-8');
    return result;
}

function makeSalt(){
    return crypto.randomBytes(32).toString('base64');
}

function makeEncryptPassword(data,salt){
    return crypto.pbkdf2Sync(data, salt, 130495, 64, 'sha512').toString('base64');
}

function makeIndex(servertime){
    let serverTime = servertime.toString();
    // console.log(serverTime);
    let indexSalt = makeSalt();
    let index = crypto.pbkdf2Sync(serverTime, indexSalt, 130495, 32, 'sha512').toString('base64');
    return index;
}

module.exports = router;
