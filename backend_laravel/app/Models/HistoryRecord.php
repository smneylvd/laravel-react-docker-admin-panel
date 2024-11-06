<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * App\Models\HistoryRecord
 *
 * @property mixed $uuid
 * @property string $model_uuid
 * @property string $user_uuid
 * @property string $model
 * @property string $column
 * @property string $action
 * @property string $prev_val
 * @property string $curr_val
 * @property Carbon $created_at
 * @property User $user
 */
class HistoryRecord extends Model
{
    protected $primaryKey = 'uuid';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'user_uuid',
        'model_uuid',
        'model',
        'column',
        'action',
        'prev_val',
        'curr_val',
        'created_at',
    ];
    protected $casts = [
        'created_at' => 'datetime'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string)Str::uuid();
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_uuid', 'uuid')
            ->whereNull('deleted_at');
    }
}
