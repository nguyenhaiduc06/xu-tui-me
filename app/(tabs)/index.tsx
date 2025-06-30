import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface Post {
  id: number;
  author: string;
  content: string;
  emoji: string;
  reactions: { [key: string]: number };
  comments: number;
  timestamp: string;
}

const mockPosts: Post[] = [
  {
    id: 1,
    author: 'Minh Anh',
    content: 'Hôm nay trời đẹp quá, ai rủ đi cà phê không? ☕️',
    emoji: '☀️',
    reactions: { '❤️': 12, '😍': 8, '☕': 5 },
    comments: 3,
    timestamp: '2 giờ trước'
  },
  {
    id: 2,
    author: 'Tuấn Anh',
    content: 'Vừa xem phim mới siêu hay, ai cần gợi ý phim cuối tuần không? 🎬',
    emoji: '🎭',
    reactions: { '🔥': 15, '👍': 10, '🎬': 7 },
    comments: 5,
    timestamp: '4 giờ trước'
  },
  {
    id: 3,
    author: 'Linh Chi',
    content: 'Mood hôm nay: nghe nhạc ballad và nhớ về những kỷ niệm đẹp 🎵',
    emoji: '🌙',
    reactions: { '💙': 20, '🎵': 12, '✨': 8 },
    comments: 7,
    timestamp: '6 giờ trước'
  },
  {
    id: 4,
    author: 'Đức Minh',
    content: 'Ai thích đi du lịch Đà Lạt không? Mình đang plan chuyến đi tháng sau 🌸',
    emoji: '🏔️',
    reactions: { '🌸': 18, '✈️': 14, '❤️': 11 },
    comments: 9,
    timestamp: '8 giờ trước'
  },
  {
    id: 5,
    author: 'Thu Hà',
    content: 'Cuối tuần này ai có kế hoạch gì thú vị không? Mình đang tìm hoạt động mới 🎨',
    emoji: '🎪',
    reactions: { '🎨': 16, '🎪': 9, '💫': 13 },
    comments: 6,
    timestamp: '1 ngày trước'
  }
];

export default function FeedTab() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [isPaidUser] = useState(false); // This would come from user state

  const fadeInValue = useSharedValue(0);

  useEffect(() => {
    fadeInValue.value = withSpring(1, { duration: 800 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeInValue.value,
  }));

  const handleReaction = (postId: number, emoji: string) => {
    if (!isPaidUser) {
      Alert.alert(
        'Tính năng Premium',
        'Bạn cần nâng cấp tài khoản để có thể react bài viết',
        [{ text: 'OK' }]
      );
      return;
    }
    // Handle reaction logic
  };

  const handleComment = (postId: number) => {
    if (!isPaidUser) {
      Alert.alert(
        'Tính năng Premium',
        'Bạn cần nâng cấp tài khoản để có thể comment',
        [{ text: 'OK' }]
      );
      return;
    }
    // Handle comment logic
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF6B9D', '#C44569']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Vibe Feed ✨</Text>
        <Text style={styles.headerSubtitle}>Khám phá những câu chuyện thú vị</Text>
      </LinearGradient>

      <Animated.View style={[styles.content, animatedStyle]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.authorInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarEmoji}>{post.emoji}</Text>
                  </View>
                  <View>
                    <Text style={styles.authorName}>{post.author}</Text>
                    <Text style={styles.timestamp}>{post.timestamp}</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.postContent}>{post.content}</Text>

              <View style={styles.postActions}>
                <View style={styles.reactionsContainer}>
                  {Object.entries(post.reactions).map(([emoji, count]) => (
                    <TouchableOpacity
                      key={emoji}
                      style={styles.reactionButton}
                      onPress={() => handleReaction(post.id, emoji)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.reactionEmoji}>{emoji}</Text>
                      <Text style={styles.reactionCount}>{count}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.commentButton}
                  onPress={() => handleComment(post.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.commentIcon}>💬</Text>
                  <Text style={styles.commentCount}>{post.comments}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {!isPaidUser && (
            <View style={styles.upgradePrompt}>
              <Text style={styles.upgradeTitle}>Muốn tương tác thêm? 🚀</Text>
              <Text style={styles.upgradeDescription}>
                Nâng cấp tài khoản để react và comment trên các bài viết
              </Text>
              <TouchableOpacity style={styles.upgradeButton} activeOpacity={0.8}>
                <Text style={styles.upgradeButtonText}>Nâng cấp ngay</Text>
              </TouchableOpacity>
            </View>
          )}
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
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  postHeader: {
    marginBottom: 16,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarEmoji: {
    fontSize: 20,
  },
  authorName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999999',
  },
  postContent: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333333',
    lineHeight: 24,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reactionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  reactionEmoji: {
    fontSize: 16,
  },
  reactionCount: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentIcon: {
    fontSize: 16,
  },
  commentCount: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  upgradePrompt: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  upgradeTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  upgradeDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  upgradeButton: {
    backgroundColor: '#FF6B9D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  upgradeButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});