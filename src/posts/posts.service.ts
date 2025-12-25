import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entities';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ){}


  async getAllPosts(): Promise<Post[]> {
    const posts = await this.postRepository.find();
    return posts;
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({id})
    if (!post) throw new NotFoundException(`Post with id ${id} not found`);
    return post;
  }

  async createPost(createPostData: CreatePostDto): Promise<Post>{
    const post = await this.postRepository.create({
      label: createPostData.label,
      description: createPostData.description,
      authorName: createPostData.authorName
    })

    return this.postRepository.save(post);
  }

  async updatePost(id:number, updatePostData:UpdatePostDto): Promise<Post> {
    const post = await this.getPostById(id);
    if(updatePostData.label)  post.label = updatePostData?.label;
    if(updatePostData.description) post.description = updatePostData?.description;
    if(updatePostData.authorName) post.authorName = updatePostData?.authorName;

    return this.postRepository.save(post)
  }

  async deletePost(id:number): Promise<void> {
    const post = await this.getPostById(id);
    this.postRepository.remove(post)

  }
}
