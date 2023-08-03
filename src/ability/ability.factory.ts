import { Injectable } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import {InferSubjects, MongoAbility, AbilityBuilder, createMongoAbility, ExtractSubjectType} from '@casl/ability'
import { Book } from "src/book/entities/book.entity";

// This are the possible actions (for casl), manage is wildcard for any action
export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete'
}

// This is the type of Subject
export type Subjects = InferSubjects<typeof Book> | 'all';

// Overall type for casl ability
export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
    defineAbility(user: User){
        const {can, cannot, build} = new AbilityBuilder<AppAbility>(createMongoAbility);

        if(user.role.includes('admin')){
            can(Action.Create, Book)
            can(Action.Update, Book)
            can(Action.Delete, Book)
        }
        else if (user.role.includes('moderator')) {
            can(Action.Create, Book)
            can(Action.Update, Book)
        }
        else {
            can(Action.Read, Book)
        }
        
                
        return build({
            detectSubjectType: (item) => 
            item.constructor as ExtractSubjectType<Subjects>
        })
    }
}