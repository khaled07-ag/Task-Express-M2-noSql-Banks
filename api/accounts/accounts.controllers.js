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
    return res.status(201).json({data: newAccount});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error})
  }
};

exports.accountDelete = async (req, res) => {
  // const { accountId } = req.params;
  // const foundAccount = accounts.find((account) => account.id === +accountId);
  // if (foundAccount) {
  //   accounts = accounts.filter((account) => account.id !== +accountId);
  //   res.status(204).end();
  // } else {
  //   res.status(404).json({ message: 'Account not found' });
  // }
  try {
    const {accountId} = req.params;
    const deleteAccount = await accountsSchema.findByIdAndDelete(accountId);
    return res.status(204).json({message: "Account have been deleted."});
  } catch (error) {
    console.log(error)
    return res.status(404).json({error: error})
  }
};

exports.accountUpdate = async (req, res) => {
  // const { accountId } = req.params;
  // const foundAccount = accounts.find((account) => account.id === +accountId);
  // if (foundAccount) {
  //   foundAccount.funds = req.body.funds;
  //   res.status(204).end();
  // } else {
  //   res.status(404).json({ message: 'Account not found' });
  // }
  try {
    const {accountId} = req.params;
    const updateAccount = await accountsSchema.findByIdAndUpdate(accountId, req.body)
    if(!updateAccount){
      return res.status(404).json({error: "not found"})
    }
    return res.status(204).json({message:"account updated", data: updateAccount});
   
  } catch (error) {
    return res.status(500).json({error: error})
  }
};

exports.accountsGet = async (req, res) => {
  try {
    const accounts = await accountsSchema.find();
    return res.status(200).json({data: accounts});
  } catch (error) {
    console.log(error);
    return res.status(500)
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
