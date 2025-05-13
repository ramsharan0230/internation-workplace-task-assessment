import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function SampleTable({ users }: { users: any }) {
    const [loading, setLoading] = useState(false);

    const handlePagination = (url: string) => {
        setLoading(true);
        Inertia.visit(url, {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => setLoading(false),
        });
    };

    return (
        <div className="row">
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>SN.</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((user: any, index: number) => (
                            <tr key={user.id}>
                                <td>{index + 1}.</td>
                                <td>
                                    {user.image}
                                    <img src={user.image} alt="" />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.status ?? 'Active'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {loading && <p className="text-center">Loading...</p>}
            </div>

            <ul className="pagination justify-content-center mt-4">
                {users.links.map((link: any, index: number) => (
                    <li
                        key={index}
                        className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                    >
                        <a
                            className="page-link"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (link.url) handlePagination(link.url);
                            }}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
