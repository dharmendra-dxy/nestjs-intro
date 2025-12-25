import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class CreatePostDto {

  @IsNotEmpty({message: "Label is required"})
  @IsString({message: "Label needs to be string"})
  @MinLength(3, {message: "Min lenght of label should be 3 chars"})
  @MaxLength(50, {message: "Label should not be longer than 50 chars"})
  label: string;

  @IsNotEmpty({message: "Description is required"})
  @IsString({message: "Description needs to be string"})
  @MinLength(10, {message: "Min lenght of Description should be 10 chars"})
  @MaxLength(100, {message: "Description should not be longer than 100 chars"})
  description: string;

  @IsNotEmpty({message: "Author is required"})
  @IsString({message: "Author needs to be string"})
  @MinLength(3, {message: "Min lenght of Author should be 3 chars"})
  @MaxLength(25, {message: "Author should not be longer than 25 chars"})
  authorName: string;
}