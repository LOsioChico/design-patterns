/**
 * Strategy Design Pattern
 *
 * Intent: Lets you define a family of algorithms, put each of them into a
 * separate class, and make their objects interchangeable.
 */

/**
 * The Context defines the interface of interest to clients.
 */
class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  // Usually, the Context accepts a strategy through the constructor, but also
  // provides a setter to change it at runtime.
  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  public doSomeBusinessLogic(): void {
    // ...

    const arr = ["b", "s", "t", "z", "a"];
    console.log(`Context Before: ${arr.join(",")}`);
    this.strategy.doMutableAlgorithm(arr);
    console.log(`Context After: ${arr.join(",")}`);

    // ...
  }
}

interface Strategy {
  doMutableAlgorithm(data: string[]): string[];
}

class SortStrategy implements Strategy {
  public doMutableAlgorithm(data: string[]): string[] {
    return data.sort();
  }
}

class ReversedDataStrategy implements Strategy {
  public doMutableAlgorithm(data: string[]): string[] {
    return data.reverse();
  }
}

const context = new Context(new SortStrategy());
console.log("Client: Strategy is set to normal sorting.");
context.doSomeBusinessLogic();

console.log("");

console.log("Client: Strategy is set to reverse sorting.");
context.setStrategy(new ReversedDataStrategy());
context.doSomeBusinessLogic();
