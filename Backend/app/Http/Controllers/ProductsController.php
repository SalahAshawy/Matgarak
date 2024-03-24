<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{

    public function latestProducts()
    {
        $latestProducts = Product::latestProducts();
        return response()->json($latestProducts);
    }
    public function popularProducts()
    {
        $popularProducts = Product::popularProducts();
        return response()->json($popularProducts);
    }
    public function showMoreProducts(Request $request)
    {
        $userId=$request->query('user_id');
        $id=$request->query('id');
      $moreProducts = Product::where('user_id', $userId)
        ->where('id', '!=', $id) 
        ->limit(3)
        ->get();
        return response()->json($moreProducts);
    }

    public function recommendedProducts(Request $request)
    {
        $userId = $request->query('user_id');
        $category = $request->query('category');
        $id = $request->query('id');
        $recommendedProducts = Product::recommendedProducts($userId, $category,$id);
        return response()->json($recommendedProducts);
    }

    public function index()
    {
        $products = Product::get();     
        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::with(['comment' => function ($query) {
            $query->latest()->take(6)->with('user');
        }])->find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'category' => 'required|string',
            // 'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
if(Auth::check()){

    $product = new Product([
        'title' => $request->input('title'),
        'category' => $request->input('category'),
        'description' =>$request->input('description'),
        'price' =>$request->input('price'),
        'rating' =>$request->input('rating'),
        'user_id'=>$request->input('user_id'),
        'image'=>$request->input('image'),
    ]);
    
    
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('product_images');
        $product->image = $imagePath;
    }
    
    $product->save();
    return response()->json(['message' => 'Product created successfully'], 201);
}else{
    return response()->json(['message' => 'A7AAAA',401]);
} 
    
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string',
            'category' => 'required|string',
           
        ]);

        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
     $product->title = $request->input('title');
     $product->category = $request->input('category');
     $product->description =$request->input('description');
     $product->price =$request->input('price');
     $product->rating =$request->input('rating');
     $product->user_id =$request->input('user_id');
   
      
     

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($product->image) {
                Storage::delete($product->image);
            }
            $imagePath = $request->file('image')->store('product_images');
            $product->image = $imagePath;
        }

        $product->save();

        return response()->json(['message' => 'Product updated successfully']);
    }

    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Delete associated image
        if ($product->image) {
            Storage::delete($product->image);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}