import 'reflect-metadata';
import {MikroORM} from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Post } from "./entities/Post";
import microConfig from './mikro-orm.config';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import { PostResolver } from "./resolvers/post";

const main = async () =>{
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver],
            validate: false
        }),
        context: () =>({em: orm.em})
    });

    apolloServer.applyMiddleware({ app });

    app.get('/', (_,res)=>{
        res.send('Hello World')
    });
    app.listen(4000, ()=>console.log(`Server listening on port 4000`));
};


main()
console.log('Hello world');