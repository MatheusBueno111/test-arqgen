import {
  Button,
  Flex,
  FormLabel,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { api } from './services/api'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import TableCharacter from './components/TableCharacter'

export interface Character {
  id: number
  name: string
  status: string
  gender: string
}

const NewCharacterFormSchema = z.object({
  id: z.number().min(1, { message: 'Campo obrigatório' }),
  name: z.string().min(1, { message: 'Campo obrigatório' }),
  gender: z.enum(['Male', 'Famele']),
  status: z.enum(['Alive', 'Dead']),
})

type NewCharacterFormData = z.infer<typeof NewCharacterFormSchema>

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const toast = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewCharacterFormData>({
    resolver: zodResolver(NewCharacterFormSchema),
  })
  const onSubmit: SubmitHandler<NewCharacterFormData> = (data) => {
    const { id, gender, status, name } = data
    const newCharacter: Character = {
      id,
      name,
      status,
      gender,
    }

    setCharacters((preValue) => [...preValue, newCharacter])
    reset()
    toast({
      title: 'Personagem criado',
      description: 'O personagem foi criado com sucesso!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const fetchData = async () => {
    try {
      const response = await api.getCharacter('/1,2,10,20,30')
      const data = response.data
      setCharacters(data)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Falha no carregamento dos personagens',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    console.log(characters)
  }, [])

  return (
    <Flex
      h={'100%'}
      minH={'100vh'}
      justifyContent={'center'}
      alignItems={'center'}
      gap="10"
      flexDirection={'column'}
    >
      {characters.length > 0 ? (
        <TableCharacter characters={characters} />
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>ID</FormLabel>
        <Input type="number" {...register('id', { valueAsNumber: true })} />
        {errors.id && (
          <Text fontSize={'12'} color="red">
            {errors.id.message}
          </Text>
        )}
        <FormLabel>Name</FormLabel>
        <Input type="text" {...register('name')} />
        {errors.name && (
          <Text fontSize={'12'} color="red">
            {errors.name.message}
          </Text>
        )}
        <FormLabel>Status</FormLabel>
        <Input type="text" {...register('status')} />
        {errors.status && (
          <Text fontSize={'12'} color="red">
            {errors.status.message}
          </Text>
        )}
        <FormLabel>Gender</FormLabel>
        <Input type="text" {...register('gender')} />
        {errors.gender && (
          <Text fontSize={'12'} color="red">
            {errors.gender.message}
          </Text>
        )}

        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </Flex>
  )
}

export default App
