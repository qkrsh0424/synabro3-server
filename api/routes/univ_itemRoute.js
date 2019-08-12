const express = require('express');
const router = express();
const connect = require('../../database/database');

//Element
//univ_item은 각각의 univ가 가지고 있는 페이지 항목에 대한 인덱스를 담고 있다.
// ex) ...대학교는 홈, 공지사항, 자유게시판 항목을 가짐.
//Deleted 정보 => univ_item_isDeleted.

/*
* /univ_item 현재 앱이 가지고 있는 모든 univ_item 에 대한 정보를 가져온다.
* */
router.get('/',function(req,res){
    var sql = 'SELECT * FROM univ_item WHERE univ_item_isDeleted=0';
    connect.query(sql,function(err,rows,fields){
        if(err){
            console.log(err);
        }
        res.status(200).json(rows);
    });
});

/*
* /univ_item/:univ_id univ_id와 일치하는 모든 univ_item을 가져온다.
* */
router.get('/:univ_id',function(req,res){
    var univ_id = req.params.univ_id;
    var sql = 'SELECT * FROM univ_item WHERE univ_id = ? AND univ_item_isDeleted=0 ORDER BY univ_item_order';
    var params = [univ_id];

    connect.query(sql,params,function(err,rows,fields){
        if(err) {
            console.log(err);
        }
        res.status(200).json(rows);
    });
});

module.exports = router;
