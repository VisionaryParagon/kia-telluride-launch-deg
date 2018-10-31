export class User {
  _id?: string;
  first_name: string;
  last_name: string;
  dealer: string;
  kid: string;
  session: string;
  team: string;
  email?: string;
  optin?: number;
  notes?: Note[];
  quizzes?: Quiz[];
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
  answer01: string;
  points01: number;
  time01: number;
  answer02: string;
  points02: number;
  time02: number;
  answer03: string;
  points03: number;
  time03: number;
  answer04: string;
  points04: number;
  time04: number;
  answer05: string;
  points05: number;
  time05: number;
  answer06: string;
  points06: number;
  time06: number;
  answer07: string;
  points07: number;
  time07: number;
  answer08: string;
  points08: number;
  time08: number;
}

export class Admin {
  username: string;
  password: string;
}
