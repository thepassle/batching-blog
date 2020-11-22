/* We create a new class ... */
export class Batching {

  /* ... that has a `requestUpdate` method */
  async requestUpdate() {

    /**
     * In here, we need a check to see if an update has already previously been requested.
     * If an update already is already requested, we don't want to do any unnecessary work!
     */
    if (!this.updateRequested) {

      /**
       * If no update was previously requested, we set this
       * flag to `true` to avoid doing unnecessary work in
       * case `requestUpdate` might get called another (or several) times
       */
      this.updateRequested = true;

      /**
       * ... and _this_ is where the magic happens;
       * This schedules a microtask that executes once JavaScript has
       * finished executing, and since we guard against any other
       * incoming calls for `requestUpdate`, we only do work once
       */
      this.updateRequested = await false;

      /* Finally, we call our `update` method, which can then render some DOM, or do whatever */
      this.update();
    }
  }

  update() {
    console.log("updating!");
  }

  /**
   * For demonstration purposes we add some setters here,
   * that when given a new value, will request an update
   */
  set a(val) {
    this.__a = val;
    this.requestUpdate();
  }

  set b(val) {
    this.__b = val;
    this.requestUpdate();
  }
}

/* We instantiate a new instance of our class */
const batching = new Batching();

/* And we set multiple properties */
batching.a = 1;
batching.b = 2;

/**
* 🎉 The result:
* "updating!" is only logged to the console once because of the batching!
*/