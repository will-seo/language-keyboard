## Setup

1. Install `Node.js`:
https://nodejs.org/en/download

2. Install `Yarn`:
https://yarnpkg.com/getting-started/install

3. Install dependencies - open a terminal and run:

```bash
yarn
```

## Getting Started

1. To run the development server:

```bash
yarn dev
```

2. Open http://localhost:3000 in your browser to see the result.

## Testing ads locally

1. Install `mkcert` (https://github.com/FiloSottile/mkcert).

2. Generate self-signed certificate for `languagekeyboard.net`.

```bash
mkcert -install
mkcert languagekeyboard.net
```

3. Add to hosts file:

```
127.0.0.1 languagekeyboard.net
```

4. Proxy development server via `local-ssl-proxy` (https://www.npmjs.com/package/local-ssl-proxy):

```bash
npx local-ssl-proxy --key languagekeyboard.net-key.pem --cert languagekeyboard.net.pem --source 443 --target 3000
```

5. Go to https://languagekeyboard.net/ - you should see the locally hosted site.

6. Remove from hosts file when done.
