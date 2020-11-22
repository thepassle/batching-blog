import { expect } from '@open-wc/testing';
import { spy } from 'sinon';
import { Batching } from '../snippets/simple-batching-update-complete.js';

describe('simple-batching-update-complete', () => {
  it('only calls `update` once', async () => {
    const batching = new Batching();
    const updateSpy = spy(batching, 'update');

    batching.a = 1;
    batching.b = 2;

    await batching.updateComplete;

    expect(updateSpy).to.have.been.calledOnce;
    updateSpy.restore();
  });

  it('calls `update` twice', async () => {
    const batching = new Batching();
    const updateSpy = spy(batching, 'update');

    batching.a = 1;
    batching.b = 2;

    await batching.updateComplete;

    batching.a = 2;

    await batching.updateComplete;

    expect(updateSpy).to.have.been.calledTwice;
    updateSpy.restore();
  });
});