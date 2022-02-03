import { Component, Host, h, Event, EventEmitter, Prop, State } from '@stencil/core';
import { Page } from '../../core';
import { RestService } from '../../core/services/rest.service';

@Component({
  tag: 'crud-detail',
  styleUrl: 'crud-detail.css',
  shadow: true,
})
export class CrudDetail {
  @Event({ eventName: 'pageChange' })
  changePageEmitter: EventEmitter<Page>;

  @Prop()
  public objectId: string;

  @Prop()
  public restService: RestService;

  @State()
  private currentObj: object;

  changePage(page: Page) {
    this.changePageEmitter.emit(page);
  }

  async componentWillLoad() {
    this.currentObj = await this.restService.detail(this.objectId);
  }

  render() {
    return (
      <Host>
        <a onClick={() => this.changePage(Page.list)}>Go to list</a>
        <pre>
          {JSON.stringify(this.currentObj, undefined, 4)}
        </pre>
      </Host>
    );
  }

}
