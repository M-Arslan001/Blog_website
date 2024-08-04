import conf from "../conf/conf";
// eslint-disable-next-line no-unused-vars
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ tile, slug, content, featuredImage, status, userId }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          tile,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("error encounter of createPost:=>error", error);
    }
  }
  async updatePost(slug, { tile, content, featuredImage, status }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          tile,
          featuredImage,
          status,
          content,
        }
      );
    } catch (error) {
      console.log("upadete post error encounter:=>error", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("error encounter deletePost:=>error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("error encouter=>getPost", error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("getpost queries error:>> ", error);
      return false;
    }
  }

  //  files upload methods/services

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketiD,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("upload flie error:>>", error);
      return false;
    }
  }

  async deleteFiles(fileId) {
    try {
      return await this.bucket.deleteFiles(conf.appwriteBucketiD, fileId);
      //   return true;
    } catch (error) {
      console.log("delete files error:>>", error);
      return false;
    }
  }

  //   get file
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketiD, fileId);
  }
}
const service = new Service();
export default service;
