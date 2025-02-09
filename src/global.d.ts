import ca from "./messages/ca.json";

type Messages = typeof ca;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}
