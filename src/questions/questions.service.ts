import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, createQuestionDto: CreateQuestionDto) {
    return this.prisma.questions.create({
      data: { ...createQuestionDto, userId },
    });
  }

  findAll() {
    return this.prisma.questions.findMany({
      include: {
        answers: true,
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.questions.findUnique({
      where: { id },
      include: {
        answers: true,
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return this.prisma.questions.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  remove(id: number) {
    return this.prisma.questions.delete({ where: { id } });
  }
}
