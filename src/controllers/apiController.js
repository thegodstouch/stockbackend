import google from 'google-finance-data';
import mongoose from 'mongoose';
import { UserSchema } from '../models/model';

// You can think of User as a reference to 'Users' collection
const User = mongoose.model('Users', UserSchema);

export const getStockById = (req, res) => {
    google.getSymbol(req.params.stockId)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.send(err);
    })
}

export const registerUser = (req, res) => {
    let newUser = new User(req.body);
    newUser.save((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
}

export const addToWatchList = (req, res) => {
    // req body should contain email & stockId
    User.findOne({email: req.body.email}, (error, doc) => {
        if (error) {
            res.send(error);
        }
        let stock = req.body.stockId;
        if (stock && doc.watchList.indexOf(stock) < 0) {
            doc.watchList.push(req.body.stockId);
        }
        doc.save();
        res.send(doc);
    })
}

export const buyStock = (req, res) => { // Now only supports limit order
    // { email, stockId, shares, limit price}
    User.findOne({email: req.body.email}, (error, doc) => {
        if (error) {
            res.send(error);
        }
        let stock = req.body.stockId;
        if (!stock) {
            res.send('Please provide a stock to buy');
        }
        if (req.body.stockId && req.body.shares && req.body.price) {
            let shares = Number(req.body.shares)
            let limitPrice = Number(req.body.price)
            
            let cost = shares * limitPrice;
            if (doc.fund < cost) {
                res.send('{ success: false, reason: insufficient fund}');
                return;
            }
            doc.fund -= cost;
            let curShares = doc.portfolio.get(stock);

            if (curShares) {
                doc.portfolio.set(stock, shares + curShares);
            } else {
                doc.portfolio.set(stock, shares);
            }

        }
        doc.save();
        res.send(doc);
    })
}
