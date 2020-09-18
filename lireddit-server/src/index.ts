import {MikroORM} from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from './mikro-orm.config';
import express from 'express';


const main = async () =>{
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    const app = express();
    app.get('/', (req,res)=>{
        res.send('Hello World')
    })
    app.listen(4000, ()=>console.log(`Server listening on port 4000`))
};


main()
console.log('Hello world');