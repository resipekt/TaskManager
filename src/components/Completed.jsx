import React from 'react'

export default function Completed({task}) {
  return (
    <tr>
        <td></td>
        <td>{task.name}</td>
        <td>Date.now()</td>
    </tr>
  )
}
