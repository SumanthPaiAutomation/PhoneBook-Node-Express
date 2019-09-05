const db = require('../models');
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
  try {
    const user = await db.User.create(req.body);
    const { id, username } = user;
    const token = jwt.sign({ id, username }, process.env.SECRET);

    return res.status(201).json({
      id,
      username,
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = 'Sorry, that username is already taken';
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      username: req.body.username,
    });
    const { id, username } = user;
    const valid = await user.comparePassword(req.body.password);

    if (valid) {
      const token = jwt.sign({ id, username }, process.env.SECRET);
      return res.status(200).json({
        id,
        username,
        token,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    return next({ status: 400, message: 'Invalid Username/Password' });
  }
};

exports.getUsers = async (req, res, next) => {
    const pagination = req.query.pagination?parseInt(req.query.pagination):10;//10 contacts is default display
    const page = req.query.page? parseInt(req.query.page):1;
    try {
        const userId = req.params.id;
      const users = await db.User.findById(userId).skip((page-1)*pagination).limit(pagination).populate('users');
      return res.status(200).json(users);
    }
    
    catch (err) {
      return next({
        status: 400,
        message: err.message,
      });
    }
    

};

exports.createUser = async (req, res, next) => {
    const pagination = req.query.pagination?parseInt(req.query.pagination):10;//10 contacts is default display
    const page = req.query.page? parseInt(req.query.page):1;
    try {
        const userId = req.params.id;
        const data = req.body;
        const userdata = Object.assign(userId,data);
        db.User.insertOne(userdata).skip((page-1)*pagination).limit(pagination).populate('users');; 
      return res.status(200).json(userdata);
    }
    
    catch (err) {
      return next({
        status: 400,
        message: err.message,
      });
    }
    

};

exports.updateUser = async (req, res, next) => {
    const pagination = req.query.pagination?parseInt(req.query.pagination):10;//10 contacts is default display
    const page = req.query.page? parseInt(req.query.page):1;
    try {
        const userId = req.params.id;
        const data = req.body;
        const users = await db.User.updateOne({ id: userId },{$set:data},{new:true}).skip((page-1)*pagination).limit(pagination).populate('');

      return res.status(200).json(users);
    }
    
    catch (err) {
      return next({
        status: 400,
        message: err.message,
      });
    }
    

};

exports.deleteUser = async (req, res, next) => {
    const pagination = req.query.pagination?parseInt(req.query.pagination):10;//10 contacts is default display
    const page = req.query.page? parseInt(req.query.page):1;
    try {
        const userId = req.params.id;
      const users = await db.User.deleteOne({ id : userId }).skip((page-1)*pagination).limit(pagination).populate('users');
      return res.status(200).json(users);
    }
    
    catch (err) {
      return next({
        status: 400,
        message: err.message,
      });
    }
    

};
