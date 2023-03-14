import { Component, OnInit } from '@angular/core';
import { Point } from './point';
import { Observable } from 'rxjs';
import { PointService } from './point.service';
import { Toast } from 'bootstrap';
import { CookieService } from 'ngx-cookie-service';
import {Router} from "@angular/router";
import{ GlobalComponent } from '../global-component';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-orders',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  title = 'lab4_web';
  radio_r = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
  radio_x = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];

  observableBooks: Observable<Point[]>;
  points: Point[] = [];
  errorMessage = '';
  key = '';
  constructor(private bookService: PointService, public cookieService: CookieService, private router:Router, private http : HttpClient) {
    this.key = <string>localStorage.getItem("userName");
    if (this.key === "")
    {
      this.router.navigate(['/login']);
    }


    this.observableBooks = this.bookService.getPointsWithObservable(this.key);
    this.observableBooks.subscribe({
      next: (points) => (this.points = points),
      error: (error) => (this.errorMessage = error),
    });
  }
  ngOnInit()
  {
    loaded();
  }


  r_select(r: number) {
    r_change(r);
  }

  x_select(x: number) {
    (<HTMLInputElement>document.getElementById('x')).value = String(x);
    (<HTMLInputElement>document.getElementById('x_name')).innerHTML = String(x);
    x_selected = true;
  }

  clicked() {
    validate();
  }



  form_submit() {
    let x = (<HTMLInputElement>document.getElementById('x')).value;
    let y = (<HTMLInputElement>document.getElementById('y')).value;
    const newPoint : Point = {
      x: +x,
      y: +y,
      r: r_num,
      hit : false,
      email: <string>localStorage.getItem("userName")
    }

    this.http.post<Point>(`${GlobalComponent.url}/point`, newPoint).subscribe(point =>{
      this.points.push(point);
      console.log(point);
      // @ts-ignore
      add_to_html(point.x, point.y, point.r, point.hit);
    });
    this.points.forEach(function (value){console.log(value)});

    return false;
  }


}

function add_to_html(x:number, y:number, r:number, hit:boolean) {
  const svgns = 'http://www.w3.org/2000/svg';

  // @ts-ignore
  // document.getElementById('graph').innerHTML = '';

  let circle = document.createElementNS(svgns, 'circle');
  circle.setAttribute('cx', `${50 + x * 8}%`);
  circle.setAttribute('cy', `${50 - y * 8}%`);
  circle.setAttribute('r', '2%');
  circle.setAttribute('fill', `${hit ? 'green' : 'red'}`);
  // @ts-ignore
  document.getElementById('graph').appendChild(circle);


  let tbody = document.getElementById('graph');
  // @ts-ignore
  tbody.innerHTML += `<tr><td>${x}</td><td>${y}</td><td>${x}</td><td>${r}</td><td>${hit}</td></tr>`;
}

let r_selected = false;
let x_selected = false;
let r_num = -1;

function validate_by_id(
  id: any,
  min: number,
  max: number,
  id_to_disable: string
) {
  const input = <HTMLInputElement>document.getElementById(id);
  const disable = document.getElementById(id_to_disable);
  if (input === null || disable == null) return false;
  const is_parsed = try_parse(input.value);
  if (is_parsed[0] && min <= is_parsed[1] && is_parsed[1] <= max) {
    disable.className = '';
    return true;
  } else {
    disable.className = 'incorrect';
    return false;
  }
}

function validate() {
  const submit = <HTMLInputElement>document.getElementById('submit');
  // let fl = validate_by_id('y', -3, 3, 'y') && r_selected && x_selected;
  // fl &= validate_by_id('input_form:y_text', -4, 4, 'input_form:y');
  // submit.disabled = !fl;
  return true;
}

function try_parse(y: string) {
  try {
    const a = parseFloat(y);
    const reg = new RegExp('^-?\\d*\\.?\\d*$');
    if (isNaN(a) || !reg.test(y)) return [false];
    return [true, a];
  } catch (exc) {
    return [false];
  }
}

function point_clicked(e: any) {
  if (!r_selected) {
    // @ts-ignore
    $('#r_is_not_selected').toast('show');
    return;
  }

  const element = document.getElementById('graph');
  if (element === null) return;
  const click_x = e.clientX,
    click_y = e.clientY;
  const pos = element.getBoundingClientRect();
  const screen_x = pos.x,
    screen_y = pos.y;
  const scale = element.getBoundingClientRect().width / 100;
  const x = ((click_x - screen_x) / scale - 50) / 8,
    y = -((click_y - screen_y) / scale - 50) / 8;


  // @ts-ignore
  document.getElementById('y').setAttribute('min', '-5');

  (<HTMLInputElement>document.getElementById('x')).value = String(x);
  (<HTMLInputElement>document.getElementById('y')).value = String(y);
  x_selected = true;
  if (validate()) {
    // @ts-ignore
    document.getElementById('submit').click();

    // @ts-ignore
    document.getElementById('y').setAttribute('min', '-3');
  } else {
  }
}

function loaded() {
  validate();
  // @ts-ignore
  document
    .getElementById('graph')
    .addEventListener('click', point_clicked, false);
  }



function r_change(r: number) {
  if (r <= 0) {
    // @ts-ignore
    new Toast(document.getElementById('liveToast')).show();
    // @ts-ignore
    document.getElementById('r_' + r).checked = false;
    return;
  }
  // @ts-ignore
  document
    .getElementById('draw')
    .setAttribute(
      'style',
      'transform: translate(' +
        (50 - 10 * r) +
        'px, ' +
        (50 - 10 * r) +
        'px) scale(' +
        0.2 * r +
        ')'
    );

  let circles = $("#graph circle");

  for (let i = 0; i < circles.length; i++) {
    if (circles[i].getAttribute('rad') !== r.toString())
      circles[i].setAttribute('hidden', 'true');
    else
      circles[i].removeAttribute('hidden');
  }

  r_selected = true;
  r_num = r;

  (<HTMLInputElement>document.getElementById('r_name')).innerHTML = String(r);
  validate();
}

