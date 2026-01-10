import { useState } from "react";
import ProductCard from "../components/product-card";
import { useCategoriesQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";

const Search = () => {


    const { data: categoriesResponse, isLoading: categoriesLoading, isError } = useCategoriesQuery("");


    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [maxPrice, setMaxPrice] = useState(10000000);
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);



    const addToCartHandler = () => { }

    const isPrevPage = page > 1;
    const isNextPage = page < 4;


    if (isError) {
        <div>Error loading categories</div>
        toast.error("Error loading categories");
    }

    return (
        <div className="product-search-page">

            <aside>
                <h2>Filters</h2>

                <div>
                    <h4>Sort</h4>
                    <select value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="">None</option>
                        <option value="asc">Price (Low to High)</option>
                        <option value="dsc">Price (High to Low)</option>

                    </select>
                </div>

                <div>
                    <h4>Max Price: {maxPrice || ""}</h4>
                    <input type="range"
                        min={100}
                        max={10000000}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                </div>

                <div>
                    <h4>Category</h4>
                    <select value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All</option>
                        {
                            !categoriesLoading && categoriesResponse?.categories.map((item) => (
                                <option key={item} value={item}>{item.toUpperCase()}</option>
                            ))
                        }

                    </select>
                </div>
            </aside>

            {/* main */}
            <main>
                <h1>Product</h1>
                <input type="text" placeholder="search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="search-product-list">
                    <ProductCard
                        productId="567"
                        name="macbook"
                        price={678}
                        stock={67}
                        handler={addToCartHandler}
                        photo="https://m.media-amazon.com/images/I/71cWZUr9SVL._AC_SX342_.jpg"
                    />
                </div>

                <article>
                    <button disabled={!isPrevPage}
                        onClick={() => setPage((prev) => prev - 1)}>
                        Prev
                    </button>
                    <span>{page} of {5}</span>
                    <button disabled={!isNextPage}
                        onClick={() => setPage((prev) => prev + 1)}>
                        Next
                    </button>
                </article>
            </main>

        </div>
    )
}

export default Search;