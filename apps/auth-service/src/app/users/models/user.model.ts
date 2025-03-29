import { AbstractModel } from '@food-order/nestjs';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends AbstractModel {
  @Field()
  email: string;
}
