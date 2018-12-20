import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  private VAPID_PUBLIC_KEY = 'BPxfEPipIGHBXntXPadnOb_fgjAgRkwyJkH1NiR6loR9LWuAkQNuVky0FN9-TKw3NOZmfeNlKx0pgnJOJGw6ObM=';

  private pushSubscription: any;
  private swPush$: any;

  constructor(private swPush: SwPush, private http: Http) {
  }

  public subscribeToPush() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then(pushSubscription => {
      console.log('pushSubscription:' + JSON.stringify(pushSubscription));
      this.pushSubscription = pushSubscription;

      this.swPush$ = this.swPush.messages.subscribe(message => {
        console.log('[App] Push message received', message);
      });

      console.log('[Push Service] Adding subscriber');
      return this.http.post(environment.domain + '/security/subscribe', pushSubscription);

    }).catch(err => {
      console.error(err);
    });

  }

  deleteSubscriber(): Observable<Object> {
    console.log('[Push Service] Deleting subscriber');

    this.swPush$.unsubscribe();

    return this.http.post(environment.domain + '/security/unsubscribe', this.pushSubscription);
  }

}
