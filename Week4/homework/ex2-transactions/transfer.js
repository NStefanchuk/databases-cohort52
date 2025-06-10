const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'bank';

async function transferFunds(fromAccNum, toAccNum, amount, remark) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const accounts = db.collection('accounts');

    const fromAccount = await accounts.findOne({ account_number: fromAccNum });
    const toAccount = await accounts.findOne({ account_number: toAccNum });

    if (!fromAccount || !toAccount) throw new Error('Account not found');
    if (fromAccount.balance < amount) throw new Error('Insufficient funds');

    const nextChangeNumberFrom =
      (fromAccount.account_changes.at(-1)?.change_number || 0) + 1;
    const nextChangeNumberTo =
      (toAccount.account_changes.at(-1)?.change_number || 0) + 1;

    await accounts.updateOne(
      { account_number: fromAccNum },
      {
        $inc: { balance: -amount },
        $push: {
          account_changes: {
            change_number: nextChangeNumberFrom,
            amount: -amount,
            changed_date: new Date(),
            remark
          }
        }
      }
    );

    await accounts.updateOne(
      { account_number: toAccNum },
      {
        $inc: { balance: amount },
        $push: {
          account_changes: {
            change_number: nextChangeNumberTo,
            amount: amount,
            changed_date: new Date(),
            remark
          }
        }
      }
    );

    console.log(`Transferred ${amount} from ${fromAccNum} to ${toAccNum}.`);
  } catch (err) {
    console.error('Transfer failed:', err.message);
  } finally {
    await client.close();
  }
}

module.exports = transferFunds;
