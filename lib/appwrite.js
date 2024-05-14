import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.queue-app',
    projectId: '663e865c003df7277444',
    databaseId: '663e87cc00152e51ab17',
    userCollectionId: '663e87ee002240afc8b8',
    concertsCollectionId: '66412615000708112d5a'
}

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const promise = account.createEmailPasswordSession(email, password);

    return promise;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get concerts created/attended by user
export async function getUserConcerts(username) {
  try {
    const concerts = await databases.listDocuments(
      config.databaseId,
      config.concertsCollectionId,
      [Query.or([Query.equal("artist", [username]), Query.contains("audience", [username])])]
    );

    return concerts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Create concert
export async function createConcert(name, artist) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  try {
    const newConcert = await databases.createDocument(
      config.databaseId,
      config.concertsCollectionId,
      ID.unique(),
      {
        name: name,
        artist: artist,
        pin: getRandomInt(9999999, 0),
      }
    );

    return newConcert;
  } catch (error) {
    throw new Error(error);
  }
}

// add concert
export async function addConcert(pin, username) {
  try {
    const concert = await databases.listDocuments(
      config.databaseId,
      config.concertsCollectionId,
      [Query.equal("pin", pin)]
    );

    const ret =concert.documents[0];

    await databases.updateDocument(
      config.databaseId,
      config.concertsCollectionId,
      concert.documents[0].$id,
      {
        name: ret.name,
        artist: ret.artist,
        pin: ret.pin,
        audience: [username],
        songRequests: ret.songRequests,
        songQueue: ret.songQueue,
        songsPlayed: ret.songsPlayed
      }
    );

    return ret;
  } catch (error) {
    throw new Error(error);
  }
}