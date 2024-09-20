const AWS = require("aws-sdk");
const sqs = new AWS.SQS();

module.exports.sendMessage = async (event) => {
  let body;

  try {
    body = JSON.parse(event.body);
  } catch (error) {
    //updated errpr to error
    console.error("Error parsing JSON:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Invalid JSON format",
      }),
    };
  }

  const params = {
    QueueUrl: process.env.SQS_QUEUE_URL,
    MessageBody: JSON.stringify(body),
  };

  try {
    const data = await sqs.SendMessage(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Message sent to SQS",
        messageId: data.MessageId,
      }),
    };
  } catch (error) {
    console.error("Error sending message to SQS:", error); //updated by Aldin with error message
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to send message to SQS",
      }),
    };
  }
};
