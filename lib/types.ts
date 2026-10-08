export type Island = {
  code: string;
  nameDv: string;
  /** seats allocated at island level, null = not published yet */
  seats: number | null;
};

export type Atoll = {
  code: string;
  nameDv: string;
  /** seats allocated at atoll level, null = not published yet */
  seats: number | null;
  islands: Island[];
};

export type Candidate = {
  id: string;
  nameDv: string;
  atollCode: string;
  atollNameDv: string;
  photoUrl: string | null;
};

export type Voter = {
  nameDv: string;
  dhaairaa: string;
  pollingStation: string;
};
