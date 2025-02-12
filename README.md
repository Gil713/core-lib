# **WEB_PS_29 Setup and Development Guide**

## Setting Up the Development Environment

This project uses [Volta](https://volta.sh) to manage Node.js and Yarn versions. Install Volta, and it will automatically configure the correct versions of Node.js and Yarn when you work on this project.

To install Volta:

```bash
curl https://get.volta.sh | bash
```

## Setup

1. **Clone Environment Configuration**:

   ```bash
   cp .env.local .env
   ```

2. **Install Dependencies**:

   ```bash
   yarn install
   ```

## Development

1. **Start the Development Server**:

   ```bash
   yarn dev
   ```

   The server will run at [http://localhost:3000](http://localhost:3000).

   Tailwind: [http://localhost:3000/\_tailwind](http://localhost:3000/_tailwind).

## Theming

docs: https://www.shadcn-vue.com/docs/theming.html

- Following Utility classes on ShadCN

## Naming Convention

1. Using hyphenated-case to name folder component ex: category-card
2. Using PascalCase to name component file ex: CategoryCard.vue
3. try to avoid to declare use index.ts (modular) in auto-import folder (check in nuxt.config.ts imports)

## Code Convention

1. Using `type` over `interface`
2. Avoid to using `null`. Try to use `undefined`

- Ref: https://medium.com/@hbarcelos/why-i-banned-null-from-my-js-code-and-why-you-should-too-13df90323cfa

### Typing (service)
- Standard api response: 
   ```bash
   export type IApiResponse<T> = {
   code: number;
   status: string;
   data: T;
   message?: string;
   };
   ```
- If api response follow this standard form: the data type should have suffix ```*Data``` example ```IWithdrawBankData``` and wrapped out side by ```IApiResponse``` ex: ```IApiResponse<IWithdrawBankData>```
- If api response NOT follow this stand form: the response type should be CUSTOMIZED and have suffix ```*Response``` ex: ```IUpdateProfileInfoResponse```

## Work process note

- UI Flow:

   ` ./pages -> components/pages (api call here) -> organisms (optionals) -> molecules/atomics (optionals)`
   * Note: the UI flow is for reference. There are many case that simple enough to skip organisms or molecules/atomics


- If figma design <strong>NOT</strong> provide variable for color. Use this hex code directly in element
- Cookie:
   There are 3 places where cookies are configured:: 
   + plugins/03.set-client-cookie.ts: Used to set cookies in the response to the client, including device and marketing cookies.
   + plugins/04.api.ts: On the first load, the server is responsible for calling the API. Since no user-agent is detected during this stage, it must be configured through $api.
   + server/middleware/set-proxy-cookie.ts: Used to set some secret cookies before sending requests to the backend, such as brand_code, host, etc.

   * Some APIs depend on the user-agent
## Error handling

- Error -> $api plugin (NuxtError type) -> service

## Upgrade strategy

Logic:
- /composable, builder, service
- config: /image-providers, /helper
UI:
- UI: components/atomics || molecules - relevant asset
Asset:
- /public/relevant
- /asset/relevant
const:
- path.ts
- date-time-format
utils

Layer:

## TODO:
- Library:
    - Chia asset
    - Chia composables: composable tương tác với service composable tương tác với app
    - Chia type 
    - Chia const
    - Chia utils
    - ** Chia UI component thành library chung, update lại tất cả các component atomics/molecues
- Update html element follow seo best practices
- Update SEO meta tag in app using nuxt design
