import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, MessageCircle, MoveHorizontal as MoreHorizontal, Plus } from 'lucide-react-native';

const mockCircles = [
  { id: '1', name: 'Anxiety Before Work', color: '#F59E0B', memberCount: 127 },
  { id: '2', name: 'Loneliness', color: '#8B5CF6', memberCount: 89 },
  { id: '3', name: 'Creative Burnout', color: '#EF4444', memberCount: 156 },
  { id: '4', name: 'Relationship Reflections', color: '#10B981', memberCount: 203 },
  { id: '5', name: 'Open Space', color: '#3B82F6', memberCount: 342 },
];

const mockPosts = [
  {
    id: '1',
    circle: 'Anxiety Before Work',
    circleColor: '#F59E0B',
    mood: 'Overwhelmed',
    content: 'Every Sunday night I get this knot in my stomach thinking about Monday morning. The anticipation is often worse than the actual work day. Anyone else feel this?',
    nickname: 'QuietThoughts',
    reactions: 12,
    hasReacted: false,
    timeAgo: '2h ago',
  },
  {
    id: '2',
    circle: 'Creative Burnout',
    circleColor: '#EF4444',
    mood: 'Numb',
    content: 'I used to love painting, but lately I just stare at the blank canvas. The colors all look the same. Maybe I need to take a break, but I\'m scared I\'ll never come back to it.',
    nickname: 'ColorlessArtist',
    reactions: 8,
    hasReacted: true,
    timeAgo: '4h ago',
  },
  {
    id: '3',
    circle: 'Open Space',
    circleColor: '#3B82F6',
    mood: 'Hopeful',
    content: 'Today I had a conversation with a stranger at the bus stop about books. It reminded me that connection can happen anywhere, anytime. Small moments of humanity.',
    nickname: 'BookWorm23',
    reactions: 15,
    hasReacted: false,
    timeAgo: '6h ago',
  },
];

export default function CirclesScreen() {
  const [selectedTab, setSelectedTab] = useState<'recent' | 'circles'>('recent');
  const [posts, setPosts] = useState(mockPosts);

  const handleReaction = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            hasReacted: !post.hasReacted,
            reactions: post.hasReacted ? post.reactions - 1 : post.reactions + 1
          }
        : post
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Circles</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'recent' && styles.activeTab]}
            onPress={() => setSelectedTab('recent')}
          >
            <Text style={[styles.tabText, selectedTab === 'recent' && styles.activeTabText]}>
              Recent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'circles' && styles.activeTab]}
            onPress={() => setSelectedTab('circles')}
          >
            <Text style={[styles.tabText, selectedTab === 'circles' && styles.activeTabText]}>
              My Circles
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'recent' ? (
          <View>
            {posts.map((post) => (
              <View key={post.id} style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={styles.postMeta}>
                    <View style={[styles.circleTag, { backgroundColor: post.circleColor }]}>
                      <Text style={styles.circleTagText}>{post.circle}</Text>
                    </View>
                    <Text style={styles.timeAgo}>{post.timeAgo}</Text>
                  </View>
                  <TouchableOpacity style={styles.moreButton}>
                    <MoreHorizontal size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>

                <View style={styles.postContent}>
                  <View style={styles.moodBadge}>
                    <Text style={styles.moodBadgeText}>{post.mood}</Text>
                  </View>
                  <Text style={styles.postText}>{post.content}</Text>
                  <Text style={styles.nickname}>— {post.nickname}</Text>
                </View>

                <View style={styles.postActions}>
                  <TouchableOpacity
                    style={[styles.reactionButton, post.hasReacted && styles.reactionButtonActive]}
                    onPress={() => handleReaction(post.id)}
                    activeOpacity={0.7}
                  >
                    <Heart 
                      size={16} 
                      color={post.hasReacted ? '#EF4444' : '#6B7280'}
                      fill={post.hasReacted ? '#EF4444' : 'none'}
                    />
                    <Text style={[
                      styles.reactionText, 
                      post.hasReacted && styles.reactionTextActive
                    ]}>
                      I feel this ({post.reactions})
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View>
            <TouchableOpacity style={styles.addCircleButton} activeOpacity={0.7}>
              <Plus size={20} color="#3B82F6" />
              <Text style={styles.addCircleText}>Suggest a New Circle</Text>
            </TouchableOpacity>

            {mockCircles.map((circle) => (
              <TouchableOpacity key={circle.id} style={styles.circleCard} activeOpacity={0.7}>
                <View style={[styles.circleColor, { backgroundColor: circle.color }]} />
                <View style={styles.circleInfo}>
                  <Text style={styles.circleName}>{circle.name}</Text>
                  <Text style={styles.circleMemberCount}>{circle.memberCount} members</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#1F2937',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  circleTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  circleTagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  timeAgo: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  moreButton: {
    padding: 4,
  },
  postContent: {
    marginBottom: 16,
  },
  moodBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  moodBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  postText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    lineHeight: 22,
    marginBottom: 8,
  },
  nickname: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    fontStyle: 'italic',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    gap: 6,
  },
  reactionButtonActive: {
    backgroundColor: '#FEF2F2',
  },
  reactionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  reactionTextActive: {
    color: '#EF4444',
  },
  addCircleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    gap: 8,
  },
  addCircleText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#3B82F6',
  },
  circleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  circleColor: {
    width: 12,
    height: 48,
    borderRadius: 6,
    marginRight: 16,
  },
  circleInfo: {
    flex: 1,
  },
  circleName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  circleMemberCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});