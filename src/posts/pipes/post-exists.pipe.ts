import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { PostsService } from "../posts.service";


/* 
 * Custom pipes
 * Checks if a post exsists or not.
*/
@Injectable()
export class PostExistsPipe implements PipeTransform {
  constructor (private readonly postsService: PostsService){}

  transform(value: any, metadata: ArgumentMetadata) {
    try{
      this.postsService.getPostById(value)
    }
    catch(err){
      throw new NotFoundException(`Post with ID ${value} not found`)
    }
    return value
  }
}