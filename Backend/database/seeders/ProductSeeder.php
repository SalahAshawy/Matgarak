<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        // Define array of categories
        $categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Beauty', 'Toys', 'Food', 'Health', 'Gaming'];

        foreach (range(1, 10) as $index) {
            Product::create([
                'title' => $faker->sentence(3),
                'description' => $faker->paragraph(3),
                'category' => $categories[array_rand($categories)],
                'price' => $faker->numberBetween(10, 1000),
                'rating' => $faker->numberBetween(1, 5),
                'image' => $faker->imageUrl(), // Generating a random image URL
                'user_id' => 1, // Assuming user_id 1 is the admin user for all products
            ]);
        }
    }
}
