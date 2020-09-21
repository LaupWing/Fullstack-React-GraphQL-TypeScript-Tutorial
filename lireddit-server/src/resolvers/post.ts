import { Post } from "../entities/Post";
import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";

@Resolver()
export class PostResolver {
    @Query(()=> Post, {nullable: true})
    posts(
        @Arg('id', ()=> Int) id: number,
        @Ctx() {em}: MyContext): Promise<Post|null>{
        return em.findOne(Post, {id});
    }
}