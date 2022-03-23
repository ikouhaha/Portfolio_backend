// This file will define the API route handlers for Articles
const Router = require('koa-router');
// We are going to parse request bodies so import koa-bodyparser
const bodyParser = require('koa-bodyparser');

const model = require('../models/breeds');
// Since we are handling articles use a URI that begins with an appropriate path
const router = Router({ prefix: '/api/v1/breeds' });
const { validateBreed } = require('../controllers/validation')

// Temporarily define some random articles in an array.
// Later this will come from the DB.
// let articles = [
//  {title:'hello article', fullText:'some text here to fill the body',creationDate:null,editedDate:null,views:0},
//  {title:'another article', fullText:'again here is some text here to fill',creationDate:null,editedDate:null,views:0},
//  {title:'coventry university ', fullText:'some news about coventry university',creationDate:null,editedDate:null,views:0}
// ]; 


// Routes are needed to connect path endpoints to handler functions.
// When an Article id needs to be matched we use a pattern to match
// a named route parameter. Here the name of the parameter will be 'id'
// and we will define the pattern to match at least 1 numeral.

router.get('/', getAll);
router.post('/', bodyParser(), validateBreed, create);

router.get('/:id([0-9]{1,})', getById);
// router.put('/:id([0-9]{1,})',bodyParser(),updateArticle);
// router.del('/:id([0-9]{1,})', deleteArticle); 


async function getAll(ctx, next) {
  let articles = await model.getAll()
  if (articles) {
    ctx.body = articles
  }
}

async function getById(ctx) {
  let id = ctx.params.id
  console.log(id)
  let article = await model.getById(id)
  if (article) {
    ctx.body = article[0]
  }
}

async function create(ctx) {
  const body = ctx.request.body
  let result;
  if (Array.isArray(body)) {
    result = await model.addMany(body)
  } else {
    result = await model.add(body)
  }

  if (result) {
    ctx.status = 201
    ctx.body = result
  }
}

module.exports = router;


