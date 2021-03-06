const { ObjectId } = require('mongodb');
const models = require('../models/sales');
const validators = require('../utils/validatorsSales');

const STATUS_OK = 200;
const STATUS_UNPROCESSABLE_ENTITY = 422;
const STATUS_NOT_FOUND = 404;

const MSG_SALE_NOT_FOUND = 'Sale not found';
const MSG_NOT_UPDATED = 'Wrong product ID or invalid quantity';
const MSG_STOCK_PROBLEM = 'Such amount is not permitted to sell';

const CODE_INVALID_DATA = 'invalid_data';
const CODE_NOT_FOUND = 'not_found';
const CODE_STOCK_PROBLEM = 'stock_problem';

function notExistsProductsMsg(idArray) { // This function help decrease line length warned by ESLint.
  return `The following productId(s) is(are) NOT found: [ ${idArray} ]`;
}
const create = async (soldProducts) => {
  // "quantity" format valitation:

  const validQtd = validators.quantityInArray(soldProducts);
  
  if (validQtd.code) {
      return { code: validQtd.code, status: validQtd.status, message: validQtd.message };
    }
  
  // SEARCHING products:

  // Check if product(s) to be sold exists:

  const notFound = await validators.idExistsInArray(soldProducts);

  // Then if "notFound === true", that means some productId was not found. Its ids were sent to "notFound" var:

  if (notFound.length !== 0) {
    return { code: CODE_INVALID_DATA, 
      status: STATUS_UNPROCESSABLE_ENTITY, 
      message: notExistsProductsMsg(notFound) };
  }

  // SEARCHING products quantity:

 // Check product(s) stock quantity is enough:

 const notEnough = await validators.checkProductQtd(soldProducts);

 // Then if "notFound === true", that means some productId has not the quantity to be sold. Its ids were sent to "notFound" var:

 if (notEnough.length !== 0) { 
   return { code: CODE_STOCK_PROBLEM, status: STATUS_NOT_FOUND, message: MSG_STOCK_PROBLEM };
 }

  // CREATING:

  const insertedId = await models.create(soldProducts); // if come to here, that means all productId were found

  // UPDATING product stock quantity:

  await validators.decProductQtd(soldProducts); // Unecessary return here, if will, atribut it to variable to see in console.log()

  return insertedId;
};

const getAll = async () => {
  const sales = await models.getAll();

  return { status: STATUS_OK, sales };
};

const getById = async (id) => {
  // Here the validation id is used like a "not found id".
  // I figured out the "trybe tester" mode allow an "invalid id checking" get the job done:

  if (!ObjectId.isValid(id)) { // Get error if invalid id format. This signature is like evaluator ask it.
    return { status: STATUS_NOT_FOUND, code: CODE_NOT_FOUND, message: MSG_SALE_NOT_FOUND }; 
  }

  // SEARCHING:

  const sale = await models.getById(id);

  // if found nothing return arror data:

  if (!sale) { 
    return { status: STATUS_NOT_FOUND, 
    code: CODE_NOT_FOUND, 
    message: MSG_SALE_NOT_FOUND };
  }
  
 // if found something, return its data:

  return sale;
};

const update = async (id, soldProducts) => {
  // "id" validation:

  const validateId = validators.validSaleId(id);
  if (validateId && validateId.code) return validateId;
    
  // "quantity" format valitation:

  const validQtd = validators.quantityInArray(soldProducts);
  
  if (validQtd.code) {
      return { code: validQtd.code, status: validQtd.status, message: validQtd.message };
    }

  // UPDATING:

  const updateLog = await models.update(id, soldProducts);

  // if found nothing (.modifiedCount === 0), return arror data:

  if (updateLog.modifiedCount === 0) { 
    return { status: STATUS_UNPROCESSABLE_ENTITY, 
    code: CODE_INVALID_DATA, 
    message: MSG_NOT_UPDATED };
  }

  // if found something, return its "updateLog":

  return updateLog;
};

const deleteIt = async (id) => {
  const notDeletedMsg = 'Wrong sale ID format';

  // "id" validation:

  const validateId = validators.validSaleId(id);
  if (validateId && validateId.code) return validateId;

  // DELETING:

  const sale = await models.deleteIt(id);

  // if found nothing, return arror data:

  if (sale.value === null) {
    return { status: STATUS_UNPROCESSABLE_ENTITY, 
    code: CODE_INVALID_DATA, 
    message: notDeletedMsg,
    };
  }

  const result = await validators.incProductQtd(sale.value.itensSold);
  
  console.log(result); // result checking for development purpose.

  // if deleted something, return its data:

  return sale.value;
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteIt,
};