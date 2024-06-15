import { useGlobalContext } from "@/context/GlobalProvider";
import client from "./client";
import getData from '@/api/getData'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

export default class User {
  public name: string;
  public last_name: string;
  public email: string;
  public password: string;
  
  public constructor(user: any) {
    this.name = user?.name;
    this.last_name = user?.last_name;
    this.email = user?.email;
    this.password = user?.password;
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

    const userInfo = await client.post('/users/getUser', { "email": email });

    return new User(userInfo.data);
  }

  public static async signUp(name: string, last_name: string, email: string, password: string) {
    await client.post("/users/signUp", {
      "name": name,
      "last_name": last_name,
      "email": email,
      "password": password
    });
    
    await AsyncStorage.setItem('email', email);

    const userInfo = await client.post('/users/getUser', { "email": email });

    return new User(userInfo.data);
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