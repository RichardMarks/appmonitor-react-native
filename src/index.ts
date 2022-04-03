const DEFAULT_HOST = "http://localhost";
const DEFAULT_PORT = 7000;

const configuration = {
  host: DEFAULT_HOST,
  port: DEFAULT_PORT,
  debug: false,
};

const POST_EVENT_ENDPOINT = "/appmonitor/event";
const GET_EVENTS_ENDPOINT = "/appmonitor/events";

export function config({
  host,
  port,
  debug,
}: {
  host?: string;
  port?: number;
  debug?: boolean;
}): void {
  configuration.port = port || DEFAULT_PORT;
  configuration.host = host || DEFAULT_HOST;
  configuration.debug = Boolean(debug);
}

export async function sendEvent({
  name,
  message,
  ...details
}: {
  [x: string]: any;
  name: string;
  message: string;
}): Promise<unknown> {
  const payload = {
    name,
    message,
    ...details,
  };
  try {
    const url = `${configuration.host}:${configuration.port}${POST_EVENT_ENDPOINT}`;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    configuration.debug && console.log(`fetching ${url}`);
    const response = await fetch(url, options);
    const result = await response.json();
    configuration.debug && console.log(result);
    return result;
  } catch (err) {
    configuration.debug && console.error(err);
    return false;
  }
}

export async function getEvents(): Promise<[]> {
  try {
    const url = `${configuration.host}:${configuration.port}${GET_EVENTS_ENDPOINT}`;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    configuration.debug && console.log(`fetching ${url}`);
    const response = await fetch(url, options);
    const result = await response.json();
    configuration.debug && console.log(result);
    return result;
  } catch (err) {
    configuration.debug && console.error(err);
    return [];
  }
}

export const AppMonitor = {
  config,
  sendEvent,
  getEvents,
};

export default AppMonitor;
