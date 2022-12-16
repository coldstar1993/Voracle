import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export const API_CODE_SUCCESS = 0;

export class ApiResp<T> {
  @IsNumber()
  errCode: number;

  @IsString()
  errMsg: string;

  @IsOptional()
  @IsObject()
  data: T | null;

  constructor(errCode: number, errMsg: string, data: T) {
    this.errCode = errCode;
    this.errMsg = errMsg;
    this.data = data;
  }

  static Ok<T>(data: T): ApiResp<T> {
    return new ApiResp(API_CODE_SUCCESS, '', data);
  }

  static Err(errCode: number, errMsg: string): ApiResp<null> {
    return new ApiResp(errCode, errMsg, null);
  }
}
