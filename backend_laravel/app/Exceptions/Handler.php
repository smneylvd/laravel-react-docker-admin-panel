<?php

namespace App\Exceptions;

use App\Services\ResponseService;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param Request $request
     * @param Throwable $e
     * @return \Illuminate\Http\JsonResponse
     */
    public function render($request, Throwable $e)
    {
        // Check if the request expects a JSON response
        $statusCode = $this->getStatusCode($e);
        $message = $e->getMessage();
        if ($statusCode == 500) {
            $appDirectory = app_path();
            $message = $e->getMessage() . " | " . str_replace($appDirectory, 'App', $e->getFile()) . ":" . $e->getLine();
        }
        return ResponseService::send(content: $message, statusCode: $statusCode);

    }

    /**
     * Get the HTTP status code for the exception.
     *
     * @param Throwable $exception
     * @return int
     */
    protected function getStatusCode(Throwable $exception)
    {
        // Default status code
        $statusCode = 500;

        if (method_exists($exception, 'getStatusCode')) {
            $statusCode = $exception->getStatusCode();
        } elseif ($exception instanceof ModelNotFoundException) {
            $statusCode = 404;
        } elseif ($exception instanceof AuthenticationException) {
            $statusCode = 401;
        } elseif ($exception instanceof ValidationException) {
            $statusCode = 422;
        }

        return $statusCode;
    }
}
