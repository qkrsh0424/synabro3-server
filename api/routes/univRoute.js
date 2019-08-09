const express = require('express');
const router = express();
const connect = require('../../database/database');

//Element
//univ 는 앱이 가지고 있는 모든 univ 목록의 베이스 리스트이다. 즉 univ의 인덱스 요소를 가지고 있다.
//Deleted 정보 => univ_isDeleted.

/*
* /univ 현재 가지고 있는 univ 리스트를 모두 불러온다.
* */
router.get('/',function(req,res){
    var sql = 'SELECT * FROM univ WHERE univ_isDeleted=0';
    connect.query(sql,function(err,rows,fields){
        if(err){
            console.log(err);
        }
        res.status(200).json(rows);
    });
});

/*
* /univ/:univ_id 현재 가지고 있는 univ 리스트에서 univ_id와 동일한 univ *단일 요소를 가져온다.
* */
router.get('/:univ_id',function(req,res){
    var univ_id = req.params.univ_id;
    var sql = 'SELECT * FROM univ WHERE univ_id = ? AND univ_isDeleted=0';
    var params = [univ_id];

    connect.query(sql,params,function(err,rows,fields){
        if(err){
            console.log(err);
        }
        res.status(200).json(rows[0]);
    });
});

/*
* /univ/title/:univ_id 현재 가지고 있는 univ 리스트에서 univ_id와 동일한 univ *단일 요소를 가져온다.
* univ title을 가져온다.
* */
router.get('/title/:univ_id',function(req,res){
    var univ_id = req.params.univ_id;
    var sql = 'SELECT univ_title FROM univ WHERE univ_id = ? AND univ_isDeleted=0';
    var params = [univ_id];

    connect.query(sql,params,function(err,rows,fields){
        if(err) {
            console.log(err);
        }
        res.status(200).json(rows[0]);
    });
});


module.exports = router;
