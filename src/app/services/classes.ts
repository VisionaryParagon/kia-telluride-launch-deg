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
  instructor?: string;
  transcript_id?: string;
  deepDive?: DeepDive;
  streetDrive?: StreetDrive;
  notes?: Note[];
  quizzes?: Quiz[];
  totalPoints?: number;
  certScore?: number;
  evaluation?: Evaluation;
  created?: Date;
  modified?: Date;
}

export class Employee {
  _id?: string;
  kuid?: string;
  email: string;
  first_name: string;
  last_name: string;
  dealer: string;
}

export class Session {
  _id?: string;
  dealer: string;
  session: string;
  session_code: string;
  instructor: string;
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
  feedback: string;
}

export class QuizAnswer {
  answer: string;
  value: string;
}

export class DeepDive {
  exterior: DeepDiveData;
  frontRow: DeepDiveData;
  secondThirdRow: DeepDiveData;
  cargo: DeepDiveData;

  constructor() {
    this.exterior = new DeepDiveData();
    this.frontRow = new DeepDiveData();
    this.secondThirdRow = new DeepDiveData();
    this.cargo = new DeepDiveData();
  }
}

export class DeepDiveData {
  q0101: boolean | string;
  q0102: boolean | string;
  q0103: boolean | string;
  q0104: boolean | string;
  q0105: boolean | string;
  q0106: boolean | string;
  q0107: boolean | string;
  q0108: boolean | string;
  q0109: boolean | string;
  q0110: boolean | string;
  q0201: boolean | string;
  q0202: boolean | string;
  q0203: boolean | string;
  q0204: boolean | string;
  q0205: boolean | string;
  q0206: boolean | string;
  q0207: boolean | string;
  q0208: boolean | string;
  q0209: boolean | string;
  q0210: boolean | string;
  q0301: boolean | string;
  q0302: boolean | string;
  q0303: boolean | string;
  q0304: boolean | string;
  q0305: boolean | string;
  q0306: boolean | string;
  q0307: boolean | string;
  q0308: boolean | string;
  q0309: boolean | string;
  q0310: boolean | string;
  q0401: boolean | string;
  q0402: boolean | string;
  q0403: boolean | string;
  q0404: boolean | string;
  q0405: boolean | string;
  q0406: boolean | string;
  q0407: boolean | string;
  q0408: boolean | string;
  q0409: boolean | string;
  q0410: boolean | string;
  q0501: boolean | string;
  q0502: boolean | string;
  q0503: boolean | string;
  q0504: boolean | string;
  q0505: boolean | string;
  q0506: boolean | string;
  q0507: boolean | string;
  q0508: boolean | string;
  q0509: boolean | string;
  q0510: boolean | string;
  q0601: boolean | string;
  q0602: boolean | string;
  q0603: boolean | string;
  q0604: boolean | string;
  q0605: boolean | string;
  q0606: boolean | string;
  q0607: boolean | string;
  q0608: boolean | string;
  q0609: boolean | string;
  q0610: boolean | string;
  q0701: boolean | string;
  q0702: boolean | string;
  q0703: boolean | string;
  q0704: boolean | string;
  q0705: boolean | string;
  q0706: boolean | string;
  q0707: boolean | string;
  q0708: boolean | string;
  q0709: boolean | string;
  q0710: boolean | string;
  q0801: boolean | string;
  q0802: boolean | string;
  q0803: boolean | string;
  q0804: boolean | string;
  q0805: boolean | string;
  q0806: boolean | string;
  q0807: boolean | string;
  q0808: boolean | string;
  q0809: boolean | string;
  q0810: boolean | string;
  q0901: boolean | string;
  q0902: boolean | string;
  q0903: boolean | string;
  q0904: boolean | string;
  q0905: boolean | string;
  q0906: boolean | string;
  q0907: boolean | string;
  q0908: boolean | string;
  q0909: boolean | string;
  q0910: boolean | string;
  q1001: boolean | string;
  q1002: boolean | string;
  q1003: boolean | string;
  q1004: boolean | string;
  q1005: boolean | string;
  q1006: boolean | string;
  q1007: boolean | string;
  q1008: boolean | string;
  q1009: boolean | string;
  q1010: boolean | string;
  q1101: boolean | string;
  q1102: boolean | string;
  q1103: boolean | string;
  q1104: boolean | string;
  q1105: boolean | string;
  q1106: boolean | string;
  q1107: boolean | string;
  q1108: boolean | string;
  q1109: boolean | string;
  q1110: boolean | string;
  q1111: boolean | string;
  q1112: boolean | string;
  q1113: boolean | string;
  q1114: boolean | string;
  q1115: boolean | string;
  q1201: boolean | string;
  q1202: boolean | string;
  q1203: boolean | string;
  q1204: boolean | string;
  q1205: boolean | string;
  q1206: boolean | string;
  q1207: boolean | string;
  q1208: boolean | string;
  q1209: boolean | string;
  q1210: boolean | string;
  q1301: boolean | string;
  q1302: boolean | string;
  q1303: boolean | string;
  q1304: boolean | string;
  q1305: boolean | string;
  q1306: boolean | string;
  q1307: boolean | string;
  q1308: boolean | string;
  q1309: boolean | string;
  q1310: boolean | string;
  q1401: boolean | string;
  q1402: boolean | string;
  q1403: boolean | string;
  q1404: boolean | string;
  q1405: boolean | string;
  q1406: boolean | string;
  q1407: boolean | string;
  q1408: boolean | string;
  q1409: boolean | string;
  q1410: boolean | string;
  q1501: boolean | string;
  q1502: boolean | string;
  q1503: boolean | string;
  q1504: boolean | string;
  q1505: boolean | string;
  q1506: boolean | string;
  q1507: boolean | string;
  q1508: boolean | string;
  q1509: boolean | string;
  q1510: boolean | string;
  q1601: boolean | string;
  q1602: boolean | string;
  q1603: boolean | string;
  q1604: boolean | string;
  q1605: boolean | string;
  q1606: boolean | string;
  q1607: boolean | string;
  q1608: boolean | string;
  q1609: boolean | string;
  q1610: boolean | string;
  q1701: boolean | string;
  q1702: boolean | string;
  q1703: boolean | string;
  q1704: boolean | string;
  q1705: boolean | string;
  q1706: boolean | string;
  q1707: boolean | string;
  q1708: boolean | string;
  q1709: boolean | string;
  q1710: boolean | string;
  q1801: boolean | string;
  q1802: boolean | string;
  q1803: boolean | string;
  q1804: boolean | string;
  q1805: boolean | string;
  q1806: boolean | string;
  q1807: boolean | string;
  q1808: boolean | string;
  q1809: boolean | string;
  q1810: boolean | string;
  q1901: boolean | string;
  q1902: boolean | string;
  q1903: boolean | string;
  q1904: boolean | string;
  q1905: boolean | string;
  q1906: boolean | string;
  q1907: boolean | string;
  q1908: boolean | string;
  q1909: boolean | string;
  q1910: boolean | string;
  q2001: boolean | string;
  q2002: boolean | string;
  q2003: boolean | string;
  q2004: boolean | string;
  q2005: boolean | string;
  q2006: boolean | string;
  q2007: boolean | string;
  q2008: boolean | string;
  q2009: boolean | string;
  q2010: boolean | string;
  q2101: boolean | string;
  q2102: boolean | string;
  q2103: boolean | string;
  q2104: boolean | string;
  q2105: boolean | string;
  q2106: boolean | string;
  q2107: boolean | string;
  q2108: boolean | string;
  q2109: boolean | string;
  q2110: boolean | string;
  q2201: boolean | string;
  q2202: boolean | string;
  q2203: boolean | string;
  q2204: boolean | string;
  q2205: boolean | string;
  q2206: boolean | string;
  q2207: boolean | string;
  q2208: boolean | string;
  q2209: boolean | string;
  q2210: boolean | string;
  q2301: boolean | string;
  q2302: boolean | string;
  q2303: boolean | string;
  q2304: boolean | string;
  q2305: boolean | string;
  q2306: boolean | string;
  q2307: boolean | string;
  q2308: boolean | string;
  q2309: boolean | string;
  q2310: boolean | string;
  q2401: boolean | string;
  q2402: boolean | string;
  q2403: boolean | string;
  q2404: boolean | string;
  q2405: boolean | string;
  q2406: boolean | string;
  q2407: boolean | string;
  q2408: boolean | string;
  q2409: boolean | string;
  q2410: boolean | string;
  q2501: boolean | string;
  q2502: boolean | string;
  q2503: boolean | string;
  q2504: boolean | string;
  q2505: boolean | string;
  q2506: boolean | string;
  q2507: boolean | string;
  q2508: boolean | string;
  q2509: boolean | string;
  q2510: boolean | string;
  q2601: boolean | string;
  q2602: boolean | string;
  q2603: boolean | string;
  q2604: boolean | string;
  q2605: boolean | string;
  q2606: boolean | string;
  q2607: boolean | string;
  q2608: boolean | string;
  q2609: boolean | string;
  q2610: boolean | string;
  q2701: boolean | string;
  q2702: boolean | string;
  q2703: boolean | string;
  q2704: boolean | string;
  q2705: boolean | string;
  q2706: boolean | string;
  q2707: boolean | string;
  q2708: boolean | string;
  q2709: boolean | string;
  q2710: boolean | string;
  q2801: boolean | string;
  q2802: boolean | string;
  q2803: boolean | string;
  q2804: boolean | string;
  q2805: boolean | string;
  q2806: boolean | string;
  q2807: boolean | string;
  q2808: boolean | string;
  q2809: boolean | string;
  q2810: boolean | string;
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

export class Evaluation {
  question1: string;
  answer1: string;
  question2: string;
  answer2: string;
  question3: string;
  answer3: string;
  question4: string;
  answer4: string;
  question5: string;
  answer5: string;
  question6: string;
  answer6: string;
  question7: string;
  answer7: boolean;
  date: Date;

