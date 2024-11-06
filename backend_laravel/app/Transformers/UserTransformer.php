<?php

namespace App\Transformers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use InvalidArgumentException;

class UserTransformer extends BaseTransformer
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
        if (!$item instanceof User) {
            throw new InvalidArgumentException('Expected instance of User');
        }
        $data = [
            'uuid' => $item->uuid,
            'first_name' => $item->first_name,
            'last_name' => $item->last_name,
            'email' => $item->email,
            'created_at' => $item->created_at->format('d-m-Y, H:i:s'),
            'updated_at' => $item->updated_at->format('d-m-Y, H:i:s'),
            'deleted_at' => $item->deleted_at ? $item->deleted_at->format('d-m-Y, H:i:s') : null,
        ];
        if ($extended) {
            $historyRecordsTransformer = new HistoryRecordTransformer();
            $historyRecordsFormatted = $historyRecordsTransformer->transformItems($item->historyRecords);
            $data = array_merge($data, ['history_records' => $historyRecordsFormatted]);
        }
        return $data;
    }
}
