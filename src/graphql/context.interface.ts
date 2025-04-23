import { Skill, User, CV } from '../database';

export interface AppContext {
  db: {
    skills: Skill[];
    users: User[];
    cvs: CV[];
  };
}