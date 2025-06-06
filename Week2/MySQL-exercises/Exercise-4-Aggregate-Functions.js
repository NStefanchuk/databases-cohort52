import mysql from 'mysql2/promise';

async function runAggregates() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
  });

  try {
    await connection.changeUser({ database: 'week_2_assignment' });

    const [paperAuthorsCount] = await connection.query(`
      SELECT 
        rp.paper_title,
        COUNT(ap.author_id) AS num_authors
      FROM research_Papers rp
      LEFT JOIN authorPapers ap ON rp.paper_id = ap.paper_id
      GROUP BY rp.paper_title
    `);
    console.log('\n Number of authors per research paper:');
    console.table(paperAuthorsCount);

    const [femalePapersSum] = await connection.query(`
      SELECT 
        COUNT(ap.paper_id) AS Count
      FROM authors a
      JOIN authorPapers ap ON a.author_id = ap.author_id
      WHERE a.gender = 'female';
    `);
    console.log('\n Total research papers by female authors:');
    console.table(femalePapersSum);

    const [avgHIndexPerUni] = await connection.query(`
      SELECT 
        university,
        AVG(h_index) AS average_h_index
      FROM authors
      GROUP BY university
    `);
    console.log('\n Average h-index per university:');
    console.table(avgHIndexPerUni);

    const [paperSumPerUni] = await connection.query(`
      SELECT 
        a.university,
        COUNT(ap.paper_id) AS total_papers
      FROM authors a
      JOIN authorPapers ap ON a.author_id = ap.author_id
      GROUP BY a.university
    `);
    console.log('\n Total papers by authors per university:');
    console.table(paperSumPerUni);

    const [minMaxHIndexPerUni] = await connection.query(`
      SELECT 
        university,
        MIN(h_index) AS min_h_index,
        MAX(h_index) AS max_h_index
      FROM authors
      GROUP BY university
    `);
    console.log('\n Min and Max h-index per university:');
    console.table(minMaxHIndexPerUni);

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await connection.end();
    console.log('Connection closed');
  }
}

runAggregates();
