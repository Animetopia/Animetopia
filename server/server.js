const express = require('express');
// import path from 'path'
// const authController = require('./controllers/authController.js');
// const cookieParser = require('cookie-parser');

const PORT = 3000;

// using express
const app = express();
app.use(express.json());
// app.use(cookieParser());

// serving static files
app.use(express.static('views'));
app.use(express.static('assets'));


// these are our controllers that we will change goes in controller folder
  // app.get('/display', messageController.getMessages, (req, res)=>{
  //   console.log('res.locals.allMessages: ', res.locals.allMessages);
  //   return res.status(200).send(res.locals.allMessages);
  // });
  // app.post('/sendMessage', messageController.postMessage, authController.setCookie, (req, res)=>{
  //   return res.status(200).json(res.locals.newMessage);
  // });
  // app.delete('/delMessage/:_id', authController.checkCookie, messageController.deleteMessage, (req, res)=>{
  //   // return res.status(200).send(`Message deleted: ${res.locals.delMessage}`);
  //   return res.status(200).send('Message deleted');
  // });

// error handler
app.use((req, res)=>{
  return res.status(404).send('Error: Page Not Found');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: err.message },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log("ERROR: ", errorObj.log);
  const errorStatus = errorObj.status || 500;
  return res.status(errorStatus).send(errorObj.message);
});


app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));