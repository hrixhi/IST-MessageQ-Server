// const AMQPClient = require('amqp10').Client;
// const Policy = require('amqp10').Policy;

//  let client = new AMQPClient(Policy.Utils.RenewOnSettle(1, 1, 
// Policy.ServiceBusQueue));
//       let connectionString = 'your_connnection_string';
//       client.connect(connectionString)
//           .then(function() {
//               console.log("Connected");
//               return Promise.all([

// client.createReceiver(configurationHolder.config.getMessageQueueName)
//               ]);
//           })
//           .spread(function(receiver) {
//                   receiver.on('errorReceived', function(rx_err) {
//                       console.warn('===> RX ERROR: ', rx_err);
//                       return err;
//                   });
//                   receiver.on('message', function(message) {
//                       client.disconnect().then(function() {
//                       console.log('disconnected, when we get the message from the queue');
//                       return message.body;
//                   });
//               });
//           })
//           .error(function(e) {
//                   console.warn('connection error: ', e);
//                   return err;
//               });


var zmq = require("zeromq");
var socket = zmq.socket("req");

// Add a callback for the event that is invoked when we receive a message.
socket.on("message", function (message) {
    console.log(JSON.parse(message))
});

// Connect to the server instance.
socket.connect('tcp://127.0.0.1:9998');

socket.send(JSON.stringify({name: 'hrishi'}))