const { connectToDatabase } = require('./db')

async function transferFunds(fromAccNum, toAccNum, amount, remark) {
  const { db, client } = await connectToDatabase()

  try {
    const accounts = db.collection('accounts')

    const fromAccount = await accounts.findOne({ account_number: fromAccNum })

    if (!fromAccount) {
      throw new Error('Source account not found')
    }

    if (fromAccount.balance < amount) {
      throw new Error('Insufficient funds')
    }

    const toAccount = await accounts.findOne({ account_number: toAccNum })

    if (!toAccount) {
      throw new Error('Target account not found')
    }

    const nextChangeNumberFrom =
      (fromAccount.account_changes.at(-1)?.change_number || 0) + 1
    const nextChangeNumberTo =
      (toAccount.account_changes.at(-1)?.change_number || 0) + 1

    const changeFrom = {
      change_number: nextChangeNumberFrom,
      amount: -amount,
      changed_date: new Date(),
      remark,
    }

    const changeTo = {
      change_number: nextChangeNumberTo,
      amount: amount,
      changed_date: new Date(),
      remark,
    }

    await accounts.updateOne(
      { account_number: fromAccNum },
      {
        $inc: { balance: -amount },
        $push: { account_changes: changeFrom },
      }
    )

    await accounts.updateOne(
      { account_number: toAccNum },
      {
        $inc: { balance: amount },
        $push: { account_changes: changeTo },
      }
    )

    console.log(`Transferred ${amount} from ${fromAccNum} to ${toAccNum}.`)
  } catch (err) {
    console.error('Transfer failed:', err.message)
  } finally {
    await client.close()
  }
}

module.exports = transferFunds
