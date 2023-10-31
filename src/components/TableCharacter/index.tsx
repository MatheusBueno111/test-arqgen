import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React from 'react'
import { Character } from '../../App'

interface TableCharacterProps {
  characters: Character[]
}

const TableCharacter: React.FC<TableCharacterProps> = ({ characters }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>NAME</Th>
            <Th>STATUS</Th>
            <Th>GENDER</Th>
          </Tr>
        </Thead>
        <Tbody>
          {characters.map((character) => {
            return (
              <Tr key={character.id}>
                <Td>{character.id}</Td>
                <Td>{character.name}</Td>
                <Td>{character.status}</Td>
                <Td>{character.gender}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default TableCharacter
