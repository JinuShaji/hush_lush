import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LoginScreen } from './components/auth/LoginScreen';
import { RestaurantHomeScreen } from './components/home/RestaurantHomeScreen';
import { OutletScreen } from './components/outlet/OutletScreen';
import { AccountScreen } from './components/account/AccountScreen';
import { MoreScreen } from './components/more/MoreScreen';
import { BottomNav } from './components/common/BottomNav';
import { CartDrawer } from './components/cart/CartDrawer';
import { Toast } from './components/common/Toast';
import { LegalModal } from './components/common/LegalModal';

const MainAppContent = () => {
  const { isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('menu');
  const [toasts, setToasts] = useState([]);
  const [legalModalType, setLegalModalType] = useState(null);

  // Toast dispatch
  const showToast = (message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-start selection:bg-red-500 selection:text-white">
      {/* If Not Authenticated -> Show Centered Responsive Square Login Card */}
      {!isAuthenticated ? (
        <LoginScreen
          onShowTerms={() => setLegalModalType('terms')}
          onShowPrivacy={() => setLegalModalType('privacy')}
        />
      ) : (
        /* If Authenticated -> Render Clean Full-Width Responsive App (No extra wrapper headers) */
        <div className="w-full min-h-screen bg-slate-50 flex flex-col relative">
          <div className="flex-1">
            {activeTab === 'menu' && (
              <RestaurantHomeScreen onShowToast={(msg) => showToast(msg, 'success')} />
            )}
            {activeTab === 'outlet' && <OutletScreen />}
            {activeTab === 'account' && (
              <AccountScreen onUpgradeGuest={() => logout()} />
            )}
            {activeTab === 'more' && (
              <MoreScreen
                onShowTerms={() => setLegalModalType('terms')}
                onShowPrivacy={() => setLegalModalType('privacy')}
                onCallWaiter={() => showToast('Staff alerted! A server will visit Table 13 shortly.')}
              />
            )}
          </div>

          {/* Bottom Navigation */}
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Cart Slide-in Drawer */}
          <CartDrawer />
        </div>
      )}

      {/* Global Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Legal & Terms Dialog */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainAppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
