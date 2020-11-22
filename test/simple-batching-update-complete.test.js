import { expect } from '@open-wc/testing';
import { stubMethod } from 'hanbi';
import { Batching } from '../snippets/simple-batching-update-complete.js';

describe('simple-batching-update-complete', () => {
  it('only calls `update` once', async () => {
    const batching = new Batching();
    const updateStub = stubMethod(batching, 'update');

    batching.a = 1;
    batching.b = 2;

    await batching.updateComplete;

    expect(updateStub.callCount).to.equal(1);
    updateStub.restore();
  });

  it('calls `update` twice', async () => {
    const batching = new Batching();
    const updateStub = stubMethod(batching, 'update');

    batching.a = 1;
    batching.b = 2;

    await batching.updateComplete;

    batching.a = 2;

    await batching.updateComplete;

    expect(updateStub.callCount).to.equal(2);
    updateStub.restore();
  });
});