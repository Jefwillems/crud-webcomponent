import { newSpecPage } from '@stencil/core/testing';
import { CrudComponent } from '../crud-component';

describe('crud-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CrudComponent],
      html: `<crud-component></crud-component>`,
    });
    expect(page.root).toEqualHtml(`
      <crud-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </crud-component>
    `);
  });
});
