import { useState } from "react";
import { Alert } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import client from "./client";
import getData from '@/api/getData.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class User {
  static #instance: User;
  private name: string;
  private last_name: string;
  private email: string;
  private password: string;

  private constructor() {
    const { user } = useGlobalContext();

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

  public async signIn(email: string, password: string) {
    this.email = email;
    this.password = password;

    await client.post("/users/signIn", {
      "email": email,
      "password": password
    });

    await AsyncStorage.setItem('email', email);

    return await client.post('/users/getUser', { "email": email });
  }
  
  public async signUp(name: string, last_name: string, email: string, password: string) {
    this.name = name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    
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