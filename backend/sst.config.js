import { ApiStack } from "./stacks/ApiStack";
import { StorageStack } from "./stacks/StorageStack";
import { AuthStack } from "./stacks/AuthStack";

export default {
  config(_input) {
    return {
      name: "backend",
      region: "us-west-2",
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(ApiStack).stack(AuthStack);
  }
};
