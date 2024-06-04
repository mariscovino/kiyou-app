import client from "./client";
import { useGlobalContext } from "@/context/GlobalProvider";

export default class List {
    pin;
    song_name;
    song_artist;
    email;

  constructor(song_name, song_artist) {
    const { user, concert } = useGlobalContext();
    this.pin = concert.pin;
    this.song_name = song_name;
    this.song_artist = song_artist;
    this.email = user.email;
  }

  async createSongRequests() {
    return await client.post("/concert/list/createSongRequests", {
      "pin": this.pin,
      "song_name": this.song_name,
      "song_artist": this.song_artist,
      "email": this.email
    });
  }

  async removeSongRequests() {
    return await client.delete("/concert/list/removeSongRequests", {
      "pin": this.pin,
      "song_name": this.song_name,
      "song_artist": this.song_artist,
    });
  }

  async acceptSong() {
    return await client.put("/concert/list/acceptSong", {
      "pin": this.pin,
      "song_name": this.song_name,
      "song_artist": this.song_artist,
    });
  }

  async denySong() {
    return await client.put("/concert/list/denySong", {
      "pin": this.pin,
      "song_name": this.song_name,
      "song_artist": this.song_artist,
    });
  }

  async createSongQueue() {
    return await client.post("/concert/list/createSongQueue", {
      "pin": this.pin,
      "song_name": this.song_name,
      "song_artist": this.song_artist,
    });
  }

  async removeSongQueue() {
    return await client.delete("/concert/list/removeSongQueue", {
      "pin": this.pin,
      "song_name": this.song_name,
      "song_artist": this.song_artist,
    });
  }

  async createSongsPlayed() {
    return await client.post("/concert/list/createSongsPlayed", {
      "pin": this.pin,
      "song_name": this.song_name,
      "song_artist": this.song_artist,
    });
  }

  async removeSongsPlayed() {
    return await client.delete("/concert/list/removeSongsPlayed", {
      "pin": this.pin,
      "song_name": this.song_name,
      "song_artist": this.song_artist,
    });
  }
}