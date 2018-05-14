import { createRandomString } from "../../common/utils/Random";

const KEY_SESSION = "WS-D-session";
export class Session {
  private readonly session: string;
  constructor() {
    if (!localStorage.getItem(KEY_SESSION)) {
      localStorage.setItem(KEY_SESSION, createRandomString(8));
    }
    this.session = localStorage.getItem(KEY_SESSION) || "";
  }

  get() {
    return this.session;
  }
}