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
use Hamcrest\Core\IsEqual;
use Illuminate\Database\Eloquent\Builder;
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
      $currentProductSize = ProductSize::where('product_id', $product_id)
        ->where('size', $request->input('size'))
        ->first();

      if ($currentProductSize) {
        $currentProductSize->stock += $request->input('stock');
        $currentProductSize->save();
      } else {
        $product_size = new ProductSize();
        $product_size->product_id = $product_id;
        $product_size->size = $request->input('size');
        $product_size->stock = $request->input('stock');
        $product_size->save();
      }
    }
  }

  /**
   * Display the specified resource.
   */
  public function show($product_id)
  {
    $product = Product::with('product_image', 'category', 'product_size')->find($product_id);

    // dd($product);

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
  public function update(UpdateProductRequest $request, String $productId)
  {
    // dd($request->all());
    // dd($request->file('image'));
    // dd($productId);

    $validated = $request->validated();

    if ($validated) {
      $product = Product::find($productId);

      // dd($product);

      $product->name = $request->input('name');
      $product->category_id = $request->input('category_id');
      $product->price = $request->input('price');
      $product->description = $request->input('description');

      // Simpan perubahan pada produk
      $product->save();

      // Jika ada gambar baru yang diunggah
      if ($request->hasFile('image')) {
        // Hapus gambar lama
        foreach ($product->product_image as $image) {
          $path = storage_path('app/public/product_images/' . $image->image);
          if (file_exists($path))
            unlink($path);
        }

        ProductImage::where('product_id', $product->id)->delete();

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
      // if ($request->has('product_size')) {
      //   foreach ($request->input('product_size') as $size) {
      //     $productSize = ProductSize::findOrFail($size['id']);
      //     $productSize->size = $size['size'];
      //     $productSize->stock = $size['stock'];
      //     $productSize->save();
      //   }
      // }
    }

    // Redirect ke halaman yang sesuai
    return redirect()->route('product.index')->with('success', 'Produk berhasil diperbarui.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(String $productId)
  {
    $product = Product::find($productId);

    // Hapus gambar produk
    // hapus dari storage
    foreach ($product->product_image as $image) {
      $path = storage_path('app/public/product_images/' . $image->image);
      if (file_exists($path)) {
        unlink($path);
      }
    }
    ProductImage::where('product_id', $product->id)->delete();

    // Hapus ukuran dan stok produk
    ProductSize::where('product_id', $product->id)->delete();

    // Hapus produk
    $product->delete();

    // Redirect ke halaman yang sesuai
    return redirect()->route('product.index')->with('success', 'Produk berhasil dihapus.');
  }

  public function homeProductIndex(Request $request)
  {

    $maxPrice = Product::max('price');
    $minPrice = Product::min('price');

    $orderBy = $request->input('orderBy') ? $request->input('orderBy') : '';
    $selectedMinPrice = $request->input('minPrice') ? (int)$request->input('minPrice') : $minPrice;
    $selectedMaxPrice = $request->input('maxPrice') ? (int)$request->input('maxPrice') : $maxPrice;
    $selectedCategory = $request->input('category') ? $request->input('category') : '';
    $homeKit = $request->input('homeKit') ? $request->input('homeKit') : false;
    $awayKit = $request->input('awayKit') ? $request->input('awayKit') : false;
    $thirdKit = $request->input('thirdKit') ? $request->input('thirdKit') : false;

    // dd($homeKit, $awayKit, $thirdKit);
    // Log::info($homeKit ? 'true' : 'false');
    function getLikeSentence($kit)
    {
      if ($kit === 'homeKit') {
        return 'Home Kit';
      } else if ($kit === 'awayKit') {
        return 'Away Kit';
      } else if ($kit === 'thirdKit') {
        return 'Third Kit';
      }
    }

    function getOrder($orderBy)
    {
      if ($orderBy === 'priceDesc' || $orderBy === 'soldDesc') {
        return 'desc';
      } else if ($orderBy === 'priceAsc' || $orderBy === 'soldAsc') {
        return 'asc';
      }
    }

    if ($homeKit && $awayKit && $thirdKit) {
      if ($selectedCategory && $orderBy) {
        if ($orderBy == 'soldDesc' || $orderBy == 'soldAsc') {
          $products = Product::with('product_image', 'product_size')
            ->where('category_id', $selectedCategory)
            ->where(function ($query) {
              $query->where('name', 'like', '%Home Kit%')
                ->orWhere('name', 'like', '%Away Kit%')
                ->orWhere('name', 'like', '%Third Kit%');
            })
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->withCount(['product_size as product_size_count' => function (Builder $query) {
              $query->whereHas('cart.single_order');
            }])->orderBy('product_size_count', getOrder($orderBy))
            ->get();
        } else {
          $products = Product::with('product_image', 'product_size')
            ->where('category_id', $selectedCategory)
            ->where(function ($query) {
              $query->where('name', 'like', '%Home Kit%')
                ->orWhere('name', 'like', '%Away Kit%')
                ->orWhere('name', 'like', '%Third Kit%');
            })
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->orderBy('price', getOrder($orderBy))
            ->get();
        }
      } else if ($selectedCategory) {
        $products = Product::with('product_image', 'product_size')
          ->where('category_id', $selectedCategory)
          ->where(function ($query) {
            $query->where('name', 'like', '%Home Kit%')
              ->orWhere('name', 'like', '%Away Kit%')
              ->orWhere('name', 'like', '%Third Kit%');
          })
          ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
          ->get();
      } else if ($orderBy) {
        if ($orderBy == 'priceDesc' || $orderBy == 'soldDesc') {
          $products = Product::with('product_image', 'product_size')
            ->where(function ($query) {
              $query->where('name', 'like', '%Home Kit%')
                ->orWhere('name', 'like', '%Away Kit%')
                ->orWhere('name', 'like', '%Third Kit%');
            })
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->withCount(['product_size as product_size_count' => function (Builder $query) {
              $query->whereHas('cart.single_order');
            }])->orderBy('product_size_count', getOrder($orderBy))
            ->get();
        } else {
          $products = Product::with('product_image', 'product_size')
            ->where(function ($query) {
              $query->where('name', 'like', '%Home Kit%')
                ->orWhere('name', 'like', '%Away Kit%')
                ->orWhere('name', 'like', '%Third Kit%');
            })
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->orderBy('price', getOrder($orderBy))
            ->get();
        }
      } else {
        $products = Product::with('product_image', 'product_size')
          ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
          ->where(function ($query) {
            $query->where('name', 'like', '%Home Kit%')
              ->orWhere('name', 'like', '%Away Kit%')
              ->orWhere('name', 'like', '%Third Kit%');
          })
          ->get();
      }
    } else if ($homeKit && $awayKit) {
      if ($selectedCategory && $orderBy) {
        if ($orderBy == 'soldDesc' || $orderBy == 'soldAsc') {
          $products = Product::with('product_image', 'product_size')
            ->where('category_id', $selectedCategory)
            ->where(function ($query) {
              $query->where('name', 'like', '%Home Kit%')
                ->orWhere('name', 'like', '%Away Kit%');
            })
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->withCount(['product_size as product_size_count' => function (Builder $query) {
              $query->whereHas('cart.single_order');
            }])->orderBy('product_size_count', getOrder($orderBy))
            ->get();
        } else {
          $products = Product::with('product_image', 'product_size')
            ->where('category_id', $selectedCategory)
            ->where(function ($query) {
              $query->where('name', 'like', '%Home Kit%')
                ->orWhere('name', 'like', '%Away Kit%');
            })
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->orderBy('price', getOrder($orderBy))
            ->get();
        }
      } else if ($selectedCategory) {
        $products = Product::with('product_image', 'product_size')
          ->where('category_id', $selectedCategory)
          ->where(function ($query) {
            $query->where('name', 'like', '%Home Kit%')
              ->orWhere('name', 'like', '%Away Kit%');
          })
          ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
          ->get();
      } else if ($orderBy) {
        if ($orderBy == 'priceDesc' || $orderBy == 'soldDesc') {
          $products = Product::with('product_image', 'product_size')
            ->where(function ($query) {
              $query->where('name', 'like', '%Home Kit%')
                ->orWhere('name', 'like', '%Away Kit%');
            })
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->withCount(['product_size as product_size_count' => function (Builder $query) {
              $query->whereHas('cart.single_order');
            }])->orderBy('product_size_count', getOrder($orderBy))
            ->get();
        } else {
          $products = Product::with('product_image', 'product_size')
            ->where(function ($query) {
              $query->where('name', 'like', '%Home Kit%')
                ->orWhere('name', 'like', '%Away Kit%');
            })
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->orderBy('price', getOrder($orderBy))
            ->get();
        }
      } else {
        $products = Product::with('product_image', 'product_size')
          ->where(function ($query) {
            $query->where('name', 'like', '%Home Kit%')
              ->orWhere('name', 'like', '%Away Kit%');
          })
          ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
          ->get();
      }
    } else if ($homeKit && $thirdKit) {
      if ($selectedCategory && $orderBy) {
        if ($orderBy == 'soldDesc' || $orderBy == 'soldAsc') {
          $products = Product::with('product_image', 'product_size')
            ->where('category_id', $selectedCategory)
            ->where(function ($query) {
              $query->where('name', 'like', '%Home Kit%')
                ->orWhere('name', 'like', '%Third Kit%');
            })
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->withCount(['product_size as product_size_count' => function (Builder $query) {
              $query->whereHas('cart.single_order');
            }])->orderBy('product_size_count', getOrder($orderBy))
            ->get();
        } else {
          $products = Product::with('product_image', 'product_size')
            ->where('category_id', $selectedCategory)
            ->where(function ($query) {
              $query->where('name', 'like', '%Home Kit%')
                ->orWhere('name', 'like', '%Third Kit%');
            })
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->orderBy('price', getOrder($orderBy))
            ->get();
        }
      } else if ($selectedCategory) {
        $products = Product::with('product_image', 'product_size')
          ->where('category_id', $selectedCategory)
          ->where(function ($query) {
            $query->where('name', 'like', '%Home Kit%')
              ->orWhere('name', 'like', '%Third Kit%');
          })
          ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
          ->get();
      } else if ($orderBy) {
        if ($orderBy == 'priceDesc' || $orderBy == 'soldDesc') {
          $products = Product::with('product_image', 'product_size')
            ->where(function ($query) {
              $query->where('name', 'like', '%Home Kit%')
                ->orWhere('name', 'like', '%Third Kit%');
            })
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->withCount(['product_size as product_size_count' => function (Builder $query) {
              $query->whereHas('cart.single_order');
            }])->orderBy('product_size_count', getOrder($orderBy))
            ->get();
        } else {
          $products = Product::with('product_image', 'product_size')
            ->where(function ($query) {
              $query->where('name', 'like', '%Home Kit%')
                ->orWhere('name', 'like', '%Third Kit%');
            })
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->orderBy('price', getOrder($orderBy))
            ->get();
        }
      } else {
        $products = Product::with('product_image', 'product_size')
          ->where(function ($query) {
            $query->where('name', 'like', '%Home Kit%')
              ->orWhere('name', 'like', '%Third Kit%');
          })
          ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
          ->get();
      }
    } else if ($awayKit && $thirdKit) {
      if ($selectedCategory && $orderBy) {
        if ($orderBy == 'soldDesc' || $orderBy == 'soldAsc') {
          $products = Product::with('product_image', 'product_size')
            ->where('category_id', $selectedCategory)
            ->where(function ($query) {
              $query->where('name', 'like', '%Away Kit%')
                ->orWhere('name', 'like', '%Third Kit%');
            })
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->withCount(['product_size as product_size_count' => function (Builder $query) {
              $query->whereHas('cart.single_order');
            }])->orderBy('product_size_count', getOrder($orderBy))
            ->get();
        } else {
          $products = Product::with('product_image', 'product_size')
            ->where('category_id', $selectedCategory)
            ->where(function ($query) {
              $query->where('name', 'like', '%Home Kit%')
                ->orWhere('name', 'like', '%Third Kit%');
            })
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->orderBy('price', getOrder($orderBy))
            ->get();
        }
      } else if ($selectedCategory) {
        $products = Product::with('product_image', 'product_size')
          ->where('category_id', $selectedCategory)
          ->where(function ($query) {
            $query->where('name', 'like', '%Home Kit%')
              ->orWhere('name', 'like', '%Third Kit%');
          })
          ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
          ->get();
      } else if ($orderBy) {
        if ($orderBy == 'priceDesc' || $orderBy == 'soldDesc') {
          $products = Product::with('product_image', 'product_size')
            ->where(function ($query) {
              $query->where('name', 'like', '%Home Kit%')
                ->orWhere('name', 'like', '%Third Kit%');
            })
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->withCount(['product_size as product_size_count' => function (Builder $query) {
              $query->whereHas('cart.single_order');
            }])->orderBy('product_size_count', getOrder($orderBy))
            ->get();
        } else {
          $products = Product::with('product_image', 'product_size')
            ->where(function ($query) {
              $query->where('name', 'like', '%Home Kit%')
                ->orWhere('name', 'like', '%Third Kit%');
            })
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->orderBy('price', getOrder($orderBy))
            ->get();
        }
      } else {
        $products = Product::with('product_image', 'product_size')
          ->where(function ($query) {
            $query->where('name', 'like', '%Home Kit%')
              ->orWhere('name', 'like', '%Third Kit%');
          })
          ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
          ->get();
      }
    } else if ($homeKit || $awayKit || $thirdKit) {
      $kit = $homeKit ? 'homeKit' : ($awayKit ? 'awayKit' : 'thirdKit');
      if ($selectedCategory && $orderBy) {
        if ($orderBy == 'soldDesc' || $orderBy == 'soldAsc') {
          $products = Product::with('product_image', 'product_size')
            ->where('category_id', $selectedCategory)
            ->where('name', 'like', '%' . getLikeSentence($kit) . '%')
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->withCount(['product_size as product_size_count' => function (Builder $query) {
              $query->whereHas('cart.single_order');
            }])->orderBy('product_size_count', getOrder($orderBy))
            ->get();
        } else {
          $products = Product::with('product_image', 'product_size')
            ->where('category_id', $selectedCategory)
            ->where('name', 'like', '%' . getLikeSentence($kit) . '%')
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->orderBy('price', getOrder($orderBy))
            ->get();
        }
      } else if ($selectedCategory) {
        $products = Product::with('product_image', 'product_size')
          ->where('category_id', $selectedCategory)
          ->where('name', 'like', '%' . getLikeSentence($kit) . '%')
          ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
          ->get();
      } else if ($orderBy) {
        if ($orderBy == 'priceDesc' || $orderBy == 'soldDesc') {
          $products = Product::with('product_image', 'product_size')
            ->where('name', 'like', '%' . getLikeSentence($kit) . '%')
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->withCount(['product_size as product_size_count' => function (Builder $query) {
              $query->whereHas('cart.single_order');
            }])->orderBy('product_size_count', getOrder($orderBy))
            ->get();
        } else {
          $products = Product::with('product_image', 'product_size')
            ->where('name', 'like', '%' . getLikeSentence($kit) . '%')
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->orderBy('price', getOrder($orderBy))
            ->get();
        }
      } else {
        $products = Product::with('product_image', 'product_size')
          ->where('name', 'like', '%' . getLikeSentence($kit) . '%')
          ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
          ->get();
      }
    } else if ($selectedCategory) {
      if ($orderBy) {
        if ($orderBy == 'soldDesc' || $orderBy == 'soldAsc') {
          $products = Product::with('product_image', 'product_size')
            ->where('category_id', $selectedCategory)
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->withCount(['product_size as product_size_count' => function (Builder $query) {
              $query->whereHas('cart.single_order');
            }])->orderBy('product_size_count', getOrder($orderBy))
            ->get();
        } else {
          $products = Product::with('product_image', 'product_size')
            ->where('category_id', $selectedCategory)
            ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
            ->orderBy('price', getOrder($orderBy))
            ->get();
        }
      } else {
        $products = Product::with('product_image', 'product_size')
          ->where('category_id', $selectedCategory)
          ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
          ->get();
      }
    } else if ($orderBy) {
      if ($orderBy == 'soldDesc' || $orderBy == 'soldAsc') {
        $products = Product::with('product_image', 'product_size')
          ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
          ->withCount(['product_size as product_size_count' => function (Builder $query) {
            $query->whereHas('cart.single_order');
          }])->orderBy('product_size_count', getOrder($orderBy))
          ->get();
      } else {
        $products = Product::with('product_image', 'product_size')
          ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
          ->orderBy('price', getOrder($orderBy))
          ->get();
      }
    } else {
      $products = Product::with('product_image', 'product_size')
        ->whereBetween('price', [$selectedMinPrice, $selectedMaxPrice])
        ->get();
    }

    // if ($orderBy && $order) {
    //   if (($orderBy === 'price' && ($order === 'asc' || $order === 'desc')) ||
    //     ($orderBy === 'sold' && ($order === 'asc' || $order === 'desc'))
    //   ) {
    //     $query = Product::with('product_image', 'product_size');

    //     if ($orderBy === 'sold') {
    //       $query->withCount(['product_size as product_size_count' => function (Builder $query) {
    //         $query->whereHas('cart.single_order');
    //       }])->orderBy('product_size_count', $order);
    //     } else {
    //       $query->orderBy($orderBy, $order);
    //     }

    //     $products = $query->limit(9)->get();
    //   } else {
    //     $products = [];
    //   }
    // } else {
    //   $products = Product::with('product_image', 'product_size')->limit(8)->get();
    // }

    // $products = Product::with('product_image', 'product_size')->limit(8)->get();

    $categoriesData = Category::all()->map(function ($category) {
      return [
        'value' => $category->id,
        'label' => $category->name
      ];
    });

    return Inertia::render('Home/ProductListPage', [
      'products' => $products,
      'categoriesData' => $categoriesData,
      'maxPrice' => $maxPrice,
      'minPrice' => $minPrice,
      'orderBy' => $orderBy,
      'selectedMinPrice' => $selectedMinPrice,
      'selectedMaxPrice' => $selectedMaxPrice,
      'selectedCategory' => $selectedCategory,
      'homeKit' => $homeKit,
      'awayKit' => $awayKit,
      'thirdKit' => $thirdKit
    ]);
  }



  public function homeProductShow($product_id)
  {
    $product = Product::with('category', 'product_size', 'product_image')->find($product_id);

    $totalStock = $product->product_size->sum('stock');

    $selectSizeData = $product->product_size->map(function ($item) {
      return [
        'value' => $item->id,
        'label' => $item->size
      ];
    });

    return Inertia::render('Home/ProductDetailPage', ['product' => $product, 'selectSizeData' => $selectSizeData, 'totalStock' => $totalStock]);
  }
}
