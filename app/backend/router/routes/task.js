/**
 * Created by zheqi on 2016/1/21.
 */
'use strict';

var mongoose    = require('mongoose'),
    express     = require('express'),
    router      = express.Router(),
    Model       = mongoose.model('Task');

module.exports = function(isLoggedIn) {
    router.get('/', isLoggedIn, function(req,res) {
        Model.find(function(err, data) {
            if (err) {return res.status(500).send(err);}
            if (data.length == 0) {return res.send('0');}
            return res.status(200).send(data);
        });
    });

    router.post('/', isLoggedIn, function(req, res) {
        var newData = new Model();
        Model.fillDoc(newData, req.body, function(err) {
            if (err) {return res.status(500).send(err);}
            return res.status(200).send(newData);
        });
    });

    router.get('/:id', isLoggedIn, function(req, res) {
        Model.findById(req.params.id, function(err, data) {
            if (err) {return res.status(500).send(err);}
            if (!data) {return res.status(404).end();}
            return res.status(200).send(data);
        });
    });

    router.put('/:id', isLoggedIn, function(req, res) {
        Model.findById(req.param.id, function(err, data) {
            if (err) {return res.status(500).send(err);}
            if(!data) {return res.status(404).end();}
            Model.fillDoc(data, req.body, function(err) {
                if (err) {res.status(500).send(err);}
                return res.status(200).send(data);
            });
        });
    });

    router.delete('/:id', isLoggedIn, function(req, res) {
        Model.findById(req.params.id, function(err, data) {
            if (err) {return res.status(500).send(err);}
            if (!data) {return res.status(404).end();}
            data.remove(function(err) {
                if (err) {return res.status(500).send(err);}
                return res.status(200).end();
            });
        });
    });

    return router;
}