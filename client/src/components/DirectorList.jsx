import React from 'react'
import { Table } from 'react-bootstrap'
import DirectorItem from './DirectorItem'


export default function DirectorList({ directors }) {
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