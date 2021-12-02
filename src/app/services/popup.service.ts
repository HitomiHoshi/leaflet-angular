import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makeCapitalPopup(data: any): string {
    return `` +
      `<div>Capital: ${ data.name }</div>` +
      `<div>State: ${ data.state }</div>` +
      `<div>Population: ${ data.population }</div>`
  }

  makeBranchPopup(data: any): string {
    return `` +
      `<div>Branch: ${ data.name }</div>` +
      `<div>Code: ${ data.code }</div>`
  }
}
