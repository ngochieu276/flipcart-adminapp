// export const api = "http://localhost:3000/api";
// export const generatePublicUrl = (fileName) => {
//   return `http://localhost:3000/public/${fileName}`;
// };

const baseUrl = process.env.API || "https://mern-ecormerce.herokuapp.com";
//const baseUrl = "http://localhost:2000";

export const api = `${baseUrl}/api`;

export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
