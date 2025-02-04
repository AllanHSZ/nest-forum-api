import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AnswersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(userId: number, questionId: number, createAnswerDto: CreateAnswerDto) {
    return this.prismaService.answers.create({
      data: {
        body: createAnswerDto.body,
        user: {
          connect: { id: userId },
        },
        question: {
          connect: { id: questionId },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.answers.findMany();
  }

  findOne(id: number) {
    return this.prismaService.answers.findUnique({ where: { id } });
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return this.prismaService.answers.update({
      where: { id },
      data: updateAnswerDto,
    });
  }

  remove(id: number) {
    return this.prismaService.answers.delete({ where: { id } });
  }
}
