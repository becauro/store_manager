const { ObjectId } = require('mongodb');
const models = require('../models/sales');
const validators = require('../utils/validatorsSales');

const OK = 200;
const UNPROCESSABLE_ENTITY = 422;
const STATUS_NOT_FOUND = 404;

// const MSG_INVALID_ID = 'invalid_id_format';
const MSG_SALE_NOT_FOUND = 'Sale not found';

const CODE = 'invalid_data';
const CODE_NOT_FOUND = 'not_found';

const create = async (soldProducts) => {
  function notExistsProductsMsg(idArray) {
    return `The following productId(s) is(are) found: [ ${idArray} ]`;
  }
  
  // Quantity format valitation

  const validQtd = validators.quantityInArray(soldProducts);
  
  if (validQtd.code) {
      return { code: validQtd.code, status: validQtd.status, message: validQtd.message };
    }
    
  // Id format validation

  // if (!ObjectId.isValid(id)) { // Get error if invalid id format
  //   return { status: UNPROCESSABLE_ENTITY, code: CODE, message: notDeletedMsg }; 
  // }
 
  // Check if product already exists

  const found = await validators.idExistsInArray(soldProducts);

  if (found.length !== 0) { // if true that means some productId was not found
    return { code: CODE, status: UNPROCESSABLE_ENTITY, message: notExistsProductsMsg(found) };
  }
 
    // CREATING in 3, 2, 1 ........ 

  const insertedId = await models.create(soldProducts); // if come here, thas means all productId were found
  return insertedId;
};

const getAll = async () => {
  const sales = await models.getAll();

  return { status: OK, sales };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) { // Get error if invalid id format. This signature is like evaluator ask it.
    return { status: STATUS_NOT_FOUND, code: CODE_NOT_FOUND, message: MSG_SALE_NOT_FOUND }; 
  }

  const sale = await models.getById(id);

  // Get the SAME error if invalid id is not found:
  if (!sale) { 
    return { status: STATUS_NOT_FOUND, 
    code: CODE_NOT_FOUND, 
    message: MSG_SALE_NOT_FOUND };
  }
  
  return sale;
};

const update = async (id, soldProducts) => {
const MSG_NOT_UPDATED = 'Wrong product ID or invalid quantity';

  if (!ObjectId.isValid(id)) { // Get error if invalid id format. This signature is like evaluator ask it.
    return { status: STATUS_NOT_FOUND, code: CODE_NOT_FOUND, message: MSG_SALE_NOT_FOUND }; 
  }
    
  // Quantity format valitation

  const validQtd = validators.quantityInArray(soldProducts);
  
  if (validQtd.code) {
      return { code: validQtd.code, status: validQtd.status, message: validQtd.message };
    }

  // UPDATING in 3, 2, 1 ........ 

  const updateLog = await models.update(id, soldProducts);

  if (updateLog.modifiedCount === 0) { 
    return { status: UNPROCESSABLE_ENTITY, 
    code: CODE, 
    message: MSG_NOT_UPDATED };
  }

  return updateLog;
};

// const deleteIt = async (id) => {
//   const notDeletedMsg = 'Wrong id format';
//   const errorDeleteMsg = 'Ops!, Item not deleted';

//   // Searching

//   if (!ObjectId.isValid(id)) { // Get error if invalid id format
//     return { status: UNPROCESSABLE_ENTITY, code: CODE, message: notDeletedMsg }; 
//   }

//   const sale = await models.getById(id);

//   //  // DEBUG:
//   //  console.log('SERVICES: retorno sale:');
//   //  console.log(sale);

//   // Get the SAME error if invalid id was not found:
//   if (!sale) { 
//     return { status: UNPROCESSABLE_ENTITY, 
//     code: CODE, 
//     message: notDeletedMsg };
//   }
  
//   // Deleting
 
//   const deleteLog = await models.deleteIt(id);

//   if (deleteLog.deletedCount === 0) { 
//     return { status: UNPROCESSABLE_ENTITY, 
//     code: CODE, 
//     message: errorDeleteMsg };
//   }

//   // // DEBUG:
//   //   console.log('SERVICES: retorno deleteLog:');
//   //   console.log(deleteLog);

//   return sale;
// };

module.exports = {
    create,
    getAll,
    getById,
    update,
    // deleteIt,
};