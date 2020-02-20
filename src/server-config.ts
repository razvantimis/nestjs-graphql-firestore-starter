const isProduction = process.env.NODE_ENV === "production";
if (!isProduction) {
  require("json-dotenv")();
}

export function getServerConfig(): ServerConfig {
  const config = JSON.parse(process.env.SERVER_CONFIG as any) as ServerConfig;
  config.isProduction = isProduction;
  return config;
}
export interface ServerConfig {
  isProduction: boolean;
  port: number;
  apolloConfig: {
    engineApiKey: string;
  };
  firebase: {
    serviceAccount: any;
    databaseURL: string;
  };
}
