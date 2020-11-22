import { expect } from '@open-wc/testing';
import { stubMethod } from 'hanbi';
import { MyElement } from '../snippets/base-class.js';

describe('base-class', () => {
  it('only calls `update` once', async () => {
    const element = new MyElement();
    const updateStub = stubMethod(element, 'update');

    element.a = 1;
    element.b = 2;

    await element.updateComplete;

    expect(updateStub.callCount).to.equal(1);
    updateStub.restore();
  });

  it('calls `update` twice', async () => {
    const element = new MyElement();
    const updateStub = stubMethod(element, 'update');

    element.a = 1;
    element.b = 2;

    await element.updateComplete;

    element.a = 2;

    await element.updateComplete;

    expect(updateStub.callCount).to.equal(2);
    updateStub.restore();
  });
});