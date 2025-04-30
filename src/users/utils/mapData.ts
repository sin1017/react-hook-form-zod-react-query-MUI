import { ApiCreateEdit, ApiCommon } from "../types/apiTypes";
import { Schema } from "../types/schema";

export function mapData(data: Schema): ApiCreateEdit {
  const common: ApiCommon = {
    name: data.name,
    states: data.states,
    skills: data.skills,
    email: data.email,
    languesSpoken: data.languesSpoken,
    gender: data.gender,
    registrationDateAndTime: data.registrationDateAndTime.toString(),
    formerEmploymentPeriod: [
      data.formerEmploymentPeriod[0].toString(),
      data.formerEmploymentPeriod[1].toString()
    ],
    salaryRange: [data.salaryRange[0], data.salaryRange[1]],
    isTeacher: data.isTeacher,
    students: data.isTeacher ? data.students : [],
  }

  switch (data.variant) {
    case 'create': {
      return { ...common, variant: data.variant };
    }
    case 'edit': {
      return { ...common, id: data.id, variant: data.variant }
    }
  }
}