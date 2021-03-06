const router = require('express').Router();
const rescue = require('express-rescue');
const products = require('../services/products');

const CREATED = 201;
const OK = 200;

router.get('/', rescue(async (req, res) => {
    const result = await products.getAll();
        res.status(result.status).json({ products: [...result.productS] });
}));

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const result = await products.getById(id);
  
    if (result.code) {
        return res.status(result.status).json({
            err: {
                code: result.code,
                message: result.message,
            },
        });
    }

    const { _id, name, quantity } = result;

    res.status(200).json({ id: _id, name, quantity });
});

router.post('/', rescue(async (req, res) => {
const { name, quantity } = req.body;

    const result = await products.create(name, quantity);
   
    if (result.code) { 
        return res.status(result.status).json({
            err: {
                code: result.code,
                message: result.message,
            },
    });
}
    res.status(CREATED).json({ _id: result, name, quantity });
}));

router.put('/:id', rescue(async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    
        const updateLog = await products.update(id, name, quantity);

        if (updateLog.code) {
            return res.status(updateLog.status).json({
                err: {
                    code: updateLog.code,
                    message: updateLog.message,
                },
        });
    }
        res.status(OK).json({ id, name, quantity });
    }));

router.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params; 
  
  const result = await products.deleteIt(id);

    if (result.code) {
        return res.status(result.status).json({
            err: {
                code: result.code,
                message: result.message,
            },
    });
  }

  const { _id, name, quantity } = result;

  res.status(200).json({ id: _id, name, quantity });
}));

module.exports = router;