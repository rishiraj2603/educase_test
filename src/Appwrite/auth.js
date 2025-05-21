import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return null;
      }
    } catch (error) {
      console.error("Account creation error:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return session;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      // First check if we have a valid session
      const session = await this.account.getSession("current");
      if (!session) {
        return null;
      }

      // If we have a session, try to get the user
      try {
        const user = await this.account.get();
        return user;
      } catch (error) {
        if (error.code === 401) {
          // Session expired or invalid
          await this.logOut(); // Clean up any invalid session
        }
        return null;
      }
    } catch (error) {
      // If there's no session or other error, return null instead of throwing
      console.error("getCurrentUser error:", error);
      return null;
    }
  }

  async checkSession() {
    try {
      const session = await this.account.getSession("current");
      return session;
    } catch (error) {
      if (error.code === 401) {
        // Expected error when no session exists
        return null;
      }
      console.error("Session check failed:", error);
      return null;
    }
  }

  async logOut() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  }
}

const authService = new AuthService();

export default authService;
