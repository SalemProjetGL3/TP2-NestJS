import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "@/common/base/base.entity";

@ObjectType()
export class Skill extends BaseEntity {
    @Field()
    name: string;
}