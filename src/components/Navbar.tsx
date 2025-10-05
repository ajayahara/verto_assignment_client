import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import Cart from './Cart';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ShoppingCart, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { userName, getCartItemCount } = useApp();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Verto</h1>
            </div>

            {/* User Info and Cart */}
            <div className="flex items-center space-x-4">
              {userName && (
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <User className="h-4 w-4" />
                  <span>Welcome, {userName}!</span>
                </div>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {getCartItemCount() > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="ml-2 bg-blue-600 text-white"
                  >
                    {getCartItemCount()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;