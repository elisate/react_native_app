// src/screens/HomeScreen.js

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
  RefreshControl,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

// Sample data arrays - Replace with your API data
const bannerData = [
  {
    id: 1,
    image: 'https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=Summer+Sale+50%+OFF',
    title: 'Summer Sale',
    subtitle: '50% OFF on all items',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/400x200/EF4444/FFFFFF?text=New+Arrivals',
    title: 'New Arrivals',
    subtitle: 'Check out latest collection',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/400x200/10B981/FFFFFF?text=Free+Shipping',
    title: 'Free Shipping',
    subtitle: 'On orders above $50',
  },
];

const categoriesData = [
  {
    id: 1,
    name: 'Electronics',
    icon: 'phone-portrait',
    color: '#3B82F6',
    image: 'https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=Electronics',
  },
  {
    id: 2,
    name: 'Fashion',
    icon: 'shirt',
    color: '#EF4444',
    image: 'https://via.placeholder.com/80x80/EF4444/FFFFFF?text=Fashion',
  },
  {
    id: 3,
    name: 'Home',
    icon: 'home',
    color: '#10B981',
    image: 'https://via.placeholder.com/80x80/10B981/FFFFFF?text=Home',
  },
  {
    id: 4,
    name: 'Sports',
    icon: 'basketball',
    color: '#F59E0B',
    image: 'https://via.placeholder.com/80x80/F59E0B/FFFFFF?text=Sports',
  },
  {
    id: 5,
    name: 'Books',
    icon: 'book',
    color: '#8B5CF6',
    image: 'https://via.placeholder.com/80x80/8B5CF6/FFFFFF?text=Books',
  },
  {
    id: 6,
    name: 'Beauty',
    icon: 'rose',
    color: '#EC4899',
    image: 'https://via.placeholder.com/80x80/EC4899/FFFFFF?text=Beauty',
  },
];

const featuredProductsData = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    originalPrice: 149.99,
    image: 'https://via.placeholder.com/150x150/3B82F6/FFFFFF?text=Headphones',
    rating: 4.5,
    reviews: 128,
    badge: 'SALE',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://via.placeholder.com/150x150/EF4444/FFFFFF?text=Watch',
    rating: 4.8,
    reviews: 89,
    badge: 'HOT',
  },
  {
    id: 3,
    name: 'Laptop Stand',
    price: 49.99,
    originalPrice: 79.99,
    image: 'https://via.placeholder.com/150x150/10B981/FFFFFF?text=Stand',
    rating: 4.3,
    reviews: 45,
    badge: 'NEW',
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    price: 79.99,
    originalPrice: 120.99,
    image: 'https://via.placeholder.com/150x150/F59E0B/FFFFFF?text=Speaker',
    rating: 4.6,
    reviews: 203,
    badge: 'SALE',
  },
];

const dealsData = [
  {
    id: 1,
    name: 'Gaming Mouse',
    price: 29.99,
    originalPrice: 59.99,
    image: 'https://via.placeholder.com/120x120/8B5CF6/FFFFFF?text=Mouse',
    discount: 50,
    timeLeft: '2h 30m',
  },
  {
    id: 2,
    name: 'Phone Case',
    price: 14.99,
    originalPrice: 24.99,
    image: 'https://via.placeholder.com/120x120/EC4899/FFFFFF?text=Case',
    discount: 40,
    timeLeft: '5h 15m',
  },
  {
    id: 3,
    name: 'Wireless Charger',
    price: 19.99,
    originalPrice: 39.99,
    image: 'https://via.placeholder.com/120x120/06B6D4/FFFFFF?text=Charger',
    discount: 50,
    timeLeft: '1h 45m',
  },
];

import Layout from '../components/Layout';
export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBanner, setCurrentBanner] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('Search', { query: searchQuery });
    }
  };

  const renderBannerItem = ({ item, index }) => (
    <TouchableOpacity style={styles.bannerItem} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.bannerImage} />
      <View style={styles.bannerOverlay}>
        <Text style={styles.bannerTitle}>{item.title}</Text>
        <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => navigation.navigate('Category', { category: item })}
      activeOpacity={0.7}
    >
      <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
        <Icon name={item.icon} size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productItem}
      onPress={() => navigation.navigate('Product', { product: item })}
      activeOpacity={0.8}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        {item.badge && (
          <View style={[styles.productBadge, { backgroundColor: getBadgeColor(item.badge) }]}>
            <Text style={styles.productBadgeText}>{item.badge}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.favoriteButton}>
          <Icon name="heart-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews})</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>${item.price}</Text>
          <Text style={styles.originalPrice}>${item.originalPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDealItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.dealItem}
      onPress={() => navigation.navigate('Product', { product: item })}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.dealImage} />
      <View style={styles.dealInfo}>
        <Text style={styles.dealName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.dealPriceContainer}>
          <Text style={styles.dealPrice}>${item.price}</Text>
          <Text style={styles.dealOriginalPrice}>${item.originalPrice}</Text>
        </View>
        <View style={styles.dealFooter}>
          <Text style={styles.discountText}>{item.discount}% OFF</Text>
          <Text style={styles.timeLeft}>{item.timeLeft}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'SALE': return '#EF4444';
      case 'HOT': return '#F59E0B';
      case 'NEW': return '#10B981';
      default: return '#3B82F6';
    }
  };

  return (
     <Layout>
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Icon name="options" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Banner Carousel */}
      <View style={styles.bannerContainer}>
        <FlatList
          data={bannerData}
          renderItem={renderBannerItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setCurrentBanner(index);
          }}
        />
        <View style={styles.bannerIndicators}>
          {bannerData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                { opacity: index === currentBanner ? 1 : 0.5 }
              ]}
            />
          ))}
        </View>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={categoriesData}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Flash Deals */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Flash Deals</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={dealsData}
          renderItem={renderDealItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dealsList}
        />
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={featuredProductsData}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={styles.productsGrid}
        />
      </View>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
   </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000000',
  },
  bannerContainer: {
    marginBottom: 20,
  },
  bannerItem: {
    width: width,
    height: 200,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
  },
  bannerIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginHorizontal: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  seeAllText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '500',
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
    textAlign: 'center',
  },
  dealsList: {
    paddingHorizontal: 16,
  },
  dealItem: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dealImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  dealInfo: {
    padding: 8,
  },
  dealName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  dealPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dealPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginRight: 8,
  },
  dealOriginalPrice: {
    fontSize: 12,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  dealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discountText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '600',
  },
  timeLeft: {
    fontSize: 10,
    color: '#666',
  },
  productsGrid: {
    paddingHorizontal: 16,
  },
  productItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  productBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  productBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 6,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 12,
    color: '#000000',
    marginLeft: 4,
    fontWeight: '500',
  },
  reviewsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  bottomSpacing: {
    height: 100,
  },
});

// API Integration Helper Functions
// Replace the sample data with these functions

/*
// Example API functions to replace sample data:

const fetchBanners = async () => {
  try {
    const response = await fetch('YOUR_API_ENDPOINT/banners');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching banners:', error);
    return bannerData; // fallback to sample data
  }
};

const fetchCategories = async () => {
  try {
    const response = await fetch('YOUR_API_ENDPOINT/categories');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return categoriesData; // fallback to sample data
  }
};

const fetchFeaturedProducts = async () => {
  try {
    const response = await fetch('YOUR_API_ENDPOINT/products/featured');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return featuredProductsData; // fallback to sample data
  }
};

const fetchDeals = async () => {
  try {
    const response = await fetch('YOUR_API_ENDPOINT/deals');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching deals:', error);
    return dealsData; // fallback to sample data
  }
};
*/