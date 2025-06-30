import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function MatchResult() {
  const cardOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.8);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    cardOpacity.value = withSpring(1, { duration: 800 });
    cardScale.value = withSpring(1, { duration: 800 });
    buttonOpacity.value = withDelay(600, withSpring(1, { duration: 600 }));
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ scale: cardScale.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
  }));

  return (
    <LinearGradient
      colors={['#FF6B9D', '#C44569', '#F8B500']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Tìm thấy match! 🎉</Text>
        <Text style={styles.subtitle}>Chúng mình đã tìm thấy người phù hợp với bạn</Text>

        <Animated.View style={[styles.matchCard, cardAnimatedStyle]}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.profileImage}
            />
            <BlurView intensity={80} style={styles.blurOverlay}>
              <View style={styles.lockIcon}>
                <Text style={styles.lockEmoji}>🔒</Text>
              </View>
            </BlurView>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Minh Anh, 22</Text>
            <Text style={styles.compatibility}>95% phù hợp</Text>
            <Text style={styles.location}>📍 Hà Nội</Text>
            
            <View style={styles.interestsContainer}>
              <View style={styles.interestTag}>
                <Text style={styles.interestText}>🎵 Nhạc</Text>
              </View>
              <View style={styles.interestTag}>
                <Text style={styles.interestText}>☕ Cà phê</Text>
              </View>
              <View style={styles.interestTag}>
                <Text style={styles.interestText}>📚 Đọc sách</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
          <TouchableOpacity
            style={styles.unlockButton}
            onPress={() => router.push('/paywall')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Mở khóa profile 🔓</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.laterButton}
            onPress={() => router.push('/waitlist')}
            activeOpacity={0.8}
          >
            <Text style={styles.laterButtonText}>Để sau</Text>
          </TouchableOpacity>
        </Animated.View>
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
  title: {
    fontSize: 32,
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
    marginBottom: 40,
    opacity: 0.9,
    lineHeight: 24,
  },
  matchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: (width - 168) / 2 - 20,
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockEmoji: {
    fontSize: 20,
  },
  profileInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 4,
  },
  compatibility: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B9D',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 16,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  interestText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
  },
  buttonContainer: {
    gap: 16,
  },
  unlockButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#C44569',
    textAlign: 'center',
  },
  laterButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  laterButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.8,
  },
});