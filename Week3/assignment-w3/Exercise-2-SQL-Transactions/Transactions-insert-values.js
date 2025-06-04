const mysql = require('mysql2/promise')

async function insertValues() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'w3_assignment',
  })

  await connection.execute(`INSERT INTO account (account_number, balance) VALUES
    (101, 5000.00),
    (102, 3000.00)
  `)

  await connection.execute(`INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES
    (101, -500.00, NOW(), 'Initial debit'),
    (102,  500.00, NOW(), 'Initial credit')
  `)

  console.log('data inserted successfully')
  await connection.end()
}

insertValues()
