import axios from 'axios';
import {GraphQLServer} from 'graphql-yoga'

const db = 'http://localhost:3004';
const Server=new GraphQLServer({
    typeDefs:`
        type Query{
            agent(id:ID!): User!
            agents(name:String, age:Int): [User]
            posts:[Post]
            post(id:ID!):Post!
            pictures:[Picture!]!
        }
        type User{
            id:ID!
            name:String!
            age:Int
            married:Boolean
            average:Float
            posts:[Post!]!
        }
        type Post{
            id:ID!
            title:String!
            content:String!
            author:User!
            picture:Picture!
        }
        type Picture{
            id:ID!
            path:String!
            author:User!
            post:Post!
        }
    `,
    resolvers:{
        Query:{
           agent:async(parent,args,context,info)=>{
                const response = await axios.get(`${db}/users/${args.id}`)
                return response.data
           },
           agents:async(parent, args, context, info)=>{
                const name=args.name != null ? `name=${args.name}` :''
                console.log('name'+name)
                const age = args.age != null ? `age=${args.age}` :''
                console.log('age'+age)
                const response = await axios.get(`${db}/users?${name}&${age}`)
                return response.data
           },
           posts:async(parent,args,context,info)=>{
                const response = await axios.get(`${db}/posts`)
                return response.data;
           },
           post:async(parent,args,context,info)=>{
               const response=await axios.get(`${db}/posts/${args.id}`)
               console.log('response data '+response.data)
               return response.data
           },
           pictures:async(parent,arg,context,info)=>{
                const response=await axios.get(`${db}/pictures`)
                return response.data
           }
        },
        Post:{
            author:async(parent,args,context,info)=>{
                const response=await axios.get(`${db}/users/${parent.author}`)
                return response.data
            },
            picture:async(parent,args,context,info)=>{
                const response=await axios.get(`${db}/pictures/${parent.picture}`)
                return response.data
            }
        },
        User:{
            posts:async(parent,args,context,info)=>{
                const response=await axios.get(`${db}/posts?author=${parent.id}`)
                return response.data
            }
        },
        Picture:{
            author:async(parent,args,context,info)=>{
                const response=await axios.get(`${db}/users/${parent.author}`)
                return response.data;
            },
            post:async(parent,args,context,info)=>{
                const response=await axios.get(`${db}/posts/${parent.post}`)
                return response.data
            }
        }
    }
})

Server.start(()=>{
    console.log('and running')
});