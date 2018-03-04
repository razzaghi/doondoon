import Game2048 from '../models/game2048.model';

/**
 * Load user and append to req.
 */
function load(req, res, next, username) {
  Game2048.getByUsername(username)
    .then((gameUser) => {
      req.gameUser = gameUser; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get gameUser
 * @returns {Game2048}
 */
function get(req, res) {
  return res.json(req.gameUser);
}

/**
 * Create new gameUser
 * @property {string} req.body.gameUsername - The gameUsername of gameUser.
 * @property {string} req.body.mobileNumber - The mobileNumber of gameUser.
 * @returns {Game2048}
 */
function create(req, res, next) {
  const gameUser = new Game2048({
    username: req.body.username,
    displayName: req.body.displayName,
    point: req.body.point,
  });

  gameUser.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

function createOrUpdate(req, res, next) {
  let game2048 = null;

  Game2048.getByUsername(req.body.username)
    .then((gameUser) => {
      game2048 = gameUser; // eslint-disable-line no-param-reassign
      game2048.point = req.body.point;
      game2048.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
    })
    .catch(() => {
      game2048 = new Game2048({
        username: req.body.username,
        displayName: req.body.displayName,
        point: req.body.point,
      });
      game2048.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
    });
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {Game2048}
 */
function update(req, res, next) {
  const game2048 = req.user;
  game2048.username = req.body.username;
  game2048.displayName = req.body.displayName;
  game2048.point = req.body.point;

  game2048.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Game2048[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Game2048.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {Game2048}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, createOrUpdate };
