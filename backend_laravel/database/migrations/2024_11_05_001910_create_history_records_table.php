<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('history_records', function (Blueprint $table) {
            $table->uuid()->primary()->default(DB::raw('uuid_generate_v4()'));
            $table->uuid('model_uuid');
            $table->uuid('user_uuid')->nullable();
            $table->string('model', 15)->nullable();
            $table->string('column', 25)->nullable();
            $table->string('action', 255)->nullable();
            $table->string('prev_val')->nullable();
            $table->string('curr_val')->nullable();
            $table->timestamp('created_at')->default(DB::raw('NOW()'));

            $table->index(['model_uuid', 'model']);
            $table->foreign('user_uuid')
                ->references('uuid')
                ->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('history_records');
    }
};