  constructor() {
    this.question1 = 'Attending this course improved my performance and ability to satisfy customers back on the job.';
    this.answer1 = '';
    this.question2 = 'This course was delivered with the right balance of instruction and practice to meet my needs.';
    this.answer2 = '';
    this.question3 = 'The facilitator was well-prepared, knowledgeable, and effectively explained the material.';
    this.answer3 = '';
    this.question4 = 'The instructor provided meaningful feedback and guidance regarding my progress and answered all my questions.';
    this.answer4 = '';
    this.question5 = 'I found this course appropriate to my professional development and would recommend it to others.';
    this.answer5 = '';
    this.question6 = 'Please provide any suggestions to help us improve future Kia University courses and workshops.';
    this.answer6 = '';
    this.question7 = 'Would you like to discuss your experience in this course with a Kia University manager?';
    this.answer7 = null;
    this.date = null;
  }
}

export class UserEval {
  kuid: string;
  first_name: string;
  last_name: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answer5: string;
  answer6: string;
  answer7: string;
  dealer: string;
  session: string;
  team: string;
  instructor: string;
  date: Date;

  constructor() {
    this.kuid = '';
    this.first_name = '';
    this.last_name = '';
    this.answer1 = '';
    this.answer2 = '';
    this.answer3 = '';
    this.answer4 = '';
    this.answer5 = '';
    this.answer6 = '';
    this.answer7 = '';
    this.dealer = '';
    this.session = '';
    this.team = '';
    this.instructor = '';
    this.date = null;
  }
}

export class Admin {
  username: string;
  password: string;
}
