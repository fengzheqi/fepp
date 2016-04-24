/**
 * Created by zheqi on 2016/1/22.
 */

'use strict';

var mongoose        = require('mongoose'),
    findOrCreate    = require('mongoose-findOrCreate'),
    bcrypt          = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    firstName:      {type: String},     //姓
    lastName:       {type: String},     //名字
    email:          {type: String},     //电子邮件
    password:       {type: String},     //密码
    emailConfirm:   Boolean,            //邮件是否验证
    emailKey:       String,             //邮件验证码
    sessioncache:   String              //会话缓存
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(findOrCreate);

mongoose.model('User', userSchema);

