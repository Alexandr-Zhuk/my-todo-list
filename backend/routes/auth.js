const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authController = require('../controllers/authController');

const pathUp = path.join(__dirname + '/../public/uploads');
const upload = multer({dest: pathUp});

// /auth/login
router.post('/login', upload.none(), async(req, res)=>{
    const data = req.body;
    console.log('Пришли данные с фронта на авторизацию', data)
    const result = await authController.login(data);
    if(result.status === 401){
        res.json({status: 401, message: 'Неверно введены данные пользователя'});
    }
    if(result.status === 200){
        res.cookie('refreshToken', result.payload.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        res.json({status: 200, message: 'Успешная авторизация', accessToken: result.payload.accessToken});
    }
});

// /auth/registration
router.post('/registration', upload.none(), async(req, res) => {
    const data = req.body;
    console.log(data);
    const result = await authController.registration(data);
    if(result.status === 401){
        res.json({status: 401, message: result.message});
    }
    if(result.status === 200){
        res.cookie('refreshToken', result.payload.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        res.json({status: 200, message: result.message});
    }
});

// /auth/logout
router.get('/logout', async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const result = await authController.logout(refreshToken);
    if(result.status === 'fail'){
        res.json({status: 'fail', message: 'Провал'});
    }
    if(result.status === 200){
        res.clearCookie('refreshToken');
        res.json({status: 200, message: 'Успешно вышли из аккаунта'});
    }
});

// /auth/refresh
router.get('/refresh', async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log('получили рефреш токен в рефреш роуте', refreshToken);
    const tokens = await authController.chechRefresh(refreshToken);
    console.log('получаем в рефреш из контроллера', tokens)
    if(tokens.status){
        res.clearCookie('refreshToken');
        res.json({status: 401});
    }
    if(tokens.accessToken){
        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        res.json({status: 200, accessToken: tokens.accessToken});
    }
});

module.exports = router;