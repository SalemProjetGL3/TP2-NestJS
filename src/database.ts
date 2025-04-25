import { CV } from "./cv/cv.entity";
import { User } from "./user/user.entity"; 
import { Skill } from "./skill/skill.entity";

export const skills: Skill[] = [
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'TypeScript' },
    { id: 3, name: 'GraphQL' },
    { id: 4, name: 'NestJS' },
];

export const users: User[] = [
    { id: 1, name: 'Alice Dupont', email: 'alice@example.com' },
    { id: 2, name: 'Bob Martin', email: 'bob@example.com' },
];

export const cvs: CV[] = [
    {
        id: 1,
        name: 'CV Alice',
        age: 30,
        job: 'Développeuse Fullstack',
        userId: 1,
        skillIds: [1, 2, 3],
    },
    {
        id: 2,
        name: 'CV Bob',
        age: 35,
        job: 'Architecte Logiciel',
        userId: 2,
        skillIds: [2, 3, 4],
    },
];