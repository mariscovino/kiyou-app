import client from "./client";
import { useGlobalContext } from "@/context/GlobalProvider";

export default class User {
  name;
  last_name;
  email;
  password;

  constructor() {
    const {user} = useGlobalContext();
    this.name = user.name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.password = user.password;
  }

  async signIn() {
    return await client.post("/users/signIn", {
      "email": this.email,
      "password": this.password
    });
  }

  async signUp() {
    return await client.post("/users/signUp", {
      "name": this.name,
      "last_name": this.last_name,
      "email": this.email,
      "password": this.password
    });
  }

  async signOut() {
    return await client.post("/users/signOut", { "email": this.email });
  }

  async getArtistConcerts() {
    return getData('/users/getArtistConcerts', {"email": this.email});
  }

  async getAudienceConcerts() {
    return getData('/users/getAudienceConcerts', {"email": this.email});
  }

  async getAllConcerts() {
    return getData('/users/getAllConcerts', {"email": this.email});
  }

  async joinConcert(pin) {
    return await client.post("/users/joinConcert", { "email": this.email, "pin": pin });
  }

  async createConcert(concert_name) {
    return await client.post("/users/createConcert", { "concert_name": concert_name, "email": this.email });
  }

  async getUser() {
    return await client.post("/users/getUser", { "email": this.email });
  }

  async getUserSessions() {
    return await client.post("/users/getUserSessions", { "email": this.email });
  }
}