class Logger {
  private static instance: Logger;
  public readonly entries: string[] = [];

  // Should be private to prevent outside direct calls with `new` operator
  private constructor() {}

  public static get getInstance(): Logger {
    if (!Logger.instance) Logger.instance = new Logger();
    return Logger.instance;
  }

  public add(log: string) {
    this.entries.push(log);
  }
}

const logger1 = Logger.getInstance;
const logger2 = Logger.getInstance;

logger1.add("Hello World");
logger2.add("Hi!");

console.log(logger1.entries); // ["Hello World", "Hi!"]
console.log(logger2.entries); // ["Hello World", "Hi!"]
