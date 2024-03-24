<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Comment::create([
            'content' => 'This is  comment sdsdsds sdkdd sdskldsldksd slkdslkdns dsldksdm sds.',
            'user_id' => 1, // Assuming user_id 1 exists in your users table
            'product_id' => 3, // Assuming post_id 1 exists in your posts table
        ]);
    }
}
