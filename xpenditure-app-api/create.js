import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "transactions",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      transactionId: uuid.v1(),
      merchant: data.merchant,
      price: data.price,
      category: data.category,
      datePurchased: data.datePurchased,
      paymentType: data.paymentType,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
