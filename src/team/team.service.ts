import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from './schema/team.schema';
import { CreateTeamDto } from './dto/create-team.dto';
@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<TeamDocument>,
  ) {}

  async getAllTeam(): Promise<Team[]> {
    return await this.teamModel.find();
  }

  async createNewTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    return await this.teamModel.create(createTeamDto);
  }
}
