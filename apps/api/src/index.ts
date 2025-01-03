import { createAPI } from "@repo/backend";
const main = async () => {
  const api = await createAPI();

  api.listen(4000, () => {
    console.log(`api running on 4000`);
  });
};

main();
