import { getStockById, registerUser, addToWatchList, buyStock } from '../controllers/apiController';
// apis is a function, which accepts an express app as input, and defines 
// HTTP CRUD handler(function) for this node express app.
const apis = (app) => {
    app.route('/stock/:stockId')
    .get(getStockById);

    app.route('/user/register')
    .post(registerUser);

    app.route('/watchlist/add')
    .post(addToWatchList);

    app.route('/buy')
    .post(buyStock);
}

export default apis;

