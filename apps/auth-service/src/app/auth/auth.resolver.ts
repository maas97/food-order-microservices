import { User } from './../users/models/user.model';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from './dto/login.input';
import { GqlContext } from '@food-order/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async login(
    @Args('LoginInput') loginInput: LoginInput,
    @Context() context: GqlContext
  ) {
    return this.authService.login(loginInput, context.res);
  }
}
