const {Kafka} = require('kafkajs');

const kafa = new Kafka({
  clientId: 'wallet-app',
  brokers: ['localhost:9092'],
});
module.exports = kafa;