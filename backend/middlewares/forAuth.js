const jwt = require('jsonwebtoken');
const config = require('../config/config');

const secureMV = (req, res, next) => {
    const authData = req.headers.authorization;
    console.log('получили аус дата в секьюр МВ', authData)
    if(!authData){
        next(res.json({status: 401}));
    }
    const accessToken = authData.split(' ')[1];
    console.log('получили ексесс токен в секьюр МВ', accessToken)
    if(!accessToken){
        next(res.json({status: 401}));
    }
    try{
        const result = jwt.verify(accessToken, config.SECRET_ACCESS_KEY);
        console.log(result);
        if(result){
            next();
        }
    }catch(err){
        console.log('вошли в кетч');
        next(res.json({status: 401}));
    }
}

module.exports = secureMV;