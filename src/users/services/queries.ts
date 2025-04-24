import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { Option } from "../../types/option"
import { ApiGet } from "../types/apiTypes"
import { Schema } from "../types/schema"

export const useStates = () => {
  return useQuery({
    queryKey: ['states'],
    queryFn: () => axios.get<Option[]>('http://localhost:8080/states').then((res) => res.data)
  })
}
export const useLanguages = () => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: () => axios.get<Option[]>('http://localhost:8080/languages').then((res) => res.data)
  })
}
export const useGenders = () => {
  return useQuery({
    queryKey: ['genders'],
    queryFn: () => axios.get<Option[]>('http://localhost:8080/genders').then((res) => res.data)
  })
}
export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: () => axios.get<Option[]>('http://localhost:8080/skills').then((res) => res.data)
  })
}

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: (): Promise<Option[]> =>
      axios.get<ApiGet[]>('http://localhost:8080/users')
        .then(
          (response) => response.data.map((user) => ({
            id: user.id,
            label: user.name,
          } satisfies Option))
          /*
          這邊加入 satisfies 主要是為了讓 typescript 去自動辨別跟檢查， map return value 是否符合 Option 定義，沒有多餘的內容
          satisfies 是 typescript 4.9 加入的新功能
          */
        ),
  })
}

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', { id }],
    queryFn: async (): Promise<Schema> => {
      const { data } = await axios.get<ApiGet>(`http://localhost:8080/users/${id}`)
      return {
        variant: 'edit',
        id: data.id,
        name: data.name,
        email: data.email,
        formerEmploymentPeriod: [
          new Date(data.formerEmploymentPeriod[0]),
          new Date(data.formerEmploymentPeriod[1])
        ],
        gender: data.gender,
        languesSpoken: data.languesSpoken,
        registrationDateAndTime: new Date(data.registrationDateAndTime),
        salaryRange: data.salaryRange,
        skills: data.skills,
        states: data.states,
        isTeacher: data.isTeacher,
        students: data.students,
      };
    },
    // default value is true, 這設定了 !!id 表示，除非 id 存在，否則不會執行 query
    enabled: !!id
  })
}