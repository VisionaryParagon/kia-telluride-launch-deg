export class User {
  _id?: string;
  email: string;
  first_name: string;
  last_name: string;
  dealer: string;
  kuid: string;
  session: string;
  team: string;
  notes?: Note[];
  quizzes?: Quiz[];
  totalPoints?: number;
  created?: Date;
  modified?: Date;
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

export class Admin {
  username: string;
  password: string;
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

export class Employee {
  _id?: string;
  kuid?: string;
  first_name: string;
  last_name: string;
  dealer: string;
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
