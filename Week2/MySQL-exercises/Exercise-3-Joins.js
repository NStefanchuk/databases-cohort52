import mysql from 'mysql2/promise';

async function runJoins() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
  });

  try {
    await connection.changeUser({ database: 'week_2_assignment' });

    const [authorsWithMentors] = await connection.query(`
      SELECT 
        a.author_name AS author,
        m.author_name AS mentor
      FROM authors a
      LEFT JOIN authors m ON a.mentor = m.author_id
    `);
    console.log('\nAuthors and their mentors:');
    console.table(authorsWithMentors);

    const [authorsWithPapers] = await connection.query(`
      SELECT 
        a.*,
        rp.paper_title
      FROM authors a
      LEFT JOIN authorPapers ap ON a.author_id = ap.author_id
      LEFT JOIN research_Papers rp ON ap.paper_id = rp.paper_id
    `);
    console.log('\nAuthors and their research papers:');
    console.table(authorsWithPapers);

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await connection.end();
    console.log('Connection closed');
  }
}

runJoins();
