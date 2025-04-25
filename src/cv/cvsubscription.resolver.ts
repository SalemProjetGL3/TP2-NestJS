// cv-subscription.resolver.ts
import { Resolver, Subscription } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-yoga';
import { CV } from './cv.entity';

@Resolver(() => CV)
export class CvSubscriptionResolver {
  constructor(
    @Inject('PUB_SUB') private readonly pubSub: PubSub<any>,
  ) {}

  @Subscription(() => CV, {
    resolve: (payload) => payload,
  })
  cvCreated() {
    return this.pubSub.subscribe('cvCreated');
  }

  @Subscription(() => CV, {
    resolve: (payload) => payload,
  })
  cvUpdated() {
    return this.pubSub.subscribe('cvUpdated');
  }

  @Subscription(() => CV, {
    resolve: (payload) => payload,
  })
  cvDeleted() {
    return this.pubSub.subscribe('cvDeleted');
  }
}
