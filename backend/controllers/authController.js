const authModel = require('../models/authModel');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');
const config = require('../config/config');

const generateTokens = (userId, email) => {
    const payload = {
        userId,
        email
    };
    
    const accessToken = jwt.sign(payload, config.SECRET_ACCESS_KEY, {expiresIn: '1m'});
    const refreshToken = jwt.sign(payload, config.SECRET_REFRESH_KEY, {expiresIn: '30d'});

    return {accessToken, refreshToken};
}

const login = async(data) => {
    const user = await authModel.findOne({'authData.email': data.email});
    console.log('Получили с бд при проверке есть ли такой пользователь', user)
    if(!user){
        return {status: 401};
    }
    const isPassCorrect = await bcrypt.compare(data.password, user.authData.password);
    console.log('Проверили пароль - получили ответ', isPassCorrect)
    if(!isPassCorrect){
        return {status: 401};
    }
    const tokens = generateTokens(user.userID, data.email);
    const res = await authModel.findByIdAndUpdate(user._id, {isAuth: true, refreshToken: tokens.refreshToken});
    console.log('Обновили данные авторизации, ответ от БД', res);
    return {status: 200, payload: tokens};
}

const registration = async(data) => {
    const isUser = await userModel.findOne({email: data.email});
    if(isUser){
        return {status: 401, message: 'Такой пользователь уже зарегистрирован'};
    }
    const registerUser = await userModel.create({email: data.email});
    console.log('получаем из базы то, что пришло после регистрации в таблице Юзер', registerUser)
    if(!registerUser){
        return {status: 401, message: 'Произошла ошибка при регистрации'};
    }
    const hashPassword = await bcrypt.hash(data.password, 5);
    const tokens = generateTokens(registerUser._id, data.email);
    const forRegisterAuth = {
        userID: registerUser._id,
        authData: {email: data.email, password: hashPassword},
        refreshToken: tokens.refreshToken
    };
    const result = await authModel.create(forRegisterAuth);
    console.log('Что получили после регистрации в такблице АУС', result);
    if(result){
        return {status: 200, message: 'Успешная регистрация', payload: tokens};
    }
}

const chechRefresh = async(refreshToken) => {
    const isRefresh = await authModel.findOne({refreshToken});
    let result;
    try{
        
        console.log('Есть ли такой рефреш токен в базе ---- ', isRefresh);
       
        const isCorrectRefresh = jwt.verify(refreshToken, config.SECRET_REFRESH_KEY);
        console.log('Что получили после верифай жвт', isCorrectRefresh);
        result = generateTokens(isCorrectRefresh.userId, isCorrectRefresh.email);
        console.log('tokens ----- ', result);
        const isTrue = await authModel.findOneAndUpdate({userID: isCorrectRefresh.userId}, {refreshToken: result.refreshToken});
        console.log('Записалось ли в базу ---', isTrue)
        
    }catch(err){
        console.log('ошибка', err.message);
        await authModel.findByIdAndUpdate(isRefresh._id, {isAuth: false, refreshToken: ''});
        return {status: 401};
        
    }
        return result;
    
    
};

const logout = async(refreshToken) => {
    //переделать на трай кетч
    if(!jwt.verify(refreshToken, config.SECRET_REFRESH_KEY)){
        return {status: 'fail'};
    }
    const result = await authModel.findOneAndUpdate({refreshToken}, {isAuth: false, refreshToken: ''});
    console.log('Получаем из базы после обновления в Логаут', result)
    return {status: 200};
}

module.exports = {
    login,
    registration,
    chechRefresh,
    logout
}
