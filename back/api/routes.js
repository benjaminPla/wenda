import express from 'express';
import Product from '../db/index.js';

const router = express.Router();

const response = { ok: true, msg: '', body: {} };

router.get('/healthStatus', (req, res) => {
  response.ok = true;
  response.msg = 'ok';
  response.body = {};
  res.status(200).send(response);
});
router.get('/products', async (req, res) => {
  await Product.findAll()
    .then((data) => {
      response.ok = true;
      response.msg = 'List of products';
      response.body = data;
      res.status(200).send(response);
    })
    .catch(err => {
      response.ok = false;
      response.msg = 'Something went wrong';
      response.body = { err };
      res.status(400).send(response);
    });
});
router.post('/products', async (req, res) => {
  await Product.create(req.body)
    .then(() => {
      response.ok = true;
      response.msg = 'Product successfully created!';
      response.body = {};
      res.status(200).send(response);
    })
    .catch(err => {
      response.ok = false;
      response.msg = 'Something went wrong';
      response.body = {
        error: err.errors[0].message,
      };
      res.status(400).send(response);
    });
});
router.put('/products', async (req, res) => {
	const { id, payload } = req.body;
	await Product.update(payload, { where: { id } })
		.then(() => {
			response.ok = true;
			response.msg = `Product (id: ${id}) successfully updated`;
			response.body = {};
			res.status(200).send(response);
		})
		.catch(err => {
			response.ok = false;
			response.msg = 'Something went wrong';
			response.body = {
				error: err.errors[0].message,
			};
			res.status(400).send(response);
		});
});
router.delete('/products', async (req, res) => {
	const { id } = req.body;
	await Product.destroy({ where: { id } })
		.then(() => {
			response.ok = true;
			response.msg = `Product (id: ${id}) successfully deleted`;
			response.body = {};
			res.status(200).send(response);
		})
		.catch(err => {
			response.ok = false;
			response.msg = 'Something went wrong';
			response.body = {
				error: err.errors[0].message,
			};
			res.status(400).send(response);
		});
});
router.all('/*', (req, res) => {
  response.ok = false;
  response.msg = `Cannot ${req.method}: ${req.url}`;
	response.body = {};
  res.status(404).send(response);
});

export default router;
