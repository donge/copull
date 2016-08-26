import {Component} from '@angular/core';
import {NavController, ModalController, Platform, NavParams, ViewController} from 'ionic-angular';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Report} from './report'
@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
  reports: Report[];

  constructor(public modalCtrl: ModalController,
              private navCtrl: NavController,
              private http: Http) {

    var creds = "page=1&numOfPage=3&userId=1";
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    http.post('http://localhost:3000/getreports', creds, {
      headers: headers
      })
      .map(res => {this.reports = res.json().data;//res.json();
        console.log(this.reports[0].content);
        console.log("hello" + this.reports);
      })
      .subscribe(
        data => console.log('Received:' + data),
        err => console.log(err),
        () => console.log('Call Complete')
    );
  }

  openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalsWritePage, characterNum);
    modal.present();
  }

  /*getReports (): Observable<Hero[]> {
    return this.http.post(this.heroesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);*/

}


@Component({
  templateUrl: 'build/pages/home/write.html'
})
class ModalsWritePage {
  character;

  constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController
  ) {
    var characters = [
      {
        name: 'Gollum',
        quote: 'Sneaky little hobbitses!',
        image: 'img/avatar-gollum.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'River Folk' },
          { title: 'Alter Ego', note: 'Smeagol' }
        ]
      },
      {
        name: 'Frodo',
        quote: 'Go back, Sam! I\'m going to Mordor alone!',
        image: 'img/avatar-frodo.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Weapon', note: 'Sting' }
        ]
      },
      {
        name: 'Samwise Gamgee',
        quote: 'What we need is a few good taters.',
        image: 'img/avatar-samwise.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Nickname', note: 'Sam' }
        ]
      }
    ];
    this.character = characters[this.params.get('charNum')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}