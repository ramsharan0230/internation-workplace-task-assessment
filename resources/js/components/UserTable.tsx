import React from 'react'

interface User {
    id: number
    name: string
    email: string
}

interface Props {
    users: User[]
}

export default function UserTable({ users }: Props) {
    return (
        <div className="bg-white shadow rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Users</h2>
            </div>

            <div className="overflow-x-auto">
                <table id="myTable" className="w-full text-sm text-left text-gray-500">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Alice</td>
                            <td>alice@example.com</td>
                            <td>Active</td>
                        </tr>
                        <tr>
                            <td>Bob</td>
                            <td>bob@example.com</td>
                            <td>Pending</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
