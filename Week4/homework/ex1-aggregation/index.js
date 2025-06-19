const { MongoClient } = require('mongodb')
const csv = require('csvtojson')
require('dotenv').config()

async function run() {
  const client = new MongoClient(process.env.MONGODB_URL)

  try {
    await client.connect()
    const db = client.db('databaseWeek4')
    const populationCollection = db.collection('population')

    const data = await csv({ checkType: true }).fromFile(
      'population_pyramid_1950-2022.csv'
    )

    await populationCollection.deleteMany({})
    await populationCollection.insertMany(data)

    const byYear = await populationCollection
      .aggregate([
        { $match: { Country: 'Netherlands' } },
        {
          $group: {
            _id: '$Year',
            countPopulation: { $sum: { $add: ['$M', '$F'] } },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray()

    console.log(byYear)

    const continents = await populationCollection
      .aggregate([
        {
          $match: {
            Country: { $regex: /^[A-Z\s]+$/ },
            Year: 2020,
            Age: '100+',
          },
        },
        {
          $project: {
            Country: 1,
            Year: 1,
            Age: 1,
            M: 1,
            F: 1,
            TotalPopulation: { $add: ['$M', '$F'] },
          },
        },
      ])
      .toArray()

    console.log(continents)
  } catch (err) {
    console.error('Error occurred during population aggregation script:', err)
  } finally {
    await client.close()
  }
}

run()
