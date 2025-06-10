const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'bank';

async function setupAccounts() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const accounts = db.collection('accounts');

    await accounts.deleteMany({});

    await accounts.insertMany([
      {
        account_number: 101,
        balance: 5000,
        account_changes: []
      },
      {
        account_number: 102,
        balance: 2000,
        account_changes: []
      }
    ]);

    console.log('Accounts collection initialized.');
  } catch (err) {
    console.error('Error in setup:', err);
  } finally {
    await client.close();
  }
}

module.exports = setupAccounts;
