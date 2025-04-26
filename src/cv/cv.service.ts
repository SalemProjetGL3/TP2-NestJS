// import { BaseService } from "@/common/base/base.service";
// import { CV } from "./cv.entity";

// export class CVService extends BaseService<CV> {
//   protected contextKey = "cvs";

//   findByUserId(userId: number): CV[] {
//     return this.findAll().filter((cv) => cv.userId === userId);
//   }

//   findBySkillId(skillId: number): CV[] {
//     return this.findAll().filter((cv) => cv.skillIds.includes(skillId));
//   }
// }

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CV } from './cv.entity'; // Gardé si tu as encore besoin du type, sinon on peut utiliser Prisma directement

@Injectable()
export class CVService {
  constructor(private readonly prisma: PrismaService) {}

  private mapPrismaCvToEntity(cv: any): CV {
    if (!cv) {
      throw new Error('CV not found');
    }
    return {
      id: cv.id,
      name: cv.name,
      age: cv.age,
      job: cv.job,
      userId: cv.userId,
      skillIds: cv.skills?.map(skill => skill.id) || [],
      user: cv.user,
      skills: cv.skills,
    };
  }
  

  // Trouver tous les CVs
  async findAll(): Promise<CV[]> {
    const cvs = await this.prisma.cv.findMany({
      include: { user: true, skills: true },
    });
    return cvs.map(this.mapPrismaCvToEntity);
  }

  // Trouver un CV par ID
  async findOne(id: number): Promise<CV> {
    const cv = await this.prisma.cv.findUnique({
      where: { id },
      include: { user: true, skills: true },
    });
    return this.mapPrismaCvToEntity(cv);
  }

  // Trouver les CVs d'un User
  async findByUserId(userId: number): Promise<CV[]> {
    const cvs = await this.prisma.cv.findMany({
      where: { userId },
      include: { user: true, skills: true },
    });
    return cvs.map(this.mapPrismaCvToEntity);
  }

  // Créer un CV
  async create(data: any): Promise<CV> {
    const cv = await this.prisma.cv.create({
      data,
      include: { user: true, skills: true },
    });
    return this.mapPrismaCvToEntity(cv);
  }
  

  // Mettre à jour un CV
  async update(id: number, data: any): Promise<CV> {
    const cv = await this.prisma.cv.update({
      where: { id },
      data,
      include: { user: true, skills: true },
    });
    return this.mapPrismaCvToEntity(cv);
  }

  async remove(id: number): Promise<CV> {
    const cv = await this.prisma.cv.delete({
      where: { id },
      include: { user: true, skills: true },
    });
    return this.mapPrismaCvToEntity(cv);
  }
}
