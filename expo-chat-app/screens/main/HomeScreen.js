import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../contexts/ThemeContext';
import { mockUsers, regions } from '../../data/mockData';
import { Card, Avatar, Badge } from '../../components/Card';
import { SearchInput, Select } from '../../components/Input';

export default function HomeScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [ageFilter, setAgeFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('전체');
  const [genderFilter, setGenderFilter] = useState('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchSearch = user.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       user.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchAge = ageFilter === 'all' || 
                    (ageFilter === '20s' && user.age >= 20 && user.age < 30) ||
                    (ageFilter === '30s' && user.age >= 30 && user.age < 40);
    const matchRegion = regionFilter === '전체' || user.region === regionFilter;
    const matchGender = genderFilter === 'all' || user.gender === genderFilter;

    return matchSearch && matchAge && matchRegion && matchGender;
  });

  const onlineCount = mockUsers.filter(u => u.online).length;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* 헤더 */}
        <View style={styles.header}>
          <LinearGradient
            colors={theme.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.titleGradient}
          >
            <Text style={styles.title}>참여중인 사용자 💕</Text>
          </LinearGradient>
          
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            마음에 드는 사람에게 대화를 걸어보세요
          </Text>

          {/* 온라인 인디케이터 */}
          <View style={[styles.onlineIndicator, { backgroundColor: theme.inputBg }]}>
            <View style={styles.onlineDot} />
            <Text style={[styles.onlineText, { color: theme.textSecondary }]}>
              현재 <Text style={[styles.onlineCount, { color: theme.primary }]}>{onlineCount}명</Text>이 온라인입니다
            </Text>
          </View>

          {/* 검색 */}
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="닉네임이나 소개글로 검색..."
            style={styles.searchInput}
          />
        </View>

        {/* 필터 */}
        <View style={styles.filterSection}>
          <View style={styles.filterGrid}>
            <View style={styles.filterGroup}>
              <Text style={[styles.filterLabel, { color: theme.textSecondary }]}>나이</Text>
              <Select
                value={ageFilter}
                onValueChange={setAgeFilter}
                items={[
                  { label: '전체', value: 'all' },
                  { label: '20대', value: '20s' },
                  { label: '30대', value: '30s' },
                ]}
              />
            </View>

            <View style={styles.filterGroup}>
              <Text style={[styles.filterLabel, { color: theme.textSecondary }]}>지역</Text>
              <Select
                value={regionFilter}
                onValueChange={setRegionFilter}
                items={regions.map(r => ({ label: r, value: r }))}
              />
            </View>

            <View style={styles.filterGroup}>
              <Text style={[styles.filterLabel, { color: theme.textSecondary }]}>성별</Text>
              <Select
                value={genderFilter}
                onValueChange={setGenderFilter}
                items={[
                  { label: '전체', value: 'all' },
                  { label: '남성', value: '남성' },
                  { label: '여성', value: '여성' },
                ]}
              />
            </View>
          </View>
        </View>

        {/* 사용자 목록 */}
        <View style={styles.userList}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <Card key={user.id} style={styles.userCard}>
                <View style={styles.avatarWrapper}>
                  <Avatar emoji={user.avatar} size={64} online={user.online} />
                </View>
                
                <View style={styles.userInfo}>
                  <View style={styles.userHeader}>
                    <Text style={[styles.userName, { color: theme.text }]} numberOfLines={1}>
                      {user.nickname}
                    </Text>
                  </View>
                  
                  <View style={styles.userMeta}>
                    <Badge style={styles.badge}>{user.age}세</Badge>
                    <Badge style={styles.badge}>{user.gender}</Badge>
                    <Badge style={styles.badge}>{user.region}</Badge>
                  </View>
                  
                  <Text style={[styles.userBio, { color: theme.textSecondary }]} numberOfLines={2}>
                    {user.bio}
                  </Text>
                  
                  <View style={styles.userFooter}>
                    <Text style={[styles.lastSeen, { color: theme.textTertiary }]}>
                      {user.lastSeen}
                    </Text>
                    <TouchableOpacity>
                      <LinearGradient
                        colors={theme.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.chatButton}
                      >
                        <Text style={styles.chatButtonText}>대화하기 💬</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                검색 결과가 없습니다
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 20,
  },
  titleGradient: {
    alignSelf: 'flex-start',
    paddingHorizontal: 2,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  onlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  onlineText: {
    fontSize: 14,
  },
  onlineCount: {
    fontWeight: '700',
  },
  searchInput: {
    marginBottom: 0,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterGrid: {
    flexDirection: 'row',
  },
  filterGroup: {
    flex: 1,
    marginHorizontal: 5,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  userList: {
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatarWrapper: {
    marginRight: 14,
  },
  userInfo: {
    flex: 1,
    minWidth: 0,
  },
  userHeader: {
    marginBottom: 6,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
  },
  userMeta: {
    flexDirection: 'row',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  badge: {
    marginRight: 6,
    marginBottom: 4,
  },
  userBio: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  userFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastSeen: {
    fontSize: 12,
  },
  chatButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chatButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
  },
});
