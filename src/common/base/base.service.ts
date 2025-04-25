import { Inject, Injectable, Scope } from '@nestjs/common';
import { BaseEntity } from './base.entity';
import { CONTEXT } from '@nestjs/graphql';

@Injectable({ scope: Scope.REQUEST })
export class BaseService<T extends BaseEntity> {
    private items: T[] = [];
    protected contextKey!: string;

    constructor(
        @Inject(CONTEXT)
        private readonly ctx: { db: Record<string, any> },
    ) {}

    protected get data(): T[] {
        return this.ctx.db[this.contextKey] as T[];
    }

    findAll(): T[] {
        return this.data;
    }

    findOne(id: number): T | undefined {
        return this.data.find(item => item.id === id);
    }

    create(
        input: Partial<T>
    ): T {
        const arr = this.data;
        const newId = arr.length ? Math.max(...arr.map(i => i.id)) + 1 : 1;
        const newItem = { ...input, id: newId } as T;
        arr.push(newItem);

        return newItem;
    }  

    update(
        id: number, 
        input: Partial<T>
    ): T | undefined {
        console.log('update', id, input);
        const arr = this.data;
        const idx = arr.findIndex(i => i.id === id);
        if (idx === -1) return undefined;
        arr[idx] = { ...arr[idx], ...input };

        return arr[idx];
    }

    delete(id: number): boolean {
        const arr = this.data;
        const idx = arr.findIndex(i => i.id === id);
        if (idx === -1) return false;
        arr.splice(idx, 1);

        return true;
    }
}
