import { Component, h, Host, Listen, Prop, State } from '@stencil/core';
import { GoToDetailPageEvent, Page } from '../../core';
import { RestService } from '../../core/services/rest.service';


@Component({
  tag: 'crud-component',
  styleUrl: 'crud-component.css',
  shadow: true,
})
export class CrudComponent {

  @Prop()
  public listDisplay: string;

  @Prop()
  public baseUrl: string;

  @Prop()
  public resourcePath: string;

  @State()
  public currentPage: Page;

  private selectedDetail: string;

  private restService: RestService;


  componentWillLoad() {
    this.restService = new RestService(this.baseUrl, this.resourcePath);
    this.currentPage = Page.list;
  }

  componentWillUpdate() {
  }

  @Listen('pageChange', { capture: true })
  public pageChange(event) {
    this.currentPage = event.detail;
  }

  @Listen('goToDetail', { capture: true })
  public goToDetail(event: CustomEvent<GoToDetailPageEvent>) {
    this.selectedDetail = event.detail.id;
    this.currentPage = Page.detail;
  }

  render() {
    switch (this.currentPage) {
      case Page.list:
        return (
          <Host>
            <crud-list restService={this.restService} />
          </Host>
        );
      case Page.detail:
        return (
          <Host>
            <crud-detail restService={this.restService} object-id={this.selectedDetail} />
          </Host>
        );
    }
  }
}
