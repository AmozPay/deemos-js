export type Token = {
	name: string;
	description: string;
	tokenURI: string;
	symbol: string;
	endValidityTime: string;
	isValid: boolean;
	id: string;
	owner: string;
};

export type ResponseMessage = {
	success: boolean;
	message: string;
};

export type GetContentTokenURIResponse = {
	age: string;
	nationality: string;
	expirationTime: string;
};


export type GetAllTokensRes = {
	_hex: string;
	_isBigNumber: boolean;
};