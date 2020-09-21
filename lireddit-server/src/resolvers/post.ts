import { Post } from "../entities/Post";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";

@Resolver()
export class PostResolver {
    @Query(()=> Post, {nullable: true})
    posts(
        @Arg('id') id: number,
        @Ctx() {em}: MyContext): Promise<Post|null>{
        return em.findOne(Post, {id});
    }

    @Mutation(()=> Post)
    async createPost(
        @Arg('title') title: string,
        @Ctx() {em}: MyContext
    ): Promise<Post>{
        const post = em.create(Post, {title})
        await em.persistAndFlush(post)
        return post;
    }
}