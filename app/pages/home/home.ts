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

    this.refresh();
  }

  refresh() {
    var token = window.localStorage.getItem('token');
    var userid = window.localStorage.getItem('userid');

    var creds = "page=1&numOfPage=5&userId="+userid+"&token="+token;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    console.log(token);
    //headers.append('Authorization', 'Bearer '+ token);
    //headers.append('Cache-Control', 'no-cache');
    console.log(headers);

    this.http.post('http://localhost:3000/getreports', creds, {
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
  draft: Report;
  content: string;
  date: string;
  score: string;
  content1: string;
  content2: string;
  content3: string;
  content4: string;

  constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController,
      private http: Http
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

   write() {
   	console.log("write!!!")
   	//data = {date:dateStr, content:$("#content").val(), score:$("#score").val(),
    //content1:$("#content1").val(), content2:$("#content2").val(),
    //content3:$("#content3").val(), content4:$("#content4").val()}
    var token = window.localStorage.getItem('token');
    var userid = window.localStorage.getItem('userid');
    var creds = "date="+this.date+"&content="+this.content+"&score="+this.score+
    "&content1="+this.content1+"&content2="+this.content2+"&content3="+this.content3+
    "&content4="+this.content4+"&userId="+userid+"&token="+token;

    //console.log(creds);
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://localhost:3000/write', creds, {
      headers: headers
      })
      .toPromise()
      .then(this.extractData);
  }

    private extractData(res: Response) {
  	let body = res.json();
  	let headers:Headers = res.headers;
  	//console.log(headers)
  	console.log(body.data);
	}
}