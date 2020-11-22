export class Batching {
  constructor() {

    /**
     * We initialize an `updateComplete` property with a new
     * Promise that we'll only resolve once `this.update()`
     * has been called
     */
    this.updateComplete = this.__createDeferredPromise();
  }

  async requestUpdate() {
    if (!this.updateRequested) {
      this.updateRequested = true;
      this.updateRequested = await false;
      this.update();

      /* When our update is, in fact, complete we resolve the Promise that was assigned to the `updateComplete` property ... */
      this.__resolve();

      /* ... And we assign a new promise to updateComplete for the next update */
      this.updateComplete = this.__createDeferredPromise();
    }
  }

  update() {
    console.log("updating!");
  }

  /**
   * Creates a new deferred promise that we can await,
   * and assign the `resolve` function to `this.__resolve`,
   * so we can resolve the promise after we call `this.update()`
   */
  __createDeferredPromise() {
    return new Promise((resolve) => {
      this.__resolve = resolve;
    });
  }

  set a(val) {
    this.__a = val;
    this.requestUpdate();
  }

  set b(val) {
    this.__b = val;
    this.requestUpdate();
  }
}

/* We use an IIFE (Immediately Invoked Function Expression), because top-level await is not a thing yet 😑 */
(async () => {
  /* We instantiate a new instance of our class */
  const batching = new Batching();

  /* Set multiple properties in a row */
  batching.a = 1;
  batching.b = 2;

  /* And this is where we `await` an update */
  await batching.updateComplete;

  /* We then assign another property */
  batching.b = 3;

  /**
   * 🎉 The result:
   * "updating!" is logged to the console twice!
   */
})();