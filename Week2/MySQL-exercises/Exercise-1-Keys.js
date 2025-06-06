import mysql from 'mysql2/promise'

async function setupAuthorsTable() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
  })

  try {
    await connection.query('DROP DATABASE IF EXISTS week_2_assignment')
    await connection.query('CREATE DATABASE week_2_assignment')
    await connection.changeUser({ database: 'week_2_assignment' })
    console.log('Database week_2_assignment created')

    await connection.query(`
      CREATE TABLE authors (
        author_id INT AUTO_INCREMENT PRIMARY KEY,
        author_name VARCHAR(100) NOT NULL,
        university VARCHAR(100) NOT NULL,
        date_of_birth DATE NOT NULL,
        h_index INT,
        gender ENUM('male', 'female', 'other') NOT NULL
      );
    `)
    console.log('Table authors created')

    await connection.query(`
      ALTER TABLE authors
      ADD COLUMN mentor INT,
      ADD FOREIGN KEY (mentor) REFERENCES authors(author_id);
    `)
    console.log('Column mentor added to authors with foreign key')
  } catch (err) {
    console.error('Error:', err.message)
  } finally {
    await connection.end()
    console.log('Connection closed')
  }
}

setupAuthorsTable()
