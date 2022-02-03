import { Component, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { GoToDetailPageEvent, Page } from '../../core';
import { RestService } from '../../core/services/rest.service';

@Component({
  tag: 'crud-list',
  styleUrl: 'crud-list.css',
  shadow: true,
})
export class CrudList {

  @Event({ eventName: 'pageChange' })
  changePageEmitter: EventEmitter<Page>;

  @Event({ eventName: 'goToDetail' })
  goToDetailEmitter: EventEmitter<GoToDetailPageEvent>;

  @Prop()
  public restService: RestService;

  @State()
  public objectList: object[];

  private get objectHeaders(): string[] {
    const headers = [];
    if (!this.objectList) return headers;
    const first = this.objectList[0];
    return Object.keys(first);
  }

  private get objectTableRows() {
    return this.objectList ? this.objectList.map(obj => {
      const keys = this.objectHeaders;
      const props = keys.map(key => {
        let v = obj[key];
        if (typeof v === 'object') {
          v = JSON.stringify(v);
        }
        return (<td>{v}</td>);
      });
      return (
        <tr>
          {props}
          <td>
            <a onClick={() => this.goToDetailPage((obj as any).id)}>Go to detail</a>
          </td>
        </tr>);
    }) : [];
  }

  changePage(page: Page) {
    this.changePageEmitter.emit(page);
  }

  goToDetailPage(id: string) {
    this.goToDetailEmitter.emit({ page: Page.detail, id });
  }

  async componentWillLoad() {
    this.objectList = await this.restService.list();
  }

  render() {
    return (
      <Host>
        <ul>
          <li>
            <a onClick={() => this.changePage(Page.detail)}>Go to detail</a>
          </li>
        </ul>
        <table>
          <tr>{this.objectHeaders.map(e => (<th>{e}</th>))}</tr>
          {this.objectTableRows}
        </table>
      </Host>
    );
  }

}
