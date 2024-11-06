<?php

namespace app\Transformers;

use App\Models\HistoryRecord;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use InvalidArgumentException;

class HistoryRecordTransformer extends BaseTransformer
{
    /**
     * Transform the user model into an array.
     *
     * @param mixed $item
     * @param bool $extended
     * @return array
     */
    public function transform(mixed $item, bool $extended = false): array
    {
        // Ensure the item is an instance of User
        if (!$item instanceof HistoryRecord) {
            throw new InvalidArgumentException('Expected instance of User');
        }
        return [
            'uuid' => $item->uuid,
            'column' => $item->column,
            'action' => $item->action,
            'updated_by' => $item->user ? [
                'uuid' => $item->user->uuid,
                'first_name' => $item->user->first_name,
                'last_name' => $item->user->last_name,
                'email' => $item->user->email,
            ] : null,
            'prev_val' => $item->prev_val ? json_decode($item->prev_val, true) : null,
            'curr_val' => $item->curr_val ? json_decode($item->curr_val, true) : null,
            'created_at' => $item->created_at->format('d-m-Y, H:i:s'),
        ];
    }
}
