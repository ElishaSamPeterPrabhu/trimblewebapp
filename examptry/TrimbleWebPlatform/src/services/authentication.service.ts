import { Injectable } from '@angular/core';
import { codeChallenger, codeVerifier, currentTimeInSec } from '../utils/auth-utils';
import { getItemFromLocalStorage, setItemInLocalStorage, removeAllItemsFromLocalStorage, } from '../utils/localstorage-utils';
import { env, get } from '../config/prod-config';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor() {

  }

  public GetAuthCodeUrl(): string {
    return getAuthCodeUrl();
  }

  public LogoutUser(): string {
    return getLogoutUrl();
  }

  public async ValidateAuthentication(): Promise<boolean> {
    let accessToken = getItemFromLocalStorage("accessToken")
    let authCode = getItemFromLocalStorage("authCode")
    let refreshToken = getItemFromLocalStorage("refreshToken")
    let expiresInTime = getItemFromLocalStorage("expiresIn")
    if (accessToken && accessToken !== "undefined" && authCode && refreshToken && expiresInTime) {
      return await this.CheckTokenValidity()
    }
    return false;
  }

  public async GetAuthCodeFromURLAndStoreInLocalStorage(URL: string) {
    const codeRegex = /[?&]code=([^&]+)/;
    const match = codeRegex.exec(URL);
    const authCodeValue = match && decodeURIComponent(match[1]);
    if (authCodeValue) {
      setItemInLocalStorage("authCode", authCodeValue)
    }
  }

  public async GetAccessToken(): Promise<string> {
    let authorization_code = getItemFromLocalStorage("authCode")

    let parameters = {
      "grant_type": "authorization_code",
      "code": authorization_code,
      "tenantDomain": get("tenantDomain"),
      "redirect_uri": get("redirectUrl"),
      "client_id": get("clientId"),
      "code_verifier": getItemFromLocalStorage("codeVerifier"),
      "code_challenge": codeChallenger(codeVerifier()),
      "code_challenge_method": "S256"
    }
    const formBody = Object.entries(parameters).map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value ?? '')).join('&')
    const response = await fetch(get("accessTokenUrl"), {
      headers: new Headers(
        {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      ),
      method: 'POST',
      body: formBody
    })
    const responseData = await response.json();
    setItemInLocalStorage("idToken", responseData.id_token)
    setItemInLocalStorage("accessToken", responseData.access_token)
    setItemInLocalStorage("refreshToken", responseData.refresh_token)
    setItemInLocalStorage("expiresIn", currentTimeInSec() + responseData.expires_in)
    let authBody: any = {
      idToken: responseData.id_token
    };
    try {
      const authResponse = await fetch(get("authUrl"), {
        headers: new Headers(
          {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${responseData.access_token}`
          }
        ),
        method: 'POST',
        body: JSON.stringify(authBody)
      })
      let authResponseData = await authResponse.json();
      setItemInLocalStorage("auth", JSON.stringify(authResponseData.body))
      if (!authResponse.ok) {
        throw new Error("Network response was not OK", authResponseData);
      }
    } catch (error) {
      console.log("Error occurred during Auth Init, ", error);
    }
    return responseData.access_token
  }

  public async CheckTokenValidity(): Promise<boolean> {
    const tokenExpiryTime: number | null = parseInt(getItemFromLocalStorage("expiresIn")!)
    console.log("Token Expiry Time: ", tokenExpiryTime)
    console.log("Current Time: ", currentTimeInSec())
    if (tokenExpiryTime) {
      if (tokenExpiryTime - currentTimeInSec() < 120) {
        return this.RefreshUsingRefreshToken();
      }
      else {
        return true;
      }
    }
    else {
      return true;
    }
  }

  public async RefreshUsingRefreshToken(): Promise<boolean> {
    let parameters = {
      "grant_type": "refresh_token",
      "refresh_token": getItemFromLocalStorage("refreshToken"),
      "client_id": get("clientId"),
      "code_verifier": getItemFromLocalStorage("codeVerifier"),
      "code_challenge": codeChallenger(codeVerifier()),
      "code_challenge_method": "S256"
    }
    const formBody = Object.entries(parameters).map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value ?? '')).join('&')
    const response: any = await fetch(get("accessTokenUrl"), {
      headers: new Headers(
        {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      ),
      method: 'POST',
      body: formBody,
    })

    if (response.status !== 200) {
      removeAllItemsFromLocalStorage()
      return false;
    }

    const responseData = await response.json();
    setItemInLocalStorage("idToken", responseData.id_token)
    setItemInLocalStorage("refreshToken", responseData.refresh_token)
    setItemInLocalStorage("accessToken", responseData.access_token)
    setItemInLocalStorage("expiresIn", currentTimeInSec() + responseData.expires_in)
    return true;
  }
}

const getAuthCodeUrl = () => {
  let authCodeUrl = get("authCodeUrl")
  authCodeUrl += "?client_id=" + get("clientId")
  authCodeUrl += "&response_type=code"
  authCodeUrl += "&scope=openid " + get("applicationName")
  authCodeUrl += "&redirect_uri=" + get("redirectUrl")
  authCodeUrl += "&code_challenge=" + codeChallenger(codeVerifier())
  authCodeUrl += "&code_challenge_method=S256"
  return authCodeUrl;
}


const getLogoutUrl = () => {
  let logoutUrl = get("logoutUrl")
  logoutUrl += "?id_token_hint =" + getItemFromLocalStorage("authCode")
  logoutUrl += "&post_logout_redirect_uri=" + get("logoutRedirectUrl")
  console.log("Logout URL: ", logoutUrl)
  localStorage.clear();
  return logoutUrl;
}


