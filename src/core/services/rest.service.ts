export type RestListService = {
  list(): Promise<object[]>
}

export class RestService implements RestListService {
  constructor(
    private baseUrl: string,
    private resourcePath: string) {
  }

  public async list(): Promise<object[]> {
    const resp = await fetch(`${this.baseUrl}/${this.resourcePath}`, {
      method: 'GET',
    });
    return await resp.json();
  }

  public async detail(id: string): Promise<object> {
    const resp = await fetch(`${this.baseUrl}/${this.resourcePath}/${id}`, {
      method: 'GET',
    });
    return await resp.json();
  }
}
