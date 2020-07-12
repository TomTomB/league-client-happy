import LCUConnector from "lcu-connector";
import Axios from "axios";
import {
  postRosterName,
  getCurrentTournamentIds,
  getTournamentPlayer,
  postRosterShortName,
  postRosterIcon,
} from "./clash-endpoints";
import { TournamentPlayer } from "./clash-models";

import * as fs from "fs";

const blns = JSON.parse(
  // @ts-ignore
  fs.readFileSync(__dirname.replace("dist", "src/blns/blns.json"))
);

// @ts-ignore
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const connector = new LCUConnector();

let LCUCredentials: {
  address: string;
  port: number;
  username: string;
  password: string;
  protocol: string;
} | null = null;

connector.on("connect", async (data) => {
  console.log("Connected to LCU");
  LCUCredentials = data;

  try {
    const tournamentIds: number[] = (await LCUGet(getCurrentTournamentIds))
      ?.data;

    for await (const [, id] of tournamentIds.entries()) {
      const player: TournamentPlayer = (await LCUGet(getTournamentPlayer(id)))
        ?.data;

      // console.log(blns);

      // for await (const [i, str] of blns.entries()) {
      //   console.log(str);

      //   let name = str as string;

      //   if (name.length > 3) {
      //     name = name.slice(0, 3);
      //   }

      //   try {
      //     const result = await LCUPost(postRosterShortName(player.rosterId), {
      //       name: name,
      //     });
      //     await timeout(1000);
      //   } catch (error) {
      //     console.error("ERROR:", error.response.data.message);
      //     await timeout(1000);
      //   }
      // }

      // const result = await LCUPost(postRosterName(player.rosterId), {
      //   name: "_",
      // });

      // const result = await LCUPost(postRosterName(player.rosterId), {
      //   name: "ßßßßßßßßßßßßßßßßßßßßßßßßß",
      // });
      // const result2 = await LCUPost(postRosterShortName(player.rosterId), {
      //   name: "ßßß",
      // });
      console.log("ALL DONE");
    }
  } catch (error) {
    console.error("ERROR:", error.response.data.message);
  }
});

connector.on("disconnect", () => {
  console.log("Disconnected from LCU");
  LCUCredentials = null;
});

connector.start();

const LCUGet = (endpoint: string) => {
  if (!LCUCredentials) {
    console.error("Tried to make a request to LCU API whilst disconnected");
    return;
  }
  return Axios.get(
    `${LCUCredentials.protocol}://${LCUCredentials.address}:${LCUCredentials.port}/${endpoint}`,
    {
      auth: {
        username: LCUCredentials.username,
        password: LCUCredentials.password,
      },
    }
  );
};

const LCUPost = (endpoint: string, data: any) => {
  if (!LCUCredentials) {
    console.error("Tried to make a request to LCU API whilst disconnected");
    return;
  }
  return Axios.post(
    `${LCUCredentials.protocol}://${LCUCredentials.address}:${LCUCredentials.port}/${endpoint}`,
    data,
    {
      auth: {
        username: LCUCredentials.username,
        password: LCUCredentials.password,
      },
    }
  );
};

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function sleep(fn: any, ...args: any) {
  await timeout(3000);
  return fn(...args);
}
