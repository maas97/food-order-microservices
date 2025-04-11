import { AbstractModel } from '@food-order/graphql';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends AbstractModel {
  @Field()
  email: string;
}
