const mysql = require('mysql2/promise')

async function transferAmount() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'w3_assignment',
  })

  try {
    await connection.beginTransaction()

    await connection.execute(
      'UPDATE account SET balance = balance - 1000 WHERE account_number = 101'
    )

    await connection.execute(
      'UPDATE account SET balance = balance + 1000 WHERE account_number = 102'
    )

    await connection.execute(
      'INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (?, ?, NOW(), ?)',
      [101, -1000.0, 'Transfer to 102']
    )

    await connection.execute(
      'INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (?, ?, NOW(), ?)',
      [102, 1000.0, 'Transfer from 101']
    )

    await connection.commit()
    console.log('transaction completed successfully.')
  } catch (error) {
    await connection.rollback()
    console.error('transaction failed, rolled back.', error)
  } finally {
    await connection.end()
  }
}

transferAmount()
