type IOptions = {
  method: "GET" | "HEAD" | "PATCH" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE";
  body: RequestInit["body"] | Record<string, unknown>;
  credentials: RequestCredentials;
  params: Record<string, unknown>;
  header: [string, string][] | Record<string, string> | Headers;
};

export default function createFetchOptionsBuilder() {
  const options: Partial<IOptions> = {};

  return {
    buildMethod(method: IOptions["method"]) {
      options.method = method;
      return this;
    },

    buildBody(body: IOptions["body"]) {
      options.body = body;
      return this;
    },

    buildCredentials(credentials: IOptions["credentials"]) {
      options.credentials = credentials;
      return this;
    },

    buildParams(params: IOptions["params"]) {
      options.params = params;
      return this;
    },

    buildHeader(header: IOptions["header"]) {
      options.header = header;
      return this;
    },

    build(): Partial<IOptions> {
      return options;
    },
  };
}
