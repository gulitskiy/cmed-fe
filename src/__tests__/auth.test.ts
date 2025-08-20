import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import * as authConfig from '../authConfig'
import { signInPopup, signOutPopup, getActiveAccount } from '../auth'

describe('auth wrapper', () => {
  let originalMsal: any

  beforeEach(() => {
    originalMsal = { ...authConfig.msalInstance }
  })

  afterEach(() => {
    // restore
    ;(authConfig.msalInstance as any).loginPopup = originalMsal.loginPopup
    ;(authConfig.msalInstance as any).logoutPopup = originalMsal.logoutPopup
    ;(authConfig.msalInstance as any).getAllAccounts = originalMsal.getAllAccounts
    vi.resetAllMocks()
  })

  it('signInPopup returns account on success', async () => {
    const fakeAccount = { username: 'user@example.com' }
    ;(authConfig.msalInstance as any).loginPopup = vi.fn().mockResolvedValue({ account: fakeAccount })

    const res = await signInPopup()
    expect(res.success).toBe(true)
    expect(res.account).toEqual(fakeAccount)
  })

  it('signInPopup returns error on failure', async () => {
    const err = new Error('nope')
    ;(authConfig.msalInstance as any).loginPopup = vi.fn().mockRejectedValue(err)

    const res = await signInPopup()
    expect(res.success).toBe(false)
    expect(res.error).toBe(err)
  })

  it('signOutPopup returns success on success', async () => {
    ;(authConfig.msalInstance as any).logoutPopup = vi.fn().mockResolvedValue(undefined)

    const res = await signOutPopup()
    expect(res.success).toBe(true)
  })

  it('signOutPopup returns error on failure', async () => {
    const err = new Error('logout failed')
    ;(authConfig.msalInstance as any).logoutPopup = vi.fn().mockRejectedValue(err)

    const res = await signOutPopup()
    expect(res.success).toBe(false)
    expect(res.error).toBe(err)
  })

  it('getActiveAccount returns first account when present', () => {
    const accounts = [{ username: 'a' }, { username: 'b' }]
    ;(authConfig.msalInstance as any).getAllAccounts = vi.fn().mockReturnValue(accounts)

    const a = getActiveAccount()
    expect(a).toEqual(accounts[0])
  })

  it('getActiveAccount returns undefined when no accounts', () => {
    ;(authConfig.msalInstance as any).getAllAccounts = vi.fn().mockReturnValue([])

    const a = getActiveAccount()
    expect(a).toBeUndefined()
  })
})
