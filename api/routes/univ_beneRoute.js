const express = require('express');
const router = express();
const connect = require('../../database/database');

/*
* /univ_bene 삭제된 베너는 제외하고 모든 베너를 보여준다.
* */
router.get('/',function(req,res){
    var sql = 'SELECT * FROM bene WHERE bene_isDeleted=0';
    connect.query(sql,function(err,rows,fields){
        res.status(200).json(rows);
    });
});

/*
* /univ_bene/all 삭제된 베너도 포함 모든 베너를 보여준다.
* */

router.get('/all',function(req,res){
    var sql = 'SELECT * FROM bene';
    connect.query(sql,function(err,rows,fields){
        res.status(200).json(rows);
    });
});

/*
* /univ_bene/:univ_id 삭제된 베너는 제외하고 univ_id에 대응되는 모든 베너를 보여준다.
* */

router.get('/:univ_id',function(req,res){
    var univ_id = req.params.univ_id;
    var sql = 'SELECT * FROM bene WHERE univ_id = ? AND bene_isDeleted=0';
    var params = [univ_id];
    connect.query(sql,params,function(err,rows,fields){
        res.status(200).json(rows);
    });
});

/*
* /univ_bene/:univ_id/boardType/:board_type 삭제된 베너는 제외하고 univ_id와 bene_area 에 대응되는 모든 베너를 보여준다.
* bene_type => {big, small....}
* */
router.get('/:univ_id/boardType/:board_type',function(req,res){
    var univ_id = req.params.univ_id;
    var bene_area = req.params.board_type;
    var sql = 'SELECT * FROM bene WHERE univ_id=? AND bene_area=? AND bene_isDeleted=0';
    var params = [univ_id,bene_area];
    connect.query(sql,params,function(err,rows,fields){
        res.status(200).json(rows);
    });
});

/*
* /univ_bene/:univ_id/boardType/:board_type/beneType/:bene_type 삭제된 베너는 제외하고 univ_id와 bene_area 와 bene_type에 대응되는 모든 베너를 보여준다.
* bene_area => {10000,10002.....}
* bene_type => {big, small....}
* */
router.get('/:univ_id/boardType/:board_type/beneType/:bene_type',function(req,res){
    var univ_id = req.params.univ_id;
    var bene_area = req.params.board_type;
    var bene_type = req.params.bene_type;
    var sql = 'SELECT * FROM bene WHERE univ_id=? AND bene_area=? AND bene_type=? AND bene_isDeleted=0';
    var params = [univ_id,bene_area,bene_type];
    connect.query(sql,params,function(err,rows,fields){
        res.status(200).json(rows);
    });
});

/*
* /univ_bene/:univ_id/beneType/:bene_type 삭제된 베너는 제외하고 univ_id와 bene_type에 대응되는 모든 베너를 보여준다.
* bene_type => {big, small}
* */
router.get('/:univ_id/beneType/:bene_type',function(req,res){
    var univ_id = req.params.univ_id;
    var bene_type = req.params.bene_type;
    var sql = 'SELECT * FROM bene WHERE univ_id=? AND bene_type=? AND bene_isDeleted=0';
    var params = [univ_id,bene_type];
    connect.query(sql,params,function(err,rows,fields){
        res.status(200).json(rows);
    });
});

module.exports = router;
