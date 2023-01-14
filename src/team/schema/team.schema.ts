import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type TeamDocument = HydratedDocument<Team>;

@Schema()
export class Team {
  @Prop({ required: true })
  leader: string;

  @Prop()
  members: [];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
