import { IUser } from "./user";
import { ICandidate } from "./candidate";

export enum DataStatus {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  IDLE = "IDLE",
}

export interface userState {
  error: string | null;
  status: DataStatus;
  user: null | IUser;
}

export interface candidateState {
  error: string | null;
  status: DataStatus;
  candidates: ICandidate[];
}