import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as IPost } from './types/post.types';

@Controller('api/posts')
export class PostsController {

  constructor(private readonly postsService: PostsService){}

  @Get()
  getAllPosts(@Query('search') search?: string): IPost[] {
    const posts = this.postsService.getAllPosts();

    if(search){
      return posts.filter((p) => p.label.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }

    return posts;
  }

  @Get(":id")
  getPostById(@Param("id", ParseIntPipe) id:number) : IPost {
    const post = this.postsService.getPostById(id)
    return post;
  }
}
