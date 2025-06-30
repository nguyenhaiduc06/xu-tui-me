import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';

export default function ProfileTab() {
  const headerOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withSpring(1, { duration: 600 });
    contentOpacity.value = withDelay(200, withSpring(1, { duration: 800 }));
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const handleRetakeQuiz = () => {
    Alert.alert(
      'Làm lại Quiz',
      'Bạn có muốn làm lại quiz để cập nhật thông tin matching không?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Làm lại', onPress: () => router.push('/quiz') }
      ]
    );
  };

  const handleUpgrade = () => {
    router.push('/paywall');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={headerAnimatedStyle}>
        <LinearGradient
          colors={['#4facfe', '#00f2fe']}
          style={styles.header}
        >
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <Text style={styles.userName}>Người dùng</Text>
            <Text style={styles.userStatus}>Tài khoản miễn phí</Text>
          </View>
        </LinearGradient>
      </Animated.View>

      <Animated.View style={[styles.content, contentAnimatedStyle]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Thống kê của bạn</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Matches</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>1</Text>
                <Text style={styles.statLabel}>Quiz hoàn thành</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>95%</Text>
                <Text style={styles.statLabel}>Độ phù hợp cao nhất</Text>
              </View>
            </View>
          </View>

          <View style={styles.menuSection}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleRetakeQuiz}
              activeOpacity={0.8}
            >
              <View style={styles.menuIcon}>
                <Text style={styles.menuEmoji}>🎯</Text>
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Làm lại Quiz</Text>
                <Text style={styles.menuDescription}>Cập nhật thông tin matching</Text>
              </View>
              <Text style={styles.menuChevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleUpgrade}
              activeOpacity={0.8}
            >
              <View style={styles.menuIcon}>
                <Text style={styles.menuEmoji}>⭐</Text>
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Nâng cấp Premium</Text>
                <Text style={styles.menuDescription}>Mở khóa tất cả tính năng</Text>
              </View>
              <Text style={styles.menuChevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.8}
            >
              <View style={styles.menuIcon}>
                <Text style={styles.menuEmoji}>⚙️</Text>
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Cài đặt</Text>
                <Text style={styles.menuDescription}>Thông báo và quyền riêng tư</Text>
              </View>
              <Text style={styles.menuChevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.8}
            >
              <View style={styles.menuIcon}>
                <Text style={styles.menuEmoji}>❓</Text>
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Hỗ trợ</Text>
                <Text style={styles.menuDescription}>Câu hỏi thường gặp và liên hệ</Text>
              </View>
              <Text style={styles.menuChevron}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.upgradePrompt}>
            <Text style={styles.upgradeTitle}>🚀 Nâng cấp Premium</Text>
            <Text style={styles.upgradeDescription}>
              Mở khóa chat không giới hạn, xem profile đầy đủ và nhiều tính năng khác
            </Text>
            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={handleUpgrade}
              activeOpacity={0.8}
            >
              <Text style={styles.upgradeButtonText}>Nâng cấp ngay</Text>
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
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  profileHeader: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  userStatus: {
    fontSize: 14,
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
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#4facfe',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuEmoji: {
    fontSize: 20,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  menuChevron: {
    fontSize: 20,
    color: '#CCCCCC',
    fontFamily: 'Inter-Regular',
  },
  upgradePrompt: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
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
    marginBottom: 20,
  },
  upgradeButton: {
    backgroundColor: '#4facfe',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  upgradeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});