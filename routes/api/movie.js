import express from 'express';
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

const file = join(__dirname, '../../db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

// Read data from JSON file, this will set db.data content
await db.read()

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  async (req, res) => {
    var newBook = {
      overview: req.body.overview,
      poster_path: req.body.posterPath,
      title: req.body.title,
    }
    var books = db.data.books;
    var newbooks = [newBook, ...books]
    db.data.books = newbooks;
    db.write();
    res.json("success");
  }
);

router.get(
  '/',
  async (req, res) => {
  res.json(db.data.books);
  }
);

router.delete(
  '/:id',
  async (req, res) => {
    var newbooks = db.data.books;
    newbooks.splice(Number(req.params.id), 1)
    db.data.books = newbooks;
    db.write();
    res.json("success");
  }
);

export default router;