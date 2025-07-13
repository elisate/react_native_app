// src/components/Header.js

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

const { width } = Dimensions.get('window');

export default function Header({ 
  title = "ShopApp", 
  cartCount = 0, 
  onSearchPress, 
  onCartPress, 
  onMenuPress,
  showBackButton = false,
  onBackPress 
}) {
  const [searchAnimation] = useState(new Animated.Value(1));
  const [cartAnimation] = useState(new Animated.Value(1));
  const [menuAnimation] = useState(new Animated.Value(1));
  const [backAnimation] = useState(new Animated.Value(1));

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
        {/* Left Side - Menu or Back Button */}
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => animatePress(
            showBackButton ? backAnimation : menuAnimation, 
            showBackButton ? onBackPress : onMenuPress
          )}
          activeOpacity={0.7}
        >
          <Animated.View style={{ 
            transform: [{ scale: showBackButton ? backAnimation : menuAnimation }] 
          }}>
            <Icon 
              name={showBackButton ? "arrow-back" : "menu"} 
              size={24} 
              color="#FFFFFF" 
            />
          </Animated.View>
        </TouchableOpacity>

        {/* Center - Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {title}
          </Text>
        </View>

        {/* Right Side - Search and Cart */}
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
}

const styles = StyleSheet.create({
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
    marginHorizontal: 16,
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
    borderWidth: 1,
    borderColor: '#FFFFFF', // white border for better visibility
  },
  cartBadgeText: {
    color: '#FFFFFF', // white
    fontSize: 12,
    fontWeight: '600',
  },
});

// Alternative Header with Profile Picture
export const HeaderWithProfile = ({ 
  title = "ShopApp", 
  cartCount = 0, 
  onSearchPress, 
  onCartPress, 
  onProfilePress,
  profileImageUri,
  showBackButton = false,
  onBackPress 
}) => {
  const [searchAnimation] = useState(new Animated.Value(1));
  const [cartAnimation] = useState(new Animated.Value(1));
  const [profileAnimation] = useState(new Animated.Value(1));
  const [backAnimation] = useState(new Animated.Value(1));

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
        {/* Left Side - Profile or Back Button */}
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => animatePress(
            showBackButton ? backAnimation : profileAnimation, 
            showBackButton ? onBackPress : onProfilePress
          )}
          activeOpacity={0.7}
        >
          <Animated.View style={{ 
            transform: [{ scale: showBackButton ? backAnimation : profileAnimation }] 
          }}>
            {showBackButton ? (
              <Icon name="arrow-back" size={24} color="#FFFFFF" />
            ) : (
              <View style={styles.profileImageContainer}>
                {profileImageUri ? (
                  <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
                ) : (
                  <Icon name="person" size={20} color="#FFFFFF" />
                )}
              </View>
            )}
          </Animated.View>
        </TouchableOpacity>

        {/* Center - Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {title}
          </Text>
        </View>

        {/* Right Side - Search and Cart */}
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

// Simple Header for internal pages
export const SimpleHeader = ({ 
  title = "Page Title", 
  onBackPress, 
  rightIcon = null,
  onRightPress 
}) => {
  const [backAnimation] = useState(new Animated.Value(1));
  const [rightAnimation] = useState(new Animated.Value(1));

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
          onPress={() => animatePress(backAnimation, onBackPress)}
          activeOpacity={0.7}
        >
          <Animated.View style={{ transform: [{ scale: backAnimation }] }}>
            <Icon name="arrow-back" size={24} color="#FFFFFF" />
          </Animated.View>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {title}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => animatePress(rightAnimation, onRightPress)}
          activeOpacity={0.7}
        >
          <Animated.View style={{ transform: [{ scale: rightAnimation }] }}>
            {rightIcon && (
              <Icon name={rightIcon} size={24} color="#FFFFFF" />
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Usage Examples:
/*
// Main Header
<Header 
  title="My Store"
  cartCount={5}
  onSearchPress={() => console.log('Search pressed')}
  onCartPress={() => console.log('Cart pressed')}
  onMenuPress={() => console.log('Menu pressed')}
/>

// Header with Back Button
<Header 
  title="Product Details"
  cartCount={2}
  showBackButton={true}
  onBackPress={() => console.log('Back pressed')}
  onSearchPress={() => console.log('Search pressed')}
  onCartPress={() => console.log('Cart pressed')}
/>

// Header with Profile
<HeaderWithProfile
  title="Welcome Back"
  cartCount={3}
  onSearchPress={() => console.log('Search pressed')}
  onCartPress={() => console.log('Cart pressed')}
  onProfilePress={() => console.log('Profile pressed')}
  profileImageUri="https://example.com/profile.jpg"
/>

// Simple Header for internal pages
<SimpleHeader
  title="Settings"
  onBackPress={() => console.log('Back pressed')}
  rightIcon="settings"
  onRightPress={() => console.log('Settings pressed')}
/>
*/