import client from "./client";
import getData from '@/api/getData.js'
import { useGlobalContext } from "@/context/GlobalProvider";

export default class User {
  static #instance: User;
  private name: string;
  private last_name: string;
  private email: string;
  private password: string;

  private constructor() {
    const {user} = useGlobalContext();
    this.name = user.name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.password = user.password;
  }

  public static getInstance() {
    if (!User.#instance) {
      User.#instance = new User();
    }
    return User.#instance;
  }

  public async signIn() {
    return await client.post("/users/signIn", {
      "email": this.email,
      "password": this.password
    });
  }
  
  public async signUp() {
    return await client.post("/users/signUp", {
      "name": this.name,
      "last_name": this.last_name,
      "email": this.email,
      "password": this.password
    });
  }

  public async signOut() {
    return await client.post("/users/signOut", { "email": this.email });
  }

  public getArtistConcerts() {
    return getData('/users/getArtistConcerts', {"email": this.email}).data;
  }

  public getAudienceConcerts() {
    return getData('/users/getAudienceConcerts', {"email": this.email}).data;
  }

  public getAllConcerts() {
    return getData('/users/getAllConcerts', {"email": this.email}).data;
  }

  public async joinConcert(pin: number) {
    return await client.post("/users/joinConcert", { "email": this.email, "pin": pin });
  }

  public async createConcert(concert_name: string) {
    return await client.post("/users/createConcert", { "concert_name": concert_name, "email": this.email });
  }

  public async getUser() {
    return await client.post("/users/getUser", { "email": this.email });
  }

  public async getUserSessions() {
    return await client.post("/users/getUserSessions", { "email": this.email });
  }
}