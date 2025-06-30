import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';

interface Match {
  id: number;
  name: string;
  age: number;
  image: string;
  compatibility: number;
  lastMessage?: string;
  isOnline: boolean;
}

const mockMatches: Match[] = [
  {
    id: 1,
    name: 'Minh Anh',
    age: 22,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    compatibility: 95,
    lastMessage: 'Chào bạn! Mình thấy chúng ta có nhiều điểm chung đấy 😊',
    isOnline: true,
  },
  {
    id: 2,
    name: 'Tuấn Anh',
    age: 24,
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    compatibility: 88,
    lastMessage: 'Bạn có thích xem phim không?',
    isOnline: false,
  },
  {
    id: 3,
    name: 'Linh Chi',
    age: 21,
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    compatibility: 92,
    isOnline: true,
  },
];

export default function MatchesTab() {
  const headerOpacity = useSharedValue(0);
  const matchesOpacity = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withSpring(1, { duration: 600 });
    matchesOpacity.value = withDelay(200, withSpring(1, { duration: 800 }));
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const matchesAnimatedStyle = useAnimatedStyle(() => ({
    opacity: matchesOpacity.value,
  }));

  const handleMatchPress = (match: Match) => {
    Alert.alert(
      'Tính năng đang phát triển',
      `Chat với ${match.name} sẽ có trong phiên bản tiếp theo!`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={headerAnimatedStyle}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Matches 💕</Text>
          <Text style={styles.headerSubtitle}>Những người phù hợp với bạn</Text>
        </LinearGradient>
      </Animated.View>

      <Animated.View style={[styles.content, matchesAnimatedStyle]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {mockMatches.map((match, index) => (
            <TouchableOpacity
              key={match.id}
              style={styles.matchCard}
              onPress={() => handleMatchPress(match)}
              activeOpacity={0.8}
            >
              <View style={styles.matchImageContainer}>
                <Image source={{ uri: match.image }} style={styles.matchImage} />
                {match.isOnline && <View style={styles.onlineIndicator} />}
              </View>

              <View style={styles.matchInfo}>
                <View style={styles.matchHeader}>
                  <Text style={styles.matchName}>{match.name}, {match.age}</Text>
                  <View style={styles.compatibilityBadge}>
                    <Text style={styles.compatibilityText}>{match.compatibility}%</Text>
                  </View>
                </View>

                {match.lastMessage ? (
                  <Text style={styles.lastMessage} numberOfLines={2}>
                    {match.lastMessage}
                  </Text>
                ) : (
                  <Text style={styles.noMessage}>Bắt đầu cuộc trò chuyện 💬</Text>
                )}
              </View>

              <View style={styles.chevron}>
                <Text style={styles.chevronText}>›</Text>
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.emptyState}>
            <Text style={styles.emptyStateEmoji}>🔍</Text>
            <Text style={styles.emptyStateTitle}>Tìm thêm matches</Text>
            <Text style={styles.emptyStateDescription}>
              Làm thêm quiz để tìm những người phù hợp với bạn hơn
            </Text>
            <TouchableOpacity style={styles.findMoreButton} activeOpacity={0.8}>
              <Text style={styles.findMoreButtonText}>Làm quiz mới</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  matchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  matchImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  matchImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  matchInfo: {
    flex: 1,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  matchName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333333',
  },
  compatibilityBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  compatibilityText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#4CAF50',
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
  },
  noMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#999999',
    fontStyle: 'italic',
  },
  chevron: {
    marginLeft: 8,
  },
  chevronText: {
    fontSize: 24,
    color: '#CCCCCC',
    fontFamily: 'Inter-Regular',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyStateEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  findMoreButton: {
    backgroundColor: '#667eea',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  findMoreButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});