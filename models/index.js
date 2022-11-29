// import models
import Product from "./Product";
import Category from "./Category";
import Tag from "./Tag";
import ProductTag from "./ProductTag";

// Products belongsTo Category
Product.belongsTo(Category, {
	onDelete: "CASCADE",
	foreignKey: "category_id",
});

// Categories have many Products
Category.hasMany(Product, {
	onDelete: "CASCADE",
	foreignKey: "category_id",
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
	through: ProductTag,
	foreignKey: "product_id",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
	through: ProductTag,
	foreignKey: "tag_id",
});

export { Product, Category, Tag, ProductTag };
