import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import game2048Ctrl from '../controllers/game2048.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/game2048 - Get list of users */
  .get(game2048Ctrl.list)

  /** POST /api/game2048 - Create or Update */
  .post(validate(paramValidation.createGame2048), game2048Ctrl.createOrUpdate);

export default router;
