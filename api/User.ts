import { useGlobalContext } from "@/context/GlobalProvider";
import client from "./client";
import getData from '@/api/getData.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

export default class User {
  private static instance: User;
  private name: string;
  private last_name: string;
  private email: string;
  private password: string;
  
  private constructor(user: any) {
    this.name = user?.name;
    this.last_name = user?.last_name;
    this.email = user?.email;
    this.password = user?.password;
  }

  public static getInstance(user: any) {
    if (!User.instance) {
      User.instance = new User(user);
    }
    return User.instance;
  }

  public getName() {
    return this.name;
  }

  public getEmail() {
    return this.email;
  }

  public static async signIn(email: string, password: string) {
    await client.post("/users/signIn", {
      "email": email,
      "password": password
    });

    await AsyncStorage.setItem('email', email);

    return await client.post('/users/getUser', { "email": email });
  }

  public static async signUp(name: string, last_name: string, email: string, password: string) {
    await client.post("/users/signUp", {
      "name": name,
      "last_name": last_name,
      "email": email,
      "password": password
    });
    
    await AsyncStorage.setItem('email', email);

    return await client.post('/users/getUser', { "email": email });
  }

  public async signOut() {
    const email = this.email;

    await client.post("/users/signOut", { "email": email });

    await AsyncStorage.removeItem('email');
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