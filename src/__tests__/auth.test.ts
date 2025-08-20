import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import * as authConfig from "../authConfig";
import { signInPopup, signOutPopup, getActiveAccount } from "../auth";
import type {
  PublicClientApplication,
  AccountInfo,
  AuthenticationResult,
} from "@azure/msal-browser";

describe("auth wrapper", () => {
  let originalMsal: PublicClientApplication;

  beforeEach(() => {
    originalMsal =
      authConfig.msalInstance as unknown as PublicClientApplication;
  });

  afterEach(() => {
    // restore
    const msal =
      authConfig.msalInstance as unknown as Partial<PublicClientApplication>;
    msal.loginPopup = originalMsal.loginPopup;
    msal.logoutPopup = originalMsal.logoutPopup;
    msal.getAllAccounts = originalMsal.getAllAccounts;
    vi.resetAllMocks();
  });

  it("signInPopup returns account on success", async () => {
    const fakeAccount = { username: "user@example.com" };
    const msal =
      authConfig.msalInstance as unknown as Partial<PublicClientApplication>;
    msal.loginPopup = vi
      .fn()
      .mockResolvedValue({ account: fakeAccount } as AuthenticationResult);

    const res = await signInPopup();
    expect(res.success).toBe(true);
    expect(res.account).toEqual(fakeAccount);
  });

  it("signInPopup returns error on failure", async () => {
    const err = new Error("nope");
    const msal2 =
      authConfig.msalInstance as unknown as Partial<PublicClientApplication>;
    msal2.loginPopup = vi.fn().mockRejectedValue(err);

    const res = await signInPopup();
    expect(res.success).toBe(false);
    expect(res.error).toBe(err);
  });

  it("signOutPopup returns success on success", async () => {
    const msal3 =
      authConfig.msalInstance as unknown as Partial<PublicClientApplication>;
    msal3.logoutPopup = vi.fn().mockResolvedValue(undefined);

    const res = await signOutPopup();
    expect(res.success).toBe(true);
  });

  it("signOutPopup returns error on failure", async () => {
    const err = new Error("logout failed");
    const msal4 =
      authConfig.msalInstance as unknown as Partial<PublicClientApplication>;
    msal4.logoutPopup = vi.fn().mockRejectedValue(err);

    const res = await signOutPopup();
    expect(res.success).toBe(false);
    expect(res.error).toBe(err);
  });

  it("getActiveAccount returns first account when present", () => {
    const accounts = [{ username: "a" }, { username: "b" }];
    const msal5 =
      authConfig.msalInstance as unknown as Partial<PublicClientApplication>;
    msal5.getAllAccounts = vi.fn().mockReturnValue(accounts as AccountInfo[]);

    const a = getActiveAccount();
    expect(a).toEqual(accounts[0]);
  });

  it("getActiveAccount returns undefined when no accounts", () => {
    const msal6 =
      authConfig.msalInstance as unknown as Partial<PublicClientApplication>;
    msal6.getAllAccounts = vi.fn().mockReturnValue([] as AccountInfo[]);

    const a = getActiveAccount();
    expect(a).toBeUndefined();
  });
});
