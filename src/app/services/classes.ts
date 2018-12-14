export class User {
  _id?: string;
  email: string;
  first_name: string;
  last_name: string;
  dealer: string;
  session: string;
  team: string;
  kuid?: string;
  session_code?: string;
  transcript_id?: string;
  deepDive?: DeepDive;
  streetDrive?: StreetDrive;
  notes?: Note[];
  quizzes?: Quiz[];
  totalPoints?: number;
  created?: Date;
  modified?: Date;
}

export class Employee {
  _id?: string;
  kuid?: string;
  first_name: string;
  last_name: string;
  dealer: string;
}

export class Group {
  _id?: string;
  dealer: string;
  session: string;
  teams: Team[];
}

export class Team {
  name: string;
  value: number;
}

export class Note {
  module: string;
  notes?: string;
  url: string;
}

export class Quiz {
  name: string;
  answers: Answer[] = new Array<Answer>();
}

export class Answer {
  key = '';
  answer = '';
  points = 0;
  time = 0;

  constructor(key) {
    this.key = key;
  }
}

export class QuizData {
  name: string;
  isCert: boolean;
  requiredScore: number;
  passcode?: string;
  questions: QuizQuestion[];
}

export class QuizQuestion {
  key: string;
  question: string;
  options: QuizAnswer[];
}

export class QuizAnswer {
  answer: string;
  value: string;
}

export class DeepDive {
  exterior: ExteriorData;
  firstRow: FirstRowData;
  secondThirdRows: SecondThirdRowData;
  cargo: CargoData;

  constructor() {
    this.exterior = new ExteriorData();
    this.firstRow = new FirstRowData();
    this.secondThirdRows = new SecondThirdRowData();
    this.cargo = new CargoData();
  }
}

export class ExteriorData {
  q0101: boolean;
  q0102: string;
  q0201: boolean;
  q0202: boolean;
  q0203: string;
  q0401: string;
  q0402: string;
  q0501: boolean;
  q0502: boolean;
  q0503: boolean;
  q0601: boolean;
  q0602: boolean;
  q0603: boolean;
  q0701: boolean;
  q0702: boolean;
  q0703: string;
}

export class FirstRowData {
  q0101: boolean;
  q0102: string;
}

export class SecondThirdRowData {
  q0101: boolean;
  q0102: string;
}

export class CargoData {
  q0101: boolean;
  q0102: string;
}

export class StreetDrive {
  kia: Vehicle;
  comp: Vehicle;

  constructor() {
    this.kia = new Vehicle();
    this.comp = new Vehicle();
  }
}

export class Vehicle {
  one: DriveNotes;
  two: DriveNotes;
  three: DriveNotes;
  four: DriveNotes;
  five: DriveNotes;

  constructor() {
    this.one = new DriveNotes();
    this.two = new DriveNotes();
    this.three = new DriveNotes();
    this.four = new DriveNotes();
    this.five = new DriveNotes();
  }
}

export class DriveNotes {
  driver: string;
  rowTwo: string;
  rowThree: string;

  constructor() {
    this.driver = '';
    this.rowTwo = '';
    this.rowThree = '';
  }
}

export class Admin {
  username: string;
  password: string;
}

export class Report {
  kuid: string;
  first_name: string;
  last_name: string;
  dealer: string;
  session: string;
  team: string;
  email: string;
  quiz1?: string;
  quiz1c?: string | number;
  quiz1i?: string | number;
  quiz2?: string;
  quiz2c?: string | number;
  quiz2i?: string | number;
  quiz3?: string;
  quiz3c?: string | number;
  quiz3i?: string | number;
  quiz4?: string;
  quiz4c?: string | number;
  quiz4i?: string | number;
  quiz5?: string;
  quiz5c?: string | number;
  quiz5i?: string | number;
  quiz6?: string;
  quiz6c?: string | number;
  quiz6i?: string | number;
  created?: Date;
  modified?: Date;
}
