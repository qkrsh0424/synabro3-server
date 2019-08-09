const express = require('express');
const router = express();
const connect = require('../../database/database');
const cipher = require('../../handler/security');

//Element
//univ_post 는 univ페이지에서 생성된 글 또는 포스트의 정보를 가져온다.
//Deleted 정보 => post_isDeleted.

/*
* /univ_post 현재 가지고있는 모든 univ내의 포스트 정보를 가져온다.
* */
router.get('/',function(req,res){
    var sql = 'SELECT * FROM univ_post WHERE post_isDeleted=0';

    connect.query(sql,function(err,rows,fields){
        if(err){
            console.log(err);
        }
        res.status(200).json(rows);
    });
});

/*
* /univ_post/p/:post_id => post_id에 부합하는 단일 포스트 의 특정 리스트를 가져온다.
* */
router.get('/p/:post_id',function(req,res){
    var post_id = req.params.post_id;
    var sql = 'SELECT post_id,univ_id, post_type, post_topic, post_desc, post_comment_count, post_view_count, post_like_count, user.user_id, post_created,user_nickname ' +
        'FROM univ_post JOIN user ON user.user_id=univ_post.user_id ' +
        'WHERE post_id=?';
    var params = [post_id];

    connect.query(sql,params,function(err,rows,fields){
        if(err){
            console.log(err);
        }
        res.status(200).json(rows[0]);
    });
});

/*
* /univ_post/:univ_id univ_id 인덱스에 부합하는 포스트 정보들을 가져온다.
* */

router.get('/u/:univ_id',function(req,res){
    var univ_id = req.params.univ_id;
    var sql = 'SELECT * FROM univ_post WHERE univ_id=? AND post_isDeleted=0 ORDER BY post_created DESC';
    var params = [univ_id];

    connect.query(sql, params, function(err,rows,fields){
        if(err){
            console.log(err);
        }

        res.status(200).json(rows);
    });
});

/*
* /univ_post/:univ_id/:post_type(**univ_item_address) univ_id 인덱스에 부합하는 포스트 정보리스트들을 가져오고 그 univ 페이지 내부에 항목 univ_item_address 즉,
*   페이지 아이템별 포스트의 정보리스트들을 다시 가져온다.
*   univ_item_address는 univ_item에서 얻음, univ_item_address 와 post_type의 값을 같게 해줄 필요가 있다.
* */

router.get('/:univ_id/:univ_item_address',function(req,res){
    var univ_id = req.params.univ_id;
    var univ_item_address = req.params.univ_item_address;
    var sql = 'SELECT univ_post.*, user.user_nickname, user.user_email FROM univ_post JOIN user ON user.user_id=univ_post.user_id WHERE univ_id=? AND post_type=? AND post_isDeleted=0 ORDER BY post_created DESC';
    var params = [univ_id, univ_item_address];

    connect.query(sql,params,function(err,rows,fields){
        if(err) {
            console.log(err);
        }
        res.status(200).json(rows);
    });
});

/*
* /univ_post/:univ_id/:post_type/b/post_id
* 위 조건에 만족하는 *단일 포스트 항목을 가져온다.
* b=> base.
* */

router.get('/:univ_id/:univ_item_address/b/:post_id',function(req,res){
    var univ_id = req.params.univ_id;
    var univ_item_address = req.params.univ_item_address;
    var post_id = req.params.post_id;
    var sql = 'SELECT * FROM univ_post WHERE univ_id=? AND post_type=? AND post_id=? AND post_isDeleted=0';
    var params = [univ_id, univ_item_address,post_id];

    connect.query(sql,params,function(err,rows,fields){
        if(err){
            console.log(err);
        }
        res.status(200).json(rows[0]);
    });
});

/*
* /univ_post/:univ_id/:post_type/pu/post_id
* 위 조건에 만족하는 *단일 포스트 항목의 모든 로우 데이터를 가져온다.
* pu=> post and user
* */

router.get('/:univ_id/:univ_item_address/pu/:post_id',function(req,res){
    var univ_id = req.params.univ_id;
    var univ_item_address = req.params.univ_item_address;
    var post_id = req.params.post_id;
    var sql = 'SELECT * FROM univ_post JOIN user ON user.user_id=univ_post.user_id WHERE univ_id=? AND post_type=? AND post_id=?';
    var params = [univ_id, univ_item_address,post_id];

    connect.query(sql,params,function(err,rows,fields){
        if(err){
            console.log(err);
        }
        res.status(200).json(rows[0]);
    });
});



module.exports = router;
