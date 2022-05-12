# deemos-js
A js/ts package to verify Deemos Tokens validity, using Starton.io


# Installation
Install with `npm install deemos`

# Setup

You must create a [starton](https://app.starton.io/) developer account, and get an API key.


# Example Usage

```
import 'deemos' from deemos;

const api = deemos('YOUR_API_KEY');
api.isValid('TOKEN_TO_VERIFY').then((res) => console.log(res));
