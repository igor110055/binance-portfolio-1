import { makeRequest } from ".";

export function getAccount(params?: { recvWindow?: number }) {
  return makeRequest<Account>("/account", { method: "get", params });
}
