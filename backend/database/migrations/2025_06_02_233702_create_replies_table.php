<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('replies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('message_id')->index();
            $table->foreign('message_id')->references('id')->on('messages')->onDelete('cascade');
            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->text('message');
            $table->boolean('from_admin')->default(false);
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('replies');
    }
};
