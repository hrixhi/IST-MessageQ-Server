// const AMQPClient = require('amqp10').Client;
// const Policy = require('amqp10').Policy;

// let client = new AMQPClient(Policy.merge({
//     senderLinkPolicy: {
//         callbackPolicy: Policy.Utils.SenderCallbackPolicies.OnSent
//     }
// }, Policy.DefaultPolicy));

// const connectionString = 'amqp+ssl://b-89fe54b9-21ea-4455-ade6-a67dbcbec4a7-1.mq.us-east-1.amazonaws.com:5671'

// client.connect(connectionString, {
//             'saslMechanism': 'ANONYMOUS'
//         })
//         .then(function() {
//             console.log("Connected");
//             return Promise.all([
//                 client.createSender(queueName)
//             ]);
//         })
//         .spread(function(sender) {
//             sender.on('errorReceived', function(tx_err) {
//                 console.warn('===> TX ERROR: ', tx_err);
//                 return err;
//             });
//             var options = {
//                 annotations: {
//                     'x-opt-partition-key': 'pk' + msgValue
//                 }
//             };
//             return sender.send(JSON.stringify(msgValue), 
// options).then(function(state) {
//                 client.disconnect().then(function() {
//                     console.log('disconnected, when we saw the value we inserted after publish to AWS MQ.');
//                     return state;
//                 });
//             });
//         })
//         .error(function(e) {
//             console.warn('connection error: ', e);
//             return err;
//         });


var zmq = require("zeromq");
var socket = zmq.socket("rep");

// Begin listening for connections on all IP addresses on port 9998.
socket.bind("tcp://*:9998", function (error) {
    if (error) {
        console.log("Failed to bind socket: " + error.message);
        process.exit(0);
    }
    else {
        console.log("Server listening on port 9998");
    }
});

// When a message is received from a client, send it to all client instances.
socket.on("message", function (message) {
    // Convert the message into a string and log to the console.
    console.log(JSON.parse(message));
    socket.send(message);
});

// context.publisher.send({obj});

// // API <------> ZeroMQ <----> API

// //             ZERO MQ SERVER 
// //            /     |       \
// //         A       B        C
// //        /|\     /|\      /|\
// //