import mysql from 'mysql2/promise';

async function setupResearchTables() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
  });

  try {
    await connection.changeUser({ database: 'week_2_assignment' });

    await connection.query(`
      CREATE TABLE research_Papers (
        paper_id INT AUTO_INCREMENT PRIMARY KEY,
        paper_title VARCHAR(100),
        conference VARCHAR(100),
        publish_date DATE
      )
    `);
    console.log('research_Papers created');

    await connection.query(`
      CREATE TABLE authorPapers (
        author_id INT,
        paper_id INT,
        PRIMARY KEY (author_id, paper_id),
        FOREIGN KEY (author_id) REFERENCES authors(author_id),
        FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id)
      )
    `);
    console.log('authorPapers created');

    await connection.query(`
      INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) VALUES
      ('Albus Dumbledore', 'Hogwarts', '1881-07-01', 95, 'male', NULL),
      ('Minerva McGonagall', 'Hogwarts', '1935-10-04', 88, 'female', 1),
      ('Severus Snape', 'Hogwarts', '1960-01-09', 82, 'male', 1),
      ('Hermione Granger', 'Hogwarts', '1979-09-19', 75, 'female', 2),
      ('Harry Potter', 'Hogwarts', '1980-07-31', 60, 'male', 2),
      ('Ron Weasley', 'Hogwarts', '1980-03-01', 58, 'male', 3),
      ('Luna Lovegood', 'Ravenclaw Academy', '1981-02-13', 62, 'female', 1),
      ('Draco Malfoy', 'Durmstrang', '1980-06-05', 55, 'male', 3),
      ('Gellert Grindelwald', 'Durmstrang', '1883-01-01', 90, 'male', NULL),
      ('Bellatrix Lestrange', 'Dark Arts Institute', '1951-06-02', 70, 'female', 9),
      ('Lucius Malfoy', 'Dark Arts Institute', '1954-08-25', 66, 'male', 9),
      ('Remus Lupin', 'Werewolf Studies Centre', '1960-03-10', 72, 'male', 1),
      ('Sirius Black', 'Auror Academy', '1959-11-03', 69, 'male', 12),
      ('Nymphadora Tonks', 'Auror Academy', '1973-07-15', 61, 'female', 12),
      ('Horace Slughorn', 'Hogwarts', '1920-04-28', 85, 'male', NULL)
    `);
    console.log('Authors inserted');

    await connection.query(`
      INSERT INTO research_Papers (paper_title, conference, publish_date) VALUES
      ('Advanced Potion Brewing', 'MagicCon', '2005-10-01'),
      ('The Art of Transfiguration', 'SpellSymposium', '2008-03-15'),
      ('Defensive Spells and Their Ethics', 'DefenseConf', '2010-05-12'),
      ('Time-Turner Paradoxes', 'TimeMagic Summit', '2003-12-04'),
      ('Magical Creatures in Combat', 'BeastsConf', '2009-06-21'),
      ('Dark Marks and Symbolism', 'DarkArts Expo', '1998-11-11'),
      ('Occlumency in Modern Duels', 'MindShield Conference', '2007-09-18'),
      ('The Rise of the Phoenix Order', 'HistoryMagic', '2011-02-14'),
      ('Parseltongue: Language or Curse?', 'MysticLang', '2004-08-08'),
      ('House Elf Liberation', 'EqualityForum', '2013-04-26'),
      ('Unforgivable Curses: A Review', 'DarkLawCon', '2000-10-10'),
      ('Patronus Variations', 'LightMagic', '2012-01-01'),
      ('Hallows vs Horcruxes', 'RelicDebate', '2014-03-09'),
      ('Magical Law Reforms', 'WizengamotSummit', '2015-07-07'),
      ('Underwater Breathing Potions', 'TriwizardTalks', '2006-06-06'),
      ('Broomstick Upgrades 2.0', 'QuidTech', '2002-11-02'),
      ('Ghostly Communication', 'ParanormalMeet', '1999-09-09'),
      ('Love Potions & Consent', 'EthicsConf', '2016-02-14'),
      ('Advanced Duelling Theory', 'CombatCon', '2001-01-01'),
      ('Legilimency Ethics', 'MindMagic', '2008-08-08'),
      ('Animagus Transformation Risks', 'ShapeShiftConf', '2000-04-04'),
      ('Forbidden Forest Ecology', 'DarkNatureCon', '2010-10-10'),
      ('Polyjuice Potion Failures', 'PotionFails', '2005-05-05'),
      ('Apparition and Splinching', 'TeleportConf', '2007-07-07'),
      ('Memory Modification Techniques', 'MindEdit Forum', '2009-09-09'),
      ('Magical Education Gaps', 'EduWizCon', '2017-03-03'),
      ('Prophecies and Fate', 'MysticArts', '2011-11-11'),
      ('Wandlore Discoveries', 'CoreCraft', '2013-12-12'),
      ('Dementors and Depression', 'MentalMagic', '2001-05-05'),
      ('Runes and Ancient Scripts', 'ArcaneTextCon', '2006-06-16'),
      ('The Ethics of Invisibility', 'StealthMagicCon', '2012-08-08')
    `);
    console.log('papers inserted');

    await connection.query(`
      INSERT INTO authorPapers (author_id, paper_id) VALUES
      (1, 1), (2, 1), (3, 2), (4, 3), (5, 3),
      (3, 6), (6, 6), (9, 11), (10, 11), (11, 11),
      (4, 10), (5, 10), (12, 7), (13, 7),
      (7, 8), (8, 8), (1, 13), (2, 13),
      (14, 9), (6, 9), (12, 18), (13, 18),
      (4, 20), (5, 20), (15, 21), (3, 21),
      (7, 25), (8, 25), (10, 26), (11, 26),
      (12, 28), (13, 28), (14, 29), (1, 29),
      (2, 30), (3, 30)
    `);
    console.log('Author-paper relationships inserted');

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await connection.end();
    console.log('Connection closed');
  }
}

setupResearchTables();
