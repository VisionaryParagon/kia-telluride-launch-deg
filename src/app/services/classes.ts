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
  frontRow: FrontRowData;
  secondThirdRow: SecondThirdRowData;
  cargo: CargoData;

  constructor() {
    this.exterior = new ExteriorData();
    this.frontRow = new FrontRowData();
    this.secondThirdRow = new SecondThirdRowData();
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
  q0801: boolean;
  q0802: boolean;
  q0803: boolean;
  q0804: boolean;
  q0901: string;
  q1001: boolean;
  q1002: boolean;
  q1003: boolean;
  q1004: boolean;
  q1005: boolean;
  q1006: boolean;
  q1007: boolean;
  q1008: boolean;
  q1101: boolean;
  q1102: boolean;
  q1103: boolean;
  q1104: boolean;
  q1105: boolean;
  q1106: boolean;
  q1107: boolean;
  q1201: string;
  q1301: boolean;
  q1302: boolean;
  q1303: boolean;
  q1304: boolean;
  q1401: boolean;
  q1402: boolean;
  q1403: boolean;
  q1404: boolean;
  q1405: boolean;
  q1406: string;
  q1501: string;
  q1601: boolean;
  q1602: string;
  q1603: boolean;
  q1604: string;
  q1701: string;
  q1801: boolean;
  q1802: boolean;
  q1803: boolean;
  q1901: string;
  q1902: string;
  q1903: string;
  q1904: string;
}

export class FrontRowData {
  q0101: boolean;
  q0102: boolean;
  q0103: string;
  q0201: boolean;
  q0202: string;
  q0203: string;
  q0301: boolean;
  q0302: string;
  q0303: string;
  q0401: boolean;
  q0402: string;
  q0403: string;
  q0501: string;
  q0502: string;
  q0503: string;
  q0601: string;
  q0602: string;
  q0603: boolean;
  q0604: string;
  q0701: boolean;
  q0702: string;
  q0801: boolean;
  q0802: boolean;
  q0803: string;
  q0901: string;
  q0902: string;
  q0903: string;
  q1001: boolean;
  q1002: boolean;
  q1003: boolean;
  q1004: boolean;
  q1005: boolean;
  q1006: boolean;
  q1007: boolean;
  q1008: boolean;
  q1009: boolean;
  q1010: boolean;
  q1101: string;
  q1102: boolean;
  q1103: string;
  q1201: string;
  q1202: string;
  q1203: string;
  q1204: string;
  q1301: string;
  q1302: boolean;
  q1303: string;
  q1401: boolean;
  q1402: boolean;
  q1403: boolean;
  q1404: string;
  q1501: boolean;
  q1502: boolean;
  q1601: boolean;
  q1602: boolean;
  q1603: boolean;
  q1604: boolean;
  q1605: boolean;
  q1606: boolean;
  q1607: string;
  q1608: string;
  q1701: boolean;
  q1702: boolean;
  q1703: boolean;
  q1801: boolean;
  q1901: boolean;
  q1902: boolean;
  q2001: boolean;
  q2002: boolean;
  q2101: string;
  q2102: boolean;
  q2103: boolean;
  q2201: boolean;
  q2202: boolean;
  q2203: boolean;
  q2301: boolean;
  q2302: boolean;
  q2303: boolean;
  q2401: boolean;
  q2402: boolean;
  q2403: string;
  q2404: string;
  q2501: boolean;
  q2502: boolean;
  q2503: boolean;
  q2601: boolean;
  q2602: boolean;
  q2603: boolean;
  q2604: boolean;
  q2701: boolean;
  q2702: boolean;
  q2703: boolean;
  q2704: boolean;
  q2705: boolean;
  q2801: boolean;
  q2802: boolean;
  q2803: boolean;
  q2804: boolean;
  q2805: boolean;
  q2806: boolean;
  q2807: boolean;
}

export class SecondThirdRowData {
  q0101: boolean;
  q0102: string;
  q0201: string;
  q0202: boolean;
  q0203: string;
  q0204: string;
  q0301: string;
  q0302: string;
  q0401: boolean;
  q0402: boolean;
  q0403: boolean;
  q0404: string;
  q0501: string;
  q0502: string;
  q0503: string;
  q0504: string;
  q0505: string;
  q0506: boolean;
  q0601: boolean;
  q0701: string;
  q0702: string;
  q0703: string;
  q0801: boolean;
  q0802: string;
  q0803: string;
  q0901: boolean;
  q0902: boolean;
  q0903: string;
  q0904: string;
  q0905: string;
  q1001: boolean;
  q1002: string;
  q1101: boolean;
  q1102: boolean;
  q1201: boolean;
  q1202: string;
  q1301: string;
  q1401: boolean;
  q1402: string;
  q1501: boolean;
  q1502: boolean;
  q1503: boolean;
  q1504: boolean;
  q1601: boolean;
  q1602: boolean;
  q1701: boolean;
  q1702: string;
  q1801: boolean;
  q1802: boolean;
  q1803: string;
  q1804: string;
  q1805: boolean;
  q1901: string;
  q1902: string;
  q1903: string;
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
