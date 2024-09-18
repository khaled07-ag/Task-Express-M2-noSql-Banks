let accounts = require('../../accounts');
const accountsSchema = require('../../models/accountsSchema');

exports.accountCreate = async (req, res) => {
  // const id = accounts[accounts.length - 1].id + 1;
  // const newAccount = { ...req.body, funds: 0, id };
  // accounts.push(newAccount);
  // res.status(201).json(newAccount);
  try {
    const accountInfo = req.body;
    const newAccount = await accountsSchema.create(accountInfo)
    return req.status(201).json({data: newAccount});
  } catch (error) {
    console.log(error);
    return req.status(500).json({error: error})
  }
};

exports.accountDelete = (req, res) => {
  const { accountId } = req.params;
  const foundAccount = accounts.find((account) => account.id === +accountId);
  if (foundAccount) {
    accounts = accounts.filter((account) => account.id !== +accountId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Account not found' });
  }
};

exports.accountUpdate = (req, res) => {
  const { accountId } = req.params;
  const foundAccount = accounts.find((account) => account.id === +accountId);
  if (foundAccount) {
    foundAccount.funds = req.body.funds;
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Account not found' });
  }
};

exports.accountsGet = async (req, res) => {
  try {
    const accounts = await accountsSchema.find();
    return req.status(200).json({data: accounts});
  } catch (error) {
    console.log(error);
    return req.status(500)
  }
};

exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === 'usd') {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(201).json(accountInUsd);
  }
  res.status(201).json(foundAccount);
};
