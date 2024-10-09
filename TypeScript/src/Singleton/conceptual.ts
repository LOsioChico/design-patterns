/**
 * Singleton Design Pattern
 *
 * Intent: Lets you ensure that a class has only one instance, while providing a
 * global access point to this instance.
 */

/**
 * The Singleton class defines an `instance` getter, that lets clients access
 * the unique singleton instance.
 */
class Singleton {
  private static instance: Singleton;

  // Should be private to prevent outside direct calls with `new` operator
  private constructor() {}

  public static get getInstance(): Singleton {
    if (!Singleton.instance) Singleton.instance = new Singleton();
    return Singleton.instance;
  }

  // The singleton can define some business logic, which can be
  // executed on its instance.
  public someBusinessLogic() {}
}

const s1 = Singleton.getInstance;
const s2 = Singleton.getInstance;

const message = s1 === s2 ? "Successful Singleton" : "Failed Singleton";
console.log(message); // Successful Singleton

// However, the Singleton pattern is considered an anti-pattern in JS/TS
// Other ways to achieve a similar result are:

// Export the instance of the class without implementing the Singleton pattern
class SingletonAlternative {
  someBusinessLogic() {}
}

export const singletonInstanceClass = new SingletonAlternative();

// Just create an object with the methods and reuse it
export const singletonInstanceObj = {
  someBusinessLogic: () => {},
};
