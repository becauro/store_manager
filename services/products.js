const models = require('../models/products');
const validators = require('../utils/validators');

const STATUS_OK = 200;
const STATUS_UNPROCESSABLE_ENTITY = 422;
const CODE_INVALID_DATA = 'invalid_data';
const MSG_WRONG_ID = 'Wrong id format';

const create = async (name, quantity) => {
  const existsMsg = 'Product already exists';
  
  // "quantity" format valitation
  
  const validQtd = validators.quantity(quantity);

  if (validQtd.code) {
    return { code: validQtd.code, status: validQtd.status, message: validQtd.message };
  }

  // "name" format valitation

  const validName = validators.name(name);
  
  if (validName.code) {
    return { code: validName.code, status: validName.status, message: validName.message };
  }
  
  // Check if product name already exist in database.

  const found = await validators.areadyExists(name, existsMsg);

  if (found.code) {
    return { code: found.code, status: found.status, message: found.message };
  }
 
  // CREATING

  const insertedId = await models.create(name, quantity);
  return insertedId;
};

const getAll = async () => {
  const productS = await models.getAll();

  return { status: STATUS_OK, productS };
};

const getById = async (id) => {
  // id validation:
  
   const validateId = validators.validProductId(id);
   if (validateId && validateId.code) return validateId;

  // SEARCHING:

  const product = await models.getById(id);

  // if found nothing, return arror data:

  if (!product) { 
    return { status: STATUS_UNPROCESSABLE_ENTITY, 
    code: CODE_INVALID_DATA, 
    message: MSG_WRONG_ID };
  }
  
 // if found something, return its data:

  return product;
};

const update = async (id, name, quantity) => {
  const notUpdated = 'Ops! nothing updated';
  
  // quantity format valitation
  
  const validQtd = validators.quantity(quantity);
  
  if (validQtd.code) {
    return { code: validQtd.code, status: validQtd.status, message: validQtd.message };
  }
  
  // name format valitation
  
  const validName = validators.name(name);

  if (validName.code) {
    return { code: validName.code, status: validName.status, message: validName.message };
  }
 
  // UPDATING:

  const updateLog = await models.update(id, name, quantity);

  // if found nothing (.modifiedCount === 0), return arror data:

  if (updateLog.modifiedCount === 0) { 
    return { status: STATUS_UNPROCESSABLE_ENTITY, 
    code: CODE_INVALID_DATA, 
    message: notUpdated };
  }

// if found something, return its "updateLog":

  return updateLog;
};

const deleteIt = async (id) => {
  const notDeletedMsg = 'Wrong id format';

  // id validation:
  
  const validateId = validators.validProductId(id);
  if (validateId && validateId.code) return validateId;
  
   // DELETING
  
  const product = await models.deleteIt(id);

  // if found nothing, return arror data:

  if (product.value === null) { 
    return { status: STATUS_UNPROCESSABLE_ENTITY, 
    code: CODE_INVALID_DATA,
    message: notDeletedMsg };
  }
 
  // if deleted something, return its data:

  return product.value;
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteIt,
};