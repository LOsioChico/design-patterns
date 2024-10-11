/**
 * Observer Design Pattern
 *
 * Intent: Lets you define a subscription mechanism to notify multiple objects
 * about any events that happen to the object they're observing.
 *
 * Note that there's a lot of different terms with similar meaning associated
 * with this pattern. Just remember that the Subject is also called the
 * Publisher and the Observer is often called the Subscriber and vice versa.
 * Also the verbs "observe", "listen" or "track" usually mean the same thing.
 */

interface Subject {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(): void;
}

interface Observer {
  update(): void;
}

class ConcreteSubject implements Subject {
  public state: number = 0;
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    const exists = this.observers.includes(observer);
    if (exists)
      console.log(
        `Subject: Observer ${observer.constructor.name} has already been subscribed!`
      );
    else {
      console.log(`Subject: Subscribed ${observer.constructor.name} observer.`);
      this.observers.push(observer);
    }
  }

  unsubscribe(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1)
      return console.log(
        `Subject: Nonexistent ${observer.constructor.name} observer.`
      );

    this.observers.splice(observerIndex, 1);
    console.log(`Subject: Unsuscribed ${observer.constructor.name} observer.`);
  }

  notify(): void {
    console.log("Subject: Notifying observers...");
    for (const observer of this.observers) {
      observer.update();
    }
  }

  /**
   * Usually, the subscription logic is only a fraction of what a Subject can
   * really do. Subjects commonly hold some important business logic, that
   * triggers a notification method whenever something important is about to
   * happen (or after it).
   */
  public someBusinessLogic(): void {
    console.log("\nSubject: I'm doing something important.");
    this.state = Math.floor(Math.random() * (10 + 1));

    console.log(`Subject: My state has just changed to: ${this.state}`);
    this.notify();
  }
}

class ConcreteObserverA implements Observer {
  public update(): void {
    console.log("ConcreteObserverA: Reacted to the event.");
  }
}

class ConcreteObserverB implements Observer {
  public update(): void {
    console.log("ConcreteObserverB: Reacted to the event.");
  }
}

/**
 * The client code.
 */

const subject = new ConcreteSubject();

const observer1 = new ConcreteObserverA();
subject.subscribe(observer1);

const observer2 = new ConcreteObserverB();
subject.subscribe(observer2);

subject.someBusinessLogic();
subject.someBusinessLogic();

subject.unsubscribe(observer2);

subject.someBusinessLogic();
