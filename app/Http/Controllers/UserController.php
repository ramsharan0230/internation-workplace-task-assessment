<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserController extends Controller
{
    public function fetchUsers(Request $request)
    {
        try {
            $query = $request->input('query');
            $perPage = $request->input('per_page', 15);
            $sortBy = $request->input('sort_by', 'name');
            $sortDirection = $request->input('sort_direction', 'asc');

            $users = User::when($query, function ($q) use ($query) {
                $q->where('name', 'like', "%$query%")
                    ->orWhere('email', 'like', "%$query%");
            })
                ->orderBy($sortBy, $sortDirection)
                ->paginate($perPage)
                ->withQueryString();

            return Inertia::render('Index', [
                'users' => $users,
                'filters' => [
                    'query' => $query,
                    'per_page' => $perPage,
                    'sort_by' => $sortBy,
                    'sort_direction' => $sortDirection,
                ],
            ]);
        } catch (Exception $e) {
            return Inertia::render('Index', [
                'users' => [],
                'error' => $e->getMessage()
            ]);
        }
    }
}
