import axios from "axios";
const db = "http://localhost:3004";

const Query={
    agent: async (parent, args, context, info) => {
        const response = await axios.get(`${db}/users/${args.id}`);
        return response.data;
      },
      agents: async (parent, args, context, info) => {
        const name = args.name != null ? `name=${args.name}` : "";
        console.log("name" + name);
        const age = args.age != null ? `age=${args.age}` : "";
        console.log("age" + age);
        const response = await axios.get(`${db}/users?${name}&${age}`);
        return response.data;
      },
      posts: async (parent, args, context, info) => {
        const response = await axios.get(`${db}/posts`);
        return response.data;
      },
      post: async (parent, args, context, info) => {
        const response = await axios.get(`${db}/posts/${args.id}`);
        console.log("response data " + response.data);
        return response.data;
      },
      pictures: async (parent, arg, context, info) => {
        const response = await axios.get(`${db}/pictures`);
        return response.data;
      }
}

const Post={
        author: async (parent, args, context, info) => {
          const response = await axios.get(`${db}/users/${parent.author}`);
          return response.data;
        },
        picture: async (parent, args, context, info) => {
          const response = await axios.get(`${db}/pictures/${parent.picture}`);
          return response.data;
        }
}

const User={
    posts: async (parent, args, context, info) => {
        const response = await axios.get(`${db}/posts?author=${parent.id}`);
        return response.data;
      },
      pictures: async (parent, args, context, info) => {
        const response = await axios.get(`${db}/pictures?author=${parent.id}`);
        return response.data;
      },
    
}

const Picture={
    author: async (parent, args, context, info) => {
        const response = await axios.get(`${db}/users/${parent.author}`);
        return response.data;
      },
      post: async (parent, args, context, info) => {
        const response = await axios.get(`${db}/posts/${parent.post}`);
        return response.data;
      }
}

export{
    Query,
    Post,
    User,
    Picture
}