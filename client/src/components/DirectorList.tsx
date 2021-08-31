import React, { FC } from 'react'
import { Table } from 'react-bootstrap'
import { IDirectorList } from '../interfaces/director'
import DirectorItem from './DirectorItem'


const DirectorList:FC<IDirectorList> = ({ directors }) => {
  return (
    directors?.length ? (
      <Table className="shadow">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Movies</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {directors?.map(director => {
            return (
              <DirectorItem 
                key={director.id} 
                director={director} 
              />
            )
          })}
        </tbody>
      </Table>
    ) : <h5 className="text-danger noData">No Data</h5>
  )
}
  

export default DirectorList