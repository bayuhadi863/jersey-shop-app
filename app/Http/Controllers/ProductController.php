<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\StoreProductSizeRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\ProductImage;
use App\Models\ProductSize;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $products = Product::with('category')->get();

    // Data for datatable
    $data = $products->map(function ($product) {
      return [
        'id' => $product->id,
        'name' => $product->name,
        'category' => $product->category->name,
        'price' => $product->price,
        'created_at' => Carbon::parse($product->created_at)->format('d-m-Y H:i') . ' WIB',
        'updated_at' => Carbon::parse($product->updated_at)->format('d-m-Y H:i') . ' WIB',
      ];
    });

    return Inertia::render('Dashboard/ProductListPage', ['data' => $data]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $categories = Category::select('id', 'name')->get();
    $selectCategoriesData = $categories->map(function ($category) {
      return [
        'value' => $category->id,
        'label' => $category->name
      ];
    });

    // Render tampilan dengan data yang telah disiapkan
    return Inertia::render('Dashboard/CreateProductPage', [
      'selectCategoriesData' => $selectCategoriesData
    ]);
  }


  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreProductRequest $request)
  {
    $validated = $request->validated();

    if ($validated) {
      $product = new Product();
      $product->name = $request->input('name');
      $product->category_id = $request->input('category_id');
      $product->price = $request->input('price');
      if ($request->input('description')) {
        $product->description = $request->input('description');
      }
      $product->save();

      $images = $request->file('image');

      foreach ($images as $image) {
        $productImage = new ProductImage();
        $productImage->product_id = $product->id;
        $fileName = time() . $image->getClientOriginalName();
        $image->storePubliclyAs(
          'product_images',
          $fileName,
          'public',
        );
        $productImage->image = $fileName;
        $productImage->save();
      }
    }
  }

  public function storeProductSize(StoreProductSizeRequest $request, $product_id)
  {
    $validated = $request->validated();

    if ($validated) {
      $product_size = new ProductSize();
      $product_size->product_id = $product_id;
      $product_size->size = $request->input('size');
      $product_size->stock = $request->input('stock');
      $product_size->save();
    }
  }

  /**
   * Display the specified resource.
   */
  public function show($product_id)
  {
    $product = Product::with('product_image', 'category', 'product_size')->find($product_id);

    return Inertia::render('Dashboard/ProductDetailPage', ['product' => $product]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit($product_id)
{
    $categories = Category::select('id', 'name')->get();
    $selectCategoriesData = $categories->map(function ($category) {
        return [
            'value' => $category->id,
            'label' => $category->name
        ];
    });

    $product = Product::with('product_image', 'category', 'product_size')->find($product_id);

    return Inertia::render('Dashboard/EditProductPage', [
        'product' => $product,
        'selectCategoriesData' => $selectCategoriesData
    ]);
}
  

  /**
 * Update the specified resource in storage.
 */
public function update(UpdateProductRequest $request, Product $product)
{
    $validated = $request->validated();

    if ($validated) {
        $product->name = $request->input('name');
        $product->category_id = $request->input('category_id');
        $product->price = $request->input('price');
        $product->description = $request->input('description');

        // Simpan perubahan pada produk
        $product->save();

        // Jika ada gambar baru yang diunggah
        if ($request->hasFile('image')) {
            foreach ($request->file('image') as $image) {
                $productImage = new ProductImage();
                $productImage->product_id = $product->id;
                $fileName = time() . $image->getClientOriginalName();
                $image->storePubliclyAs('product_images', $fileName, 'public');
                $productImage->image = $fileName;
                $productImage->save();
            }
        }

        // Update informasi ukuran dan stok produk
        if ($request->has('product_size')) {
            foreach ($request->input('product_size') as $size) {
                $productSize = ProductSize::findOrFail($size['id']);
                $productSize->size = $size['size'];
                $productSize->stock = $size['stock'];
                $productSize->save();
            }
        }
    }

    // Redirect ke halaman yang sesuai
    return redirect()->route('product.index')->with('success', 'Produk berhasil diperbarui.');
}

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Product $product)
  {
    //
  }

  public function homeProductIndex(Request $request)
  {
    $orderBy = $request->input('orderBy');
    $order = $request->input('order');

    if ($orderBy && $order) {
      $products = Product::with('product_image', 'product_size')
        ->orderBy($orderBy, $order)
        ->limit(8)
        ->get();
    } else {
      $products = Product::with('product_image', 'product_size')->limit(8)->get();
    }

    return Inertia::render('Home/ProductListPage', ['products' => $products]);
  }

  public function homeProductShow($product_id)
  {
    $product = Product::with('category', 'product_size', 'product_image')->find($product_id);

    $selectSizeData = $product->product_size->map(function ($item) {
      return [
        'value' => $item->id,
        'label' => $item->size
      ];
    });

    return Inertia::render('Home/ProductDetailPage', ['product' => $product, 'selectSizeData' => $selectSizeData]);
  }
}
