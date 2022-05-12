import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Token, GetAllTokensRes } from './types';

import {
	startonBaseUrl,
	contractUri
} from './config';


class Deemos {
	private customAxios: AxiosInstance;
	constructor(apiKey: string) {
		this.customAxios =  axios.create({
			headers: {
				'x-api-key': apiKey,
			},
			baseURL: startonBaseUrl,
		});
	}

	private req(func: string, param: any[]) {
		return this.customAxios.post(`${contractUri}/read`, {
			functionName: func,
			params: [...param],
		});
	};

	async balanceOf(address: string): Promise<number> {
		const res: AxiosResponse = await this.req('balanceOf', [address]);
		return parseInt(res.data.response, 10);
	};

	async ownerOf(id: number): Promise<string> {
		const res: AxiosResponse = await this.req('ownerOf', [id]);
		return res.data.response;
	};

	async isValid(id: number): Promise<boolean> {
		const res: AxiosResponse = await this.req('isvalid', [id]);
		return res.data.response === true;
	};

	async hasValid(address: string, id: number): Promise<boolean> {
		const res: AxiosResponse = await this.req('hasValid', [address, id]);
		return res.data.response === true;
	};

	async getTokenInfos(id: number): Promise<Token> {
		const res: AxiosResponse = await this.req('getTokenInfos', [id]);
		return {
			name: res.data.response[0],
			description: res.data.response[1],
			symbol: res.data.response[2],
			tokenURI: res.data.response[3],
			// eslint-disable-next-line no-underscore-dangle
			endValidityTime: parseInt(res.data.response[4]._hex, 16).toString(10),
			isValid: res.data.response[5],
			// eslint-disable-next-line no-underscore-dangle
			id: parseInt(res.data.response[6]._hex, 16).toString(10),
			owner: res.data.response[7],
		};
	};

	async getAllTokens (address: string): Promise<number[]> {
		const res: AxiosResponse = await this.req('getAllTokens', [address]);
		// eslint-disable-next-line no-underscore-dangle
		return res.data.response.map((id: GetAllTokensRes) => parseInt(id._hex, 16));
	};
}

function createDeemosInstance(apiKey: string): Deemos {
	return new Deemos(apiKey);
}

export default createDeemosInstance;
