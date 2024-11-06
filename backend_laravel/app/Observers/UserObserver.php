<?php

namespace App\Observers;

use App\Models\HistoryRecord;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        HistoryRecord::create([
            'model_uuid' => $user->uuid,
            'user_uuid' => $user->uuid,
            'action' => 'register',
            'model' => 'user'
        ]);
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {

        foreach (User::$modelFields as $modelField) {
            $prev = $user->getOriginal($modelField);
            $new = $user->$modelField;
            if ($prev != $new) {
                $action = 'update';
                if ($modelField == 'deleted_at') {
                    $action = ($prev == null ? 'delete' : 'restore');
                    $prev = null;
                    $new = null;
                } else if ($modelField == 'password') {
                    $prev = '***';
                    $new = '***';
                }
                $prev = json_encode($prev, JSON_UNESCAPED_UNICODE, JSON_PRETTY_PRINT);
                $new = json_encode($new, JSON_UNESCAPED_UNICODE, JSON_PRETTY_PRINT);
                HistoryRecord::create([
                    'column' => $modelField,
                    'model_uuid' => $user->uuid,
                    'user_uuid' => Auth::user() ? Auth::user()->uuid : null,
                    'model' => 'user',
                    'action' => $action,
                    'prev_val' => $prev,
                    'curr_val' => $new,
                ]);
            }
        }
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        HistoryRecord::create([
            'model_uuid' => $user->uuid,
            'user_uuid' => Auth::user() ? Auth::user()->uuid : null,
            'action' => 'delete',
            'model' => 'user'
        ]);
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        HistoryRecord::create([
            'model_uuid' => $user->uuid,
            'user_uuid' => Auth::user() ? Auth::user()->uuid : null,
            'action' => 'restore',
            'model' => 'user'
        ]);
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
