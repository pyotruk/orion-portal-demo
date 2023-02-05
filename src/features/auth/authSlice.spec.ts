jest.mock("../../app/api", () => ({
  login: () => {
    return Promise.resolve({sessionToken: "foo"});
  },
}));

import {store} from "../../app/store";
import {LOCAL_STORAGE_SESSION_TOKEN_KEY, login, logout} from "./authSlice";

describe("auth reducer", () => {
  it("should login", async () => {
    await store.dispatch(login({user: "user", password: "pwd"}));
    const state = store.getState().auth;

    expect(localStorage.getItem(LOCAL_STORAGE_SESSION_TOKEN_KEY)).toBe("foo");
    expect(state.token).toBe("foo");
    expect(state.isPending).toBe(false);
    expect(state.error).toBe("");
  });

  it("should logout", () => {
    store.dispatch(logout());
    const state = store.getState().auth;

    expect(localStorage.getItem(LOCAL_STORAGE_SESSION_TOKEN_KEY)).toBe(null);
    expect(state.token).toBe("");
    expect(state.isPending).toBe(false);
    expect(state.error).toBe("");
  });
});
