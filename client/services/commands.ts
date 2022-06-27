import {
  CreateProjectRequestDto,
  CreateSubtaskCommand,
  CreateTodoCommand,
  LoginUserRequest,
  LoginUserResponse,
  ProjectResponse,
  RegisterUserRequest,
  TodoResponseDto,
  UpdateSubtaskStatusCommandDto,
  UserResponse,
} from "../types";
import { api } from "../utils/apiAxiosInstance";
import * as Gateway from "./CommandsGateway";

export const registerUserCommand = (
  body: Omit<RegisterUserRequest, "confirmPassword">
) =>
  api()
    .post<UserResponse>(Gateway.RegisterUserURL(), body)
    .then((d) => d.data);

export const loginUserCommand = (body: LoginUserRequest) =>
  api()
    .post<LoginUserResponse>(Gateway.LoginUserURL(), body)
    .then((d) => d.data);

export const createTodoCommand = (
  token: string,
  id: number,
  body: CreateTodoCommand
) =>
  api(token)
    .post<TodoResponseDto>(Gateway.CreateTodoURL(id), body)
    .then((d) => d.data);

export const createSubtaskCommand = (
  token: string,
  id: number,
  body: CreateSubtaskCommand
) =>
  api(token)
    .post<CreateSubtaskCommand>(Gateway.CreateSubtaskURL(id), body)
    .then((d) => d.data);

export const updateSubtaskStatusCommand = (
  token: string,
  id: number,
  subTaskId: number,
  body: UpdateSubtaskStatusCommandDto
) =>
  api(token)
    .patch<CreateSubtaskCommand>(
      Gateway.UpdateSubtaskStatusURL(id, subTaskId),
      body
    )
    .then((d) => d.data);

export const createProjectCommand = (
  token: string,
  body: CreateProjectRequestDto
) =>
  api(token)
    .post<ProjectResponse>(Gateway.CreateProjectURL(), body)
    .then((d) => d.data);
