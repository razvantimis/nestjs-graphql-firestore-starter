
export function getLogger(tagName: string) {
  let msgWithTag = (msg: any) => {
    if (msg instanceof Object)
      msg = JSON.stringify(msg, null, 2);
    return `${tagName}: ${msg}`;
  };
  return {
    info: (msg: any, ...args: any[]) => console.log(msgWithTag(msg), ...args),
    debug: (msg: any, ...args: any[]) => console.log(msgWithTag(msg), ...args),
    warn: (msg: any, ...args: any[]) => console.log(msgWithTag(msg), ...args),
    error: (msg: any, ...args: any[]) => {
      console.log(msg);
    }
  };
}