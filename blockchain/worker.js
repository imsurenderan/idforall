/* eslint-disable no-console */
const {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} = require("@aws-sdk/client-sqs");
require("dotenv").config();
const axios = require("axios");

const sqs = new SQSClient({
  // apiVersion: process.env.AWS_API_VERSION,
  credentials: {
    accessKeyId: process.env.SQS_ACCESS_KEY,
    secretAccessKey: process.env.SQS_SECRET_ACCESS_KEY,
  },
  region: process.env.SQS_REGION,
});
const contract = require("./contract");

// eslint-disable-next-line no-unused-vars
const send = async (messageBody, messageAttributes = {}, groupId = "main") => {
  const input = new SendMessageCommand({
    QueueUrl: process.env.SQS_QUEUE_URL,
    MessageBody: messageBody,
    MessageAttributes: messageAttributes,
  });
  const data = await sqs.send(input);
  console.log(`Message ${data.MessageId} placed in the Queue`);
  return data;
};

const sendDeleteLetter = async (messageBody, messageAttributes = {}) => {
  const input = new SendMessageCommand({
    QueueUrl: process.env.SQS_QUEUE_URL_DELETE_LETTER,
    MessageBody: messageBody,
    MessageAttributes: messageAttributes,
  });
  const data = await sqs.send(input);

  console.log(`Message ${data.MessageId} placed in the Delete Letter Queue`);
  return data;
};

const receiveFromQueue = async () => {
  const params = {
    MaxNumberOfMessages: 10,
    QueueUrl: process.env.SQS_QUEUE_URL,
    VisibilityTimeout: 600,
  };
  const input = new ReceiveMessageCommand(params);
  return sqs.send(input);
};

const deleteFromQueue = async (id) => {
  const params = {
    QueueUrl: process.env.SQS_QUEUE_URL,
    ReceiptHandle: id,
  };

  const input = new DeleteMessageCommand(params);
  return sqs.send(input);
};

// Other backend need to send data to queue in this format
// send('{"hash":"0x0123456789abcdef0123456789abcdef0123456789abc
// def0123456789abcde1","type":0, "timestamp":123142343}')
// {
//   "UID": "0x4d494e32334a4438440000000000000000000000000000000000000000000000",
//   "fullName": "0x4a6f686e20446f65000000000000000000000000000000000000000000000000",
//   "dateOfBirth": "0x3031204a756e6520323032340000000000000000000000000000000000000000",
//   "nationalID": "0x3031204a756e6520323032340000000000000000000000000000000000000000",
//   "additionalInfo": "0x3031204a756e6520323032340000000000000000000000000000000000000000",
//   "timestamp": 1672531199
// }

const start = async () => {
  await contract.initContract();
  console.log("Worker processing started", new Date());
  const messages = await receiveFromQueue();
  if (messages && messages.Messages) {
    messages.Messages?.map(async (message) => {
      if (message.Body) {
        try {
          const data = JSON.parse(message.Body);
          console.log(data);
          const response = await contract.postHash(
            data.UID,
            data.fullName,
            data.dateOfBirth,
            data.nationalID,
            data.additionalInfo,
            data.timestamp
          );
          console.log(
            "TX Hash to be store in DB against document hash",
            response.transactionHash
          );

          // const backendResponse = await axios.post(
          //   `${process.env.BACKEND_URL}api/v1/blockchain/store-transaction-hash/${data.hash}`,
          //   {
          //     data: {
          //       type: data.type,
          //       timestamp: data.timestamp,
          //       dealType: data.dealType,
          //       dealId: data.dealId,
          //       shipmentId: data.shipmentId,
          //       transactionHash: response.transactionHash,
          //       blockchainType: "Polygon",
          //     },
          //   },
          //   {
          //     headers: { "Content-Type": "application/json" },
          //     // auth: {
          //     //   username: process.env.AUTH_SERVICE_USERNAME,
          //     //   password: process.env.AUTH_SERVICE_PASSWORD,
          //     // },
          //   }
          // );
          // if (backendResponse?.data?.success) {
          //   console.log("Transaction Hash Stored Successfully");
          // } else {
          //   console.log(
          //     "Transaction Hash Store Failed: ",
          //     backendResponse?.data
          //   );
          // }
        } catch (err) {
          console.error(err);
          await sendDeleteLetter(message.Body);
          await deleteFromQueue(message.ReceiptHandle);
        }
      }
      // Make to sure to uncomment and delete message from queue
      // to prevent double processing and overloading
      await deleteFromQueue(message.ReceiptHandle);
    });
  }
  console.log("Worker processing ended", new Date()); // eslint-disable-line no-console
  setTimeout(start, process.env.SQS_READ_INTERVAL);
};

module.exports = start;
