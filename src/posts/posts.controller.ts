import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as IPost } from './types/post.types';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostExistsPipe } from './pipes/post-exists.pipe';

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
  getPostById(@Param("id", ParseIntPipe, PostExistsPipe) id:number) : IPost {
    const post = this.postsService.getPostById(id)
    return post;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createPost(@Body() createPostBody: CreatePostDto): IPost{
    return this.postsService.createPost(createPostBody)
  }

  @Put(":id")
  updatePost(@Param("id", ParseIntPipe, PostExistsPipe) id:number,@Body() updatePostBody: UpdatePostDto): IPost {
    return this.postsService.updatePost(id,updatePostBody)
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePost(@Param("id", ParseIntPipe, PostExistsPipe) id:number){
    return this.postsService.deletePost(id)
  }
}
