<?php

namespace App\Services;

class ResponseService
{
    public static function send($message = null, $content = null, $statusCode = 200)
    {
        if (!$message) {
            $message = match ($statusCode) {
                200 => "Success",
                404 => "Not found",
                401 => "Unauthorized",
                default => "Error",
            };
        }

        return response()->json(
            [
                'message' => $message,
                'content' => $content,
                'status_code' => $statusCode
            ],
            $statusCode
        );

    }
}
