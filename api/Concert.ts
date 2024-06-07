import { useGlobalContext } from "@/context/GlobalProvider";
import client from "./client";
import getData from "./getData";

export default class Concert {
  private pin: number;
  private email: string;

  public constructor() {
    const { concert, user } = useGlobalContext();
    this.pin = concert?.pin;
    this.email = user?.email;
  }

  public getSongRequests() {
    return getData("/concerts/getSongRequests", { "pin": this.pin }).data;
  }

  public getSongQueue() {
    return getData("/concerts/getSongQueue", { "pin": this.pin }).data;
  }

  public getSongsPlayed() {
    return getData("/concerts/getSongsPlayed", { "pin": this.pin }).data;
  }

  public async getSongQueueAsync() {
    return await client.post("/concerts/getSongQueue", { "pin": this.pin });
  }

  public async createSongRequests(song_name: string, song_artist: string) {
    return await client.post("/concert/list/createSongRequests", {
      "pin": this.pin,
      "song_name": song_name,
      "song_artist": song_artist,
      "email": this.email
    });
  }

  public async removeSongRequests(song_name: string, song_artist: string) {
    return await client.post("/concert/list/removeSongRequests", {
      "pin": this.pin,
      "song_name": song_name,
      "song_artist": song_artist,
    });
  }

  public async acceptSong(song_name: string, song_artist: string) {
    return await client.put("/concert/list/acceptSong", {
      "pin": this.pin,
      "song_name": song_name,
      "song_artist": song_artist,
    });
  }

  public async denySong(song_name: string, song_artist: string) {
    return await client.put("/concert/list/denySong", {
      "pin": this.pin,
      "song_name": song_name,
      "song_artist": song_artist,
    });
  }

  public async createSongQueue(song_name: string, song_artist: string) {
    return await client.post("/concert/list/createSongQueue", {
      "pin": this.pin,
      "song_name": song_name,
      "song_artist": song_artist,
    });
  }

  public async removeSongQueue(song_name: string, song_artist: string) {
    return await client.post("/concert/list/removeSongQueue", {
      "pin": this.pin,
      "song_name": song_name,
      "song_artist": song_artist,
    });
  }

  public async createSongsPlayed(song_name: string, song_artist: string) {
    return await client.post("/concert/list/createSongsPlayed", {
      "pin": this.pin,
      "song_name": song_name,
      "song_artist": song_artist,
    });
  }

  public async removeSongsPlayed(song_name: string, song_artist: string) {
    return await client.post("/concert/list/removeSongsPlayed", {
      "pin": this.pin,
      "song_name": song_name,
      "song_artist": song_artist,
    });
  }
}