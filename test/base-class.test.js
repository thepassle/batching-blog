import { expect } from '@open-wc/testing';
import { spy } from 'sinon';
import { MyElement } from '../snippets/base-class.js';

describe('base-class', () => {
  it('only calls `update` once', async () => {
    const element = new MyElement();
    const updateSpy = spy(element, 'update');

    element.a = 1;
    element.b = 2;

    await element.updateComplete;

    expect(updateSpy).to.have.been.calledOnce;
    updateSpy.restore();
  });

  it('calls `update` twice', async () => {
    const element = new MyElement();
    const updateSpy = spy(element, 'update');

    element.a = 1;
    element.b = 2;

    await element.updateComplete;

    element.a = 2;

    await element.updateComplete;

    expect(updateSpy).to.have.been.calledTwice;
    updateSpy.restore();
  });
});