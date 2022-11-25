// import models
import Product from './Product';
import Category from './Category';
import Tag from './Tag';
import ProductTag from './ProductTag';

// Products belongsTo Category
Product.belongsTo(Category, {

});

// Categories have many Products
Category.hasMany(Product, {

});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {

});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Tag, {

});

export { Product, Category, Tag, ProductTag };