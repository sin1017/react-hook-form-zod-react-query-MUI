type Create = {
  variant: 'create';
};

type Edit = {
  variant: 'edit';
  id: number;
}

export type ApiCommon = {
  name: string;
  email: string;
  states: string[];
  languesSpoken: string[];
  gender: string;
  skills: string[];
  registrationDateAndTime: string;
  formerEmploymentPeriod: [string, string];
  salaryRange: number[];
  isTeacher: boolean;
  students: {
    name: string
  }[];
};

export type ApiCreateEdit = ApiCommon & (Create | Edit);
export type ApiGet = Edit & ApiCommon;
