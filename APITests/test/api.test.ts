import { get, post, del } from '../ApiMethods/apiMethods';
import { createNewPost } from '../Data/data.post';
import { basicURL } from '../Data/basicURL'; 
import { newAlbums } from '../Data/data.albums';
import { newPhotoData } from '../Data/data.photos';

//Test for posts
describe("Posts API Tests", () => {
  test("Get all posts", async () => {
      const response = await get(`${basicURL}/posts`);
      expect(response.status).toEqual(200);
      expect(response.body.length).toBeGreaterThan(0);
      response.body.forEach((post: any) => {
          expect(post.title).toBeDefined();
          expect(typeof post.title).toEqual('string');
      });
  });
});

test("Get post by id", async () => {
  const newID = 5;
  const response = await get(`${basicURL}/posts/${newID}`);
  expect(response.status).toEqual(200);
  expect(response.body.title).toEqual("nesciunt quas odio");
});

test("Get 404 status code by id", async () => {
  const postId = 500;
  try {
      const response = await get(`${basicURL}/posts/${postId}`);
      expect(response.status).toEqual(200); 
  } catch (error) {
      const errorMessage = error as any;
      expect(errorMessage.response.status).toEqual(404); 
      expect(errorMessage.response.body).toEqual({});
  }
});

test("Get all comments by post id", async () => {
  const postId = 50;
  const response = await get(`${basicURL}/posts/${postId}/comments`);
  expect(response.status).toEqual(200);
});

test("Get an empty array by id", async () => {
  const postId = 110;
  try {
      const response = await get(`${basicURL}/posts/${postId}/comments`);
      expect(response.status).toEqual(200); 
      expect(response.body).toEqual([]); 
  } catch (error) {
  }
});

test("Can create a new post", async () => {
  try {
      const response = await post(`${basicURL}/posts/`, createNewPost);
      expect(response.status).toEqual(201); 
      expect(response.body.userId).toEqual(createNewPost.userId); 
      expect(response.body.title).toEqual(createNewPost.title); 
      expect(response.body.body).toEqual(createNewPost.body); 
  } catch (error) {
      console.log("Error", error);
  }
});

test("Delete a post by ID", async () => {
  const postId = 1; 
  try {
      const response = await del(`${basicURL}/posts/${postId}`);
      expect(response.status).toEqual(200); 
  } catch (error) {
      console.log("Error", error);
  }
});

//Test for albums
test("Get all albums", async () => {
  const response = await get(`${basicURL}/albums`);
  expect(response.status).toEqual(200);
  expect(response.body.length).toBeGreaterThan(0);
  response.body.forEach((album: any) => {
      expect(album.id).toBeDefined();
      expect(album.userId).toBeDefined();
      expect(album.title).toBeDefined();
      expect(typeof album.id).toEqual("number");
      expect(typeof album.title).toEqual("string");
      expect(typeof album.userId).toEqual("number");
  });
});

test("Get an album by ID", async () => {
  const albumId = 10; 
  const response = await get(`${basicURL}/albums/${albumId}`);
  expect(response.status).toEqual(200);
  expect(response.body.id).toEqual(albumId);
  expect(response.body.userId).toBeDefined();
  expect(response.body.title).toBeDefined();
  expect(typeof response.body.title).toEqual("string");
  expect(typeof response.body.userId).toEqual("number");
});

test("Get all albums by userId", async () => {
  const userId = 10; 
  const response = await get(`${basicURL}/users/${userId}/albums`);
  expect(response.status).toEqual(200);
  expect(response.body.length).toBeGreaterThan(0);
  response.body.forEach((album: any) => {
      expect(album.userId).toEqual(userId);
      expect(album.id).toBeDefined();
      expect(album.title).toBeDefined();
      expect(typeof album.id).toEqual("number");
      expect(typeof album.title).toEqual("string");
  });
});

test("Create new album", async () => {
  try {
      const response = await post(`${basicURL}/albums`, newAlbums);
      expect(response.status).toEqual(201);
      expect(response.body.id).toBeDefined();
      expect(response.body.userId).toEqual(newAlbums.userId);
      expect(response.body.title).toEqual(newAlbums.title);
      expect(typeof response.body.id).toEqual("number");
      expect(typeof response.body.title).toEqual("string");
      expect(typeof response.body.userId).toEqual("number");
  } catch (error) {
      console.error("Error", error);
  }
});

//Tests for Photos
test("Get all photos in an album by ID", async () => {
  const albumId = 10; 
  const response = await get(`${basicURL}/albums/${albumId}/photos`);
  expect(response.status).toEqual(200);
  expect(response.body.length).toBeGreaterThan(0);
  response.body.forEach((photo: any) => {
      expect(photo.albumId).toEqual(albumId);
      expect(photo.id).toBeDefined();
      expect(photo.title).toBeDefined();
      expect(photo.url).toBeDefined();
      expect(photo.thumbnailUrl).toBeDefined();
      expect(typeof photo.id).toEqual("number");
      expect(typeof photo.title).toEqual("string");
      expect(typeof photo.url).toEqual("string");
      expect(typeof photo.thumbnailUrl).toEqual("string");
  });
});

test("Getet a specific photo by ID", async () => {
  const photoId = 1; 
  const response = await get(`${basicURL}/photos/${photoId}`);
  expect(response.status).toEqual(200);
  expect(response.body.id).toEqual(photoId);
  expect(response.body.albumId).toBeDefined();
  expect(response.body.title).toBeDefined();
  expect(response.body.url).toBeDefined();
  expect(response.body.thumbnailUrl).toBeDefined();
  expect(typeof response.body.albumId).toEqual("number");
  expect(typeof response.body.title).toEqual("string");
  expect(typeof response.body.url).toEqual("string");
  expect(typeof response.body.thumbnailUrl).toEqual("string");
});

test("Upload new photo", async () => {
  try {
      const response = await post(`${basicURL}/photos`, newPhotoData);
      expect(response.status).toEqual(201);
      expect(response.body.id).toBeDefined();
      expect(response.body.albumId).toEqual(newPhotoData.albumId);
      expect(response.body.title).toEqual(newPhotoData.title);
      expect(response.body.url).toBeDefined();
      expect(response.body.thumbnailUrl).toBeDefined();
      expect(typeof response.body.id).toEqual("number");
  } catch (error) {
      console.error("Error", error);
  }
});