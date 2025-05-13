import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';

export default function IndexPage() {
    const { users, filters } = usePage().props;
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(filters?.query || '');
    const [perPage, setPerPage] = useState(filters?.per_page || 15);
    const [sortBy, setSortBy] = useState(filters?.sort_by || 'name');
    const [sortDirection, setSortDirection] = useState(filters?.sort_direction || 'asc');

    const sortingPerPage = [15, 25, 40, 60, 100];

    const handlePagination = (url: string) => {
        setLoading(true);
        Inertia.visit(url, {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => setLoading(false),
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.get(window.location.pathname, {
            query: searchQuery,
            per_page: perPage,
            sort_by: sortBy,
            sort_direction: sortDirection,
        }, {
            preserveState: true,
            replace: true,
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
        });
    };

    const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPerPage = Number(e.target.value);
        setPerPage(newPerPage);
        Inertia.get(window.location.pathname, {
            per_page: newPerPage,
            query: searchQuery,
            sort_by: sortBy,
            sort_direction: sortDirection,
        }, {
            preserveState: true,
            replace: true,
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
        });
    };

    const toggleSort = (column: string) => {
        const isSame = sortBy === column;
        const direction = isSame && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortBy(column);
        setSortDirection(direction);

        Inertia.get(window.location.pathname, {
            query: searchQuery,
            per_page: perPage,
            sort_by: column,
            sort_direction: direction,
        }, {
            preserveState: true,
            replace: true,
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
        });
    };

    return (
        <div className="p-8">
            <div className="table-responsive">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <form onSubmit={handleSearch} className="mb-4">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center gap-2">
                        <label htmlFor="per_page" className="mb-0">Items per page:</label>
                        <select
                            id="per_page"
                            className="form-select form-select-sm"
                            value={perPage}
                            onChange={handlePerPageChange}
                            disabled={loading}
                        >
                            {sortingPerPage.map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>SN.</th>
                            <th>Image</th>
                            <th onClick={() => toggleSort('name')} style={{ cursor: 'pointer' }}>
                                Name {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => toggleSort('email')} style={{ cursor: 'pointer' }}>
                                Email {sortBy === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((user: any, index: number) => (
                            <tr key={user.id}>
                                <td>{index + 1}.</td>
                                <td>
                                    <img
                                        src={user.image}
                                        alt=""
                                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                                    />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.status?.charAt(0).toUpperCase() + user.status?.slice(1)}</td>
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
