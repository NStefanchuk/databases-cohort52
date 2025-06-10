const setupAccounts = require('./setup');
const transferFunds = require('./transfer');

async function main() {
  await setupAccounts();
  await transferFunds(101, 102, 1000, 'Rent payment');
}

main();
