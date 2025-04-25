import { CV } from '../cv/cv.entity';
import { Skill } from '../skill/skill.entity';  
import { User } from '../user/user.entity';

export interface AppContext {
  db: {
    skills: Skill[];
    users: User[];
    cvs: CV[];
  };
}