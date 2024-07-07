import { Client, Databases, Query, ID, Storage } from "appwrite";
import configuration from "./configuration";

class Database {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(configuration.appwriteUrl)
      .setProject(configuration.appwritePublicId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, description, image, category, status, userId }) {
    try {
      return await this.database.createDocument(
        configuration.appwriteDatabaseId,
        configuration.appwriteCollectionId,
        ID.unique(),
        { title, description, category, image, status, userId },
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(
    $id,
    { title, description, category, image, status, userId },
  ) {
    try {
      return await this.database.updateDocument(
        configuration.appwriteDatabaseId,
        configuration.appwriteCollectionId,
        $id,
        { title, description, category, image, status, userId },
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(id) {
    try {
      await this.database.deleteDocument(
        configuration.appwriteDatabaseId,
        configuration.appwriteCollectionId,
        id,
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(id) {
    try {
      return await this.database.listDocuments(
        configuration.appwriteDatabaseId,
        configuration.appwriteCollectionId,
        [Query.equal("$id", id)],
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts() {
    try {
      const res = await this.database.listDocuments(
        configuration.appwriteDatabaseId,
        configuration.appwriteCollectionId,
      );
      return res;
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  /* File storage service */

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        configuration.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
    }
  }

  async updateFile(fileId, file) {
    try {
      return await this.bucket.updateFile(
        configuration.appwriteBucketId,
        fileId,
        file,
      );
    } catch (error) {
      console.log("Appwrite service :: updateFile :: error", error);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(
        configuration.appwriteBucketId,
        fileId,
      );
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
    }
  }

  getFiles() {
    try {
      return this.bucket.listFiles(configuration.appwriteBucketId);
    } catch (error) {
      console.log("Appwrite service :: getFilepreview :: error", error);
    }
  }

  getFilepreview(fileId) {
    try {
      return this.bucket.getFilePreview(configuration.appwriteBucketId, fileId)
        .href;
    } catch (error) {
      console.log("Appwrite service :: getFilepreview :: error", error);
    }
  }
}

const database = new Database();

export default database;
