import { newE2EPage } from '@stencil/core/testing';

describe('hover-image', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<hover-image></hover-image>');

    const element = await page.find('hover-image');
    expect(element).toHaveClass('hydrated');
  });
});
