export class CreateTaskDto {
  readonly team: string;
  readonly assignee: string;
  readonly dueDate: string;
  readonly status?: string;
}
