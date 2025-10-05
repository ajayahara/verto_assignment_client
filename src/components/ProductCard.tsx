import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import type { IProduct } from '@/types';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useApp();

  const handleAddToCart = () => {
    addToCart(product.id, product);
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3 flex-grow-0">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        </div>
        <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="aspect-w-1 aspect-h-1 mb-3 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain p-4"
          />
        </div>
        <CardDescription className="line-clamp-2 text-sm mb-3">
          {product.description}
        </CardDescription>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-2xl font-bold text-green-600">
            ${product.price}
          </span>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleAddToCart} 
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;