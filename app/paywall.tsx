import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function Paywall() {
  const titleOpacity = useSharedValue(0);
  const plansOpacity = useSharedValue(0);
  const featuresOpacity = useSharedValue(0);

  useEffect(() => {
    titleOpacity.value = withSpring(1, { duration: 600 });
    plansOpacity.value = withDelay(200, withSpring(1, { duration: 600 }));
    featuresOpacity.value = withDelay(400, withSpring(1, { duration: 600 }));
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
  }));

  const plansAnimatedStyle = useAnimatedStyle(() => ({
    opacity: plansOpacity.value,
  }));

  const featuresAnimatedStyle = useAnimatedStyle(() => ({
    opacity: featuresOpacity.value,
  }));

  const handlePurchase = (plan: string, price: string) => {
    // In a real app, this would integrate with Google Play Billing
    Alert.alert(
      'Tính năng đang phát triển',
      `Thanh toán ${plan} (${price}) sẽ được tích hợp với Google Play Billing trong phiên bản chính thức.`,
      [
        { text: 'OK', onPress: () => router.push('/(tabs)') }
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View style={[styles.header, titleAnimatedStyle]}>
          <Text style={styles.title}>Mở khóa tính năng 🔓</Text>
          <Text style={styles.subtitle}>Khám phá thêm nhiều điều thú vị</Text>
        </Animated.View>

        <Animated.View style={[styles.plansContainer, plansAnimatedStyle]}>
          <TouchableOpacity
            style={[styles.planCard, styles.popularPlan]}
            onPress={() => handlePurchase('Mở khóa Chat', '99.000đ')}
            activeOpacity={0.8}
          >
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>PHỔ BIẾN</Text>
            </View>
            <Text style={styles.planTitle}>Mở khóa Chat 💬</Text>
            <Text style={styles.planPrice}>99.000đ</Text>
            <Text style={styles.planDescription}>Nhắn tin không giới hạn với match của bạn</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.planCard}
            onPress={() => handlePurchase('Mở khóa Profile', '79.000đ')}
            activeOpacity={0.8}
          >
            <Text style={styles.planTitle}>Mở khóa Profile 👤</Text>
            <Text style={styles.planPrice}>79.000đ</Text>
            <Text style={styles.planDescription}>Xem thông tin chi tiết của match</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.featuresContainer, featuresAnimatedStyle]}>
          <Text style={styles.featuresTitle}>Bạn sẽ được:</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✨</Text>
              <Text style={styles.featureText}>Xem profile đầy đủ của match</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>💬</Text>
              <Text style={styles.featureText}>Nhắn tin không giới hạn</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>❤️</Text>
              <Text style={styles.featureText}>React và comment trên feed</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎯</Text>
              <Text style={styles.featureText}>Tìm thêm nhiều match mới</Text>
            </View>
          </View>
        </Animated.View>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.push('/(tabs)')}
          activeOpacity={0.8}
        >
          <Text style={styles.skipButtonText}>Bỏ qua</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  plansContainer: {
    marginBottom: 40,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    position: 'relative',
  },
  popularPlan: {
    borderWidth: 2,
    borderColor: '#F8B500',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: 16,
    backgroundColor: '#F8B500',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  planTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#667eea',
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featuresTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    flex: 1,
  },
  skipButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  skipButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.8,
  },
});