import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { GOOGLE_API } from './domain';

@Injectable()
export class GoogleApiService {
        constructor(private readonly httpService: HttpService) {}

        getUserProfile(): Observable<AxiosResponse<any>> {
                return this.httpService.get(`${GOOGLE_API}/user-profile`);
        }

        getUsername(): Observable<AxiosResponse<any>> {
                return this.httpService.get(`${GOOGLE_API}/username`);
        }

        getVerifyToken(): Observable<AxiosResponse<any>> {
                return this.httpService.get(`${GOOGLE_API}/verify-token`);
        }
}
