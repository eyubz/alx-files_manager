import dbClient from "./utils/db";

const waitConnection = () => {
  return new Promise((resolve, reject) => {
    let i = 0;
    const repeatFct = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wrap setTimeout in a promise
      i += 1;
      if (i >= 10) {
        reject(new Error("Max retries reached"));
      } else if (!dbClient.isAlive()) {
        repeatFct();
      } else {
        resolve();
      }
    };
    repeatFct();
  });
};

(async () => {
  console.log(dbClient.isAlive());
  await waitConnection();
  console.log(dbClient.isAlive());
  console.log(await dbClient.nbUsers());
  console.log(await dbClient.nbFiles());
})();
