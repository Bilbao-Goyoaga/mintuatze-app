import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: Http) {
  }

  public notifyAll() {
    const webPushMessage = {
      'title': 'title',
      'clickTarget': 'clickTarget',
      'message': 'message'
    };
    this.http.post(environment.domain + '/users/notify-all', webPushMessage);
  }
}
