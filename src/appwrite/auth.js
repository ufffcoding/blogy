import { Client, Account, ID } from "appwrite";
import configuration from "./configuration";

class Auth {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(configuration.appwriteUrl)
      .setProject(configuration.appwritePublicId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        return await this.account.createEmailPasswordSession(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("Appwrite service :: createAccount :: error", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Appwrite service :: login :: error", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite service :: getCurrentUser :: error", error);
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error("Appwrite service :: logout :: error", error);
    }
  }
}

const auth = new Auth();

export default auth;
