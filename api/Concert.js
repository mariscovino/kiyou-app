import client from "./client";
import { useGlobalContext } from "@/context/GlobalProvider";

export default class Concert {
  pin;

  constructor() {
    const { concert } = useGlobalContext();
    this.pin = concert.pin;
  }

  async sendPostRequest(url) {
    return client.post(url, { "pin": this.pin });
  }

  async getSongRequests() {
    return sendPostRequest("/concerts/getSongRequests");
  }

  async getSongQueue() {
    return sendPostRequest("/concerts/getSongQueue");
  }

  async getSongsPlayed() {
    return sendPostRequest("/concerts/getSongsPlayed");
  }
}