import { expect } from '@open-wc/testing';
import { stubMethod } from 'hanbi';
import { Batching } from '../snippets/simple-batching.js';

describe('simple-batching', () => {
  it('only calls `update` once', async () => {
    const batching = new Batching();
    const updateStub = stubMethod(batching, 'update');

    batching.a = 1;
    batching.b = 2;

    await 0;

    expect(updateStub.callCount).to.equal(1);
    updateStub.restore();
  });
});