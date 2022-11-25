// import models
import Product from './Product';
import Category from './Category';
import Tag from './Tag';
import ProductTag from './ProductTag';

// Products belongsTo Category
Product.belongsTo(Category, {
    onDelete: 'CASCADE'
});

// Categories have many Products
Category.hasMany(Product, {
    onDelete: 'CASCADE'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
    through: ProductTag
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
    through: ProductTag
});

export { Product, Category, Tag, ProductTag };