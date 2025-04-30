import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Schema } from "../types/schema"
import axios from "axios"
import { mapData } from "../utils/mapData"

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Schema) => {
      await axios.post('http://localhost:8080/users', mapData(data))
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      alert('User created')
    }
  })
}

export function useEditUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Schema) => {
      if (data.variant === 'edit') {
        await axios.put(`http://localhost:8080/users/${data.id}`, mapData(data))
      }
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      if (variables.variant === 'edit') {
        await queryClient.invalidateQueries({
          queryKey: ['user', { id: variables.id }]
        })
        alert('User edited success')
      }
    }
  })
}