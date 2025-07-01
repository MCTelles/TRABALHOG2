import { Card } from "../../components/Card/Card";
import styles from "./Shop.module.scss";
import Select from "react-select";
import { useNavigate } from "react-router";
import { useProducts } from "../../hooks/useProducts";

function Shop() {
  const options = [
    { value: "Camisetas", label: "Camisetas" },
    { value: "Calças", label: "Calças" },
    { value: "Jaquetas", label: "Jaquetas" },
    { value: "Vestidos", label: "Vestidos" },
    { value: "Calçados", label: "Calçados" },
    { value: "Camisas", label: "Camisas" },
    { value: "Shorts", label: "Shorts" },
  ];

  const { products, selectedProducts, setSelectedProducts } = useProducts();

  const navigate = useNavigate();

  const filteredProducts = () => {
    if (selectedProducts.length === 0) {
      return products;
    }

    return products.filter((product) =>
      selectedProducts.includes(product.category)
    );
  };

  const filtered = filteredProducts();
  console.log("filtered", filtered);

  const customComponents = {
    DropdownIndicator: () => null,
    ClearIndicator: () => null,
  };

  console.log("products no Shop", products);

  return (
    <div className={styles.shopContainer}>
      <div className={styles.searchContainer}>
        <h1>Shop</h1>

        <Select
          components={customComponents}
          isMulti
          name="categories"
          options={options}
          onChange={(items) =>
            setSelectedProducts(items.map((item) => item.value))
          }
          className={styles.select}
          classNamePrefix={"select"}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "#f0f0f0",
              border: "none",
              borderRadius: "18px",
              boxShadow: "none",
              minHeight: "40px",
            }),
            multiValue: (baseStyles) => ({
              ...baseStyles,
              background: "none",
            }),
            multiValueLabel: (baseStyles) => ({
              ...baseStyles,
              color: "#004cff",
            }),
            multiValueRemove: (baseStyles) => ({
              ...baseStyles,
              color: "#333",
            }),
            indicatorSeparator: (baseStyles) => ({
              ...baseStyles,
              display: "none",
            }),
          }}
        />
      </div>
      <div className={styles.productGrid}>
        {Array.isArray(filtered) &&
          filtered.map(({ _id, productImage, productName, price }) => (
            <div key={_id} onClick={() => navigate(`/buy-product/${_id}`)}>
              <Card
                productImage={productImage}
                productName={productName}
                productPrice={price}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export { Shop };
