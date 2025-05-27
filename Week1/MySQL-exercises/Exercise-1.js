import mysql from 'mysql2/promise'

async function setupDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
  })

  try {
    await connection.query('DROP DATABASE IF EXISTS meetup')
    await connection.query('CREATE DATABASE meetup')
    console.log('Database meetup created')

    await connection.changeUser({ database: 'meetup' })

    const createInvitee = `
      CREATE TABLE Invitee (
        invitee_no INT PRIMARY KEY,
        invitee_name VARCHAR(50) NOT NULL,
        invited_by INT
);
    `
    const createRoom = `
      CREATE TABLE Room (
        room_no INT PRIMARY KEY,
        room_name VARCHAR(50) NOT NULL,
        floor_number INT NOT NULL
      );
    `
    const createMeeting = `
      CREATE TABLE Meeting (
        meeting_no INT PRIMARY KEY,
        meeting_title VARCHAR(100) NOT NULL,
        starting_time DATETIME NOT NULL,
        ending_time DATETIME NOT NULL,
        room_no INT NOT NULL,
        FOREIGN KEY (room_no) REFERENCES Room(room_no)
      );
    `

    await connection.query(createInvitee)
    await connection.query(createRoom)
    await connection.query(createMeeting)

    const insertInvitee = `
      INSERT INTO Invitee VALUES
      (1, 'Natalia', NULL),
      (2, 'Ivan', 1),
      (3, 'Roman', 2),
      (4, 'Vera', 1),
      (5, 'Nadia', 3);
    `
    const insertRoom = `
      INSERT INTO Room VALUES
      (1, 'Orion', 1),
      (2, 'Pegasus', 2),
      (3, 'Lyra', 1),
      (4, 'Andromeda', 3),
      (5, 'Phoenix', 2);
    `
    const insertMeeting = `
      INSERT INTO Meeting VALUES
      (1, 'Team sync', '2025-05-18 10:00:00', '2025-05-18 11:00:00', 1),
      (2, 'Design review', '2025-05-19 11:30:00', '2025-05-19 12:30:00', 2),
      (3, 'Lunch talk', '2025-05-20 13:00:00', '2025-05-20 14:00:00', 3),
      (4, 'Workshop', '2025-05-21 14:30:00', '2025-05-21 16:00:00', 4),
      (5, 'Retro', '2025-05-22 16:30:00', '2025-05-22 17:30:00', 5);
    `

    await connection.query(insertInvitee)
    await connection.query(insertRoom)
    await connection.query(insertMeeting)

    console.log('Tables created and data inserted')
  } catch (err) {
    console.error('Error:', err.message)
  } finally {
    await connection.end()
  }
}

setupDatabase()
