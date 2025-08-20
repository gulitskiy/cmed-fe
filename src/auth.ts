import type { AccountInfo, AuthenticationResult, PopupRequest } from "@azure/msal-browser"
import { msalInstance } from "./authConfig"

// Small typed wrapper around msalInstance for the app
export type SignInResult = {
  success: boolean
  account?: AccountInfo
  error?: unknown
}

export async function signInPopup(request?: PopupRequest): Promise<SignInResult> {
  try {
    const result: AuthenticationResult = await msalInstance.loginPopup(request)
    return { success: true, account: result.account ?? undefined }
  } catch (error) {
    return { success: false, error }
  }
}

export async function signOutPopup(): Promise<{ success: boolean; error?: unknown }> {
  try {
    await msalInstance.logoutPopup()
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

export function getActiveAccount(): AccountInfo | undefined {
  const accounts = msalInstance.getAllAccounts()
  return accounts && accounts.length > 0 ? accounts[0] : undefined
}
