import { newSpecPage } from '@stencil/core/testing';
import { CrudDetail } from '../crud-detail';

describe('crud-detail', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CrudDetail],
      html: `<crud-detail></crud-detail>`,
    });
    expect(page.root).toEqualHtml(`
      <crud-detail>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </crud-detail>
    `);
  });
});
