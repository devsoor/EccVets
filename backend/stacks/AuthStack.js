import * as iam from "aws-cdk-lib/aws-iam";
import { Cognito, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";
import { ApiStack } from "./ApiStack";

export function AuthStack({ stack }) {
  const { userTable, bucket } = use(StorageStack);
  const { api } = use(ApiStack);

  // Create a Cognito User Pool and Identity Pool
  const auth = new Cognito(stack, "Auth", {
    login: ["email"],
    cdk: {
      userPool: {
        standardAttributes: {
          givenName: { required: true, mutable: true },
          familyName: { required: true, mutable: true },
        },
      }
    },
  });

  auth.attachPermissionsForUnauthUsers(auth, [
    new iam.PolicyStatement({
      actions: ["s3:*"],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + "/public/*",
        bucket.bucketArn + "/protected/*",
        bucket.bucketArn + "/uploads/*",
      ],
    }),
  ]);

  auth.attachPermissionsForAuthUsers(stack, [
    // Allow access to the API
    api,
    // Policy granting access to a specific folder in the bucket
    new iam.PolicyStatement({
      actions: ["s3:*"],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
        bucket.bucketArn + "/public/*",
        bucket.bucketArn + "/protected/${cognito-identity.amazonaws.com:sub}/*",
        bucket.bucketArn + "/protected/*",
        bucket.bucketArn + "/uploads/*",
      ],
    }),
    // allow to add users as admin and send emails
    new iam.PolicyStatement({
      actions: ["cognito-idp:*", "ses:*"],
      effect: iam.Effect.ALLOW,
      resources: [
        "*",
      ],
    }),
  ]);

  // Show the auth resources in the output
  stack.addOutputs({
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });

  // Return the auth resource
  return {
    auth,
  };
}