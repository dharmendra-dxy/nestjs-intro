import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './types/post.types';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      label: 'My First Posts',
      description: 'First Posts description',
      authorName: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      label: 'My Second Posts',
      description: 'Second Posts description',
      authorName: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      label: 'My Third Posts',
      description: 'Third Posts description',
      authorName: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      label: 'My Fourth Posts',
      description: 'Fourth Posts description',
      authorName: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  getAllPosts(): Post[] {
    return this.posts;
  }

  getPostById(id: number): Post {
    const post = this.posts.find((post) => post.id === id);
    if (!post) throw new NotFoundException(`Post with id ${id} not found`);
    return post;
  }

  createPost(createPostData): Post{}

  updatePost(id:number, updatePostData): Post {}

  deletePost(id:number) {}
}
