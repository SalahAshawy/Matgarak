<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'category',
        'image',
        'description',
        'price',
        'rating',
        'user_id'
        ];

        public static function latestProducts($limit = 10)
        {
            return self::orderBy('created_at', 'desc')->limit($limit)->get();
        }
        public static function popularProducts($limit = 10)
        {
            return self::orderBy('rating', 'desc')->limit($limit)->get();
        }
    
        // Method to get recommended products based on user ID and category
        public static function recommendedProducts($userId, $category, $id )
        {
            return Product::where('category', $category)->where('user_id',$userId)->where('id', '!=', $id)->limit(3)->get();
        }
    
    

    public function comment (){
        return $this->hasMany(Comment::class);
    }
    public function user (){
        return $this->belongsTo(User::class);
    }
}
