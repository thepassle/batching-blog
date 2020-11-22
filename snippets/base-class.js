/* We create a new class that extends from the native HTMLElement */
class BatchingElement extends HTMLElement {
  constructor() {

    /* We now have to call `super` to make sure our element gets set up correctly */
    super();
    this.updateComplete = this.__createDeferredPromise();
  }

  async requestUpdate() {
    if (!this.updateRequested) {
      this.updateRequested = true;
      this.updateRequested = await false;
      this.update();
      this.__resolve();
      this.updateComplete = this.__createDeferredPromise();
    }
  }

  update() {}

  __createDeferredPromise() {
    return new Promise((resolve) => {
      this.__resolve = resolve;
    });
  }
}

/* We create a new class, MyElement, that extends from our BatchingElement base class */
class MyElement extends BatchingElement {

  constructor() {
    super();
    /* We attach a shadowRoot to our component for good measure */
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    /* And we call an initial render when our component gets connected to the DOM */
    this.update();
  }

  /**
   * This is our `update` function that will get triggered by the
   * `requestUpdate` method.
   *
   * Any time we set a property on this element, we'll also
   * trigger an update.
   */
  update() {
    console.log('updating!');
    this.shadowRoot.innerHTML = `
      <div>value of a: ${this.a}</div>
      <div>value of b: ${this.b}</div>
    `;
  }

  /**
   * And finally, we need some getters and setters to
   * actually be able to trigger updates 🙃
   *
   * Notice how much boilerplate this is, and how nice
   * LitElement makes this for us instead? 😩
   */
  set a(val) {
    this.__a = val;
    this.requestUpdate();
  }
  get a(){
    return this.__a;
  }

  set b(val) {
    this.__b = val;
    this.requestUpdate();
  }
  get b(){
    return this.__b;
  }
}

customElements.define("my-element", MyElement);