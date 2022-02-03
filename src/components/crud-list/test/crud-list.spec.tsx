import { newSpecPage } from '@stencil/core/testing';
import { CrudList } from '../crud-list';

describe('crud-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CrudList],
      html: `<crud-list></crud-list>`,
    });
    expect(page.root).toEqualHtml(`
      <crud-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </crud-list>
    `);
  });
});
