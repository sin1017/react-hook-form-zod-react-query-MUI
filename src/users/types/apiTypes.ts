type Create = {
  variant: 'create';
};

type Edit = {
  variant: 'edit';
  id: string;
}

export type Common = {
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

export type ApiCreateEdit = Common & (Create | Edit);
export type ApiGet = Edit & Common;
