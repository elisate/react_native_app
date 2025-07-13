import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  Animated, 
  StatusBar,
  SafeAreaView 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

// Header Component
export const Header = ({ title = "ShopApp", cartCount = 0, onSearchPress, onCartPress, onMenuPress }) => {
  const [searchAnimation] = useState(new Animated.Value(1));
  const [cartAnimation] = useState(new Animated.Value(1));
  const [menuAnimation] = useState(new Animated.Value(1));

  const animatePress = (animation, callback) => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    callback && callback();
  };

  return (
    <SafeAreaView style={styles.headerSafeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => animatePress(menuAnimation, onMenuPress)}
          activeOpacity={0.7}
        >
          <Animated.View style={{ transform: [{ scale: menuAnimation }] }}>
            <Icon name="menu" size={24} color="#FFFFFF" />
          </Animated.View>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => animatePress(searchAnimation, onSearchPress)}
            activeOpacity={0.7}
          >
            <Animated.View style={{ transform: [{ scale: searchAnimation }] }}>
              <Icon name="search" size={24} color="#FFFFFF" />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.headerButton, styles.cartButton]}
            onPress={() => animatePress(cartAnimation, onCartPress)}
            activeOpacity={0.7}
          >
            <Animated.View style={{ transform: [{ scale: cartAnimation }] }}>
              <Icon name="bag" size={24} color="#FFFFFF" />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {cartCount > 99 ? '99+' : cartCount}
                  </Text>
                </View>
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Footer Component
export const Footer = ({ activeTab = 'home', onTabPress }) => {
  const [animations] = useState({
    home: new Animated.Value(1),
    shop: new Animated.Value(1),
    cart: new Animated.Value(1),
    favorites: new Animated.Value(1),
    profile: new Animated.Value(1),
  });

  const handleTabPress = (tabName) => {
    Animated.sequence([
      Animated.timing(animations[tabName], {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animations[tabName], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onTabPress && onTabPress(tabName);
  };

  const TabButton = ({ name, icon, label, isActive, animationValue }) => (
    <TouchableOpacity 
      style={styles.tabButton}
      onPress={() => handleTabPress(name)}
      activeOpacity={0.7}
    >
      <Animated.View style={[styles.iconContainer, { transform: [{ scale: animationValue }] }]}>
        <View style={[styles.iconWrapper, isActive && styles.activeIconWrapper]}>
          <Icon 
            name={isActive ? icon.replace('-outline', '') : icon} 
            size={width * 0.06} 
            color={isActive ? '#FFFFFF' : '#000000'} 
          />
        </View>
        <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
          {label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.footer}>
      <View style={styles.tabContainer}>
        <TabButton
          name="home"
          icon="home-outline"
          label="Home"
          isActive={activeTab === 'home'}
          animationValue={animations.home}
        />
        
        <TabButton
          name="shop"
          icon="storefront-outline"
          label="Shop"
          isActive={activeTab === 'shop'}
          animationValue={animations.shop}
        />
        
        <TabButton
          name="cart"
          icon="bag-outline"
          label="Cart"
          isActive={activeTab === 'cart'}
          animationValue={animations.cart}
        />
        
        <TabButton
          name="favorites"
          icon="heart-outline"
          label="Wishlist"
          isActive={activeTab === 'favorites'}
          animationValue={animations.favorites}
        />
        
        <TabButton
          name="profile"
          icon="person-outline"
          label="Profile"
          isActive={activeTab === 'profile'}
          animationValue={animations.profile}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Header Styles
  headerSafeArea: {
    backgroundColor: '#3B82F6', // blue-500
  },
  header: {
    height: 60,
    backgroundColor: '#3B82F6', // blue-500
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF', // white
    letterSpacing: 0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    marginLeft: 12,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#000000', // black
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#FFFFFF', // white
    fontSize: 12,
    fontWeight: '600',
  },

  // Footer Styles
  footer: {
    backgroundColor: '#FFFFFF', // white
    borderTopWidth: 1,
    borderTopColor: '#E5E5E7',
    paddingBottom: 20,
    paddingTop: 8,
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: width * 0.08,
    height: width * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.04,
    marginBottom: 4,
  },
  activeIconWrapper: {
    backgroundColor: '#3B82F6', // blue-500
  },
  tabLabel: {
    fontSize: width * 0.025,
    fontWeight: '500',
    color: '#000000', // black
    textAlign: 'center',
  },
  activeTabLabel: {
    color: '#3B82F6', // blue-500
    fontWeight: '600',
  },
});

// Usage Example Component
export const AppLayout = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [cartCount, setCartCount] = useState(3);

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    console.log(`Navigate to ${tabName}`);
  };

  const handleHeaderAction = (action) => {
    console.log(`Header action: ${action}`);
  };

  return (
    <View style={layoutStyles.container}>
      <Header 
        title="ShopApp"
        cartCount={cartCount}
        onSearchPress={() => handleHeaderAction('search')}
        onCartPress={() => handleHeaderAction('cart')}
        onMenuPress={() => handleHeaderAction('menu')}
      />
      
      <View style={layoutStyles.content}>
        <Text style={layoutStyles.contentText}>
          Your app content goes here...
        </Text>
      </View>
      
      <Footer 
        activeTab={activeTab} 
        onTabPress={handleTabPress} 
      />
    </View>
  );
};

const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  contentText: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
});

export default Footer;