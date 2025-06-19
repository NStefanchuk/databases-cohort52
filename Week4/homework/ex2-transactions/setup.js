const { connectToDatabase } = require('./db')

async function setupAccounts() {
  const { db, client } = await connectToDatabase()

  try {
    const accounts = db.collection('accounts')

    await accounts.deleteMany({})
    await accounts.insertMany([
      { account_number: 101, balance: 5000, account_changes: [] },
      { account_number: 102, balance: 2000, account_changes: [] },
    ])

    console.log('Accounts collection initialized.')
  } catch (err) {
    console.error('Error in setupAccounts:', err)
  } finally {
    await client.close()
  }
}

module.exports = setupAccounts
