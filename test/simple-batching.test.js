import { expect } from '@open-wc/testing';
import { spy } from 'sinon';
import { Batching } from '../snippets/simple-batching.js';

describe('simple-batching', () => {
  it('only calls `update` once', async () => {
    const batching = new Batching();
    const updateSpy = spy(batching, 'update');

    batching.a = 1;
    batching.b = 2;

    await 0;

    expect(updateSpy).to.have.been.calledOnce;
    updateSpy.restore();
  });
});