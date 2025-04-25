import { BaseService } from "@/common/base/base.service";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService extends BaseService<User> {
  protected contextKey = "users";
}