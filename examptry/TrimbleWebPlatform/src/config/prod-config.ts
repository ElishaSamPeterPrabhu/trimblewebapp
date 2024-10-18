// const APP_URL_BASE = "https://lemon-hill-0f0bd0a0f.5.azurestaticapps.net/authenticated";
const APP_URL_BASE = "http://localhost:4300/authenticated";
// const APP_LOGOUT_URL = "https://lemon-hill-0f0bd0a0f.5.azurestaticapps.net/authentication";
const APP_LOGOUT_URL = "http://localhost:4300/authentication";
const TID_URL_BASE = "https://id.trimble.com"

const TDAAS_ASSISTANT_ID = "modusissueassistant"

const TRIMBLE_ASSISTANT_AGENTS_URL = "https://agw.construction-integration.trimble.cloud/trimbledeveloperprogram/assistants/v1/agents/"

export const env = {
    clientId: "d9d21ed0-14e7-4887-ba4b-d12ac2f2f466",
    applicationName: "TDAAS",
    authCodeUrl: `${TID_URL_BASE}/oauth/authorize`,
    accessTokenUrl: `${TID_URL_BASE}/oauth/token`,
    logoutUrl: `${TID_URL_BASE}/oauth/logout`,
    redirectUrl: `${APP_URL_BASE}`,
    tenantDomain: "Trimble.com",
    logoutRedirectUrl: `${APP_LOGOUT_URL}`,
    trimbleAssistantMessageURL: `${TRIMBLE_ASSISTANT_AGENTS_URL}${TDAAS_ASSISTANT_ID}/messages`,
    applicationHomeUrl: `${APP_URL_BASE}`,
    redirectPath: "/app/auth/tid-redirect",
    registerPath: "/app/sign-out"
}

export const get = (key: string) => {
    return env[key as keyof typeof env];
  }
