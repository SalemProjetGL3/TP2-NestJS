import { BaseEntity } from "@/common/base/base.entity";
import { extend, Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User extends BaseEntity {
  @Field()
  name: string;

  @Field()
  email: string;
}