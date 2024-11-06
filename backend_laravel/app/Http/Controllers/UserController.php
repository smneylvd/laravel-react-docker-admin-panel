<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\ResponseService;
use App\Services\UserService;
use App\Transformers\UserTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class UserController extends Controller
{

    private UserTransformer $transformer;
    private UserService $service;

    public function __construct()
    {
        $this->transformer = new UserTransformer();
        $this->service = new UserService();
    }


    public function index(Request $req): JsonResponse
    {
        $body = $req->all();

        $filters = [];
        foreach ($body as $key => $value) {
            if (in_array($key, User::$modelFields)) {
                $filters[$key] = $value;
            }
        }
        $orderBy = Arr::get($body, 'order_by', 'created_at');
        $orderByDirection = Arr::get($body, 'direction', 'desc');
        $page = Arr::get($body, 'page', 1);
        $perPage = Arr::get($body, 'per_page', 12);

        $items = $this->service->index(
            filters: $filters,
            orderBy: $orderBy,
            direction: $orderByDirection,
            page: $page,
            perPage: $perPage,
        );

        $paginatedItems = $this->transformer->transformItems($items->items());
        $data = [
            'items' => $paginatedItems,
            'count' => $items->total(),
            'page' => $page,
            'per_page' => $perPage,
            'prev' => $items->previousPageUrl(),
            'next' => $items->nextPageUrl(),
        ];

        return ResponseService::send(content: $data);
    }

    public function view(Request $req, $uuid)
    {
        $item = $this->service->view($uuid);
        $data = $this->transformer->transformItem($item, true);

        return ResponseService::send(content: $data);
    }

    public function update(Request $req, User $user)
    {
        $item = $this->service->update(user: $user, body: $req->all());
        $data = $this->transformer->transformItem($item, true);

        return ResponseService::send(content: $data);
    }

    public function delete(Request $req, User $user)
    {
        $this->service->delete($user);
        return ResponseService::send();
    }

    public function restore(Request $req, User $user)
    {
        $item = $this->service->restore($user);
        $data = $this->transformer->transformItem($item, true);

        return ResponseService::send(content: $data);
    }

}
