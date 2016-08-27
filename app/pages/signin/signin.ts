import {Component} from '@angular/core';
import {NavController, ModalController, Platform, NavParams, ViewController} from 'ionic-angular';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';



@Component({
  templateUrl: './build/pages/signin/signin.html'
})
export class SignPage {
	public password;
  public username;
  public res1: Response;

  constructor(public modalCtrl: ModalController,
              private navCtrl: NavController,
              private http: Http) {

	}

  getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2)
      return parts.pop().split(";").shift();
  }

  signIn() {
    var creds = "userName=admin&password=1234567";
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //headers.append('X-CSRFToken', this.getCookie('csrftoken'));
    this.http.post('http://localhost:3000/login', creds, {
      headers: headers
      })
      .toPromise()
      .then(this.extractData);
  }

  private extractData(res: Response) {
  	let body = res.json();
  	let headers:Headers = res.headers;
  	console.log(headers)
  	console.log(body.data);
  	window.localStorage.setItem('token', body.data);
	}
}