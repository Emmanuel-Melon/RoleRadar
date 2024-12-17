import { Controller, Get } from '@nestjs/common';
import { CandidateService } from './candidates.service';

@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Get()
  async findAll() {
    return this.candidateService.findAll();
  }
}
