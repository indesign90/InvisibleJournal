import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Calendar, Heart, MessageCircle } from 'lucide-react-native';

const mockEntries = [
  {
    id: '1',
    date: '2024-01-15',
    mood: 'Hopeful',
    moodColor: '#3B82F6',
    title: 'Morning Reflections',
    preview: 'Today I realized that sometimes the best conversations happen when we least expect them. The coffee shop was busy, but I found myself...',
    type: 'text',
    shared: true,
    reactions: 3,
  },
  {
    id: '2',
    date: '2024-01-12',
    mood: 'Creative',
    moodColor: '#F97316',
    title: 'Visual Expression',
    preview: 'Drew a sketch of how I felt today - colors flowing into each other like emotions mixing...',
    type: 'visual',
    shared: false,
    reactions: 0,
  },
  {
    id: '3',
    date: '2024-01-10',
    mood: 'Calm',
    moodColor: '#10B981',
    title: 'Evening Thoughts',
    preview: 'The sound of rain against my window brought such peace. I recorded my thoughts while listening to the rhythm...',
    type: 'voice',
    shared: true,
    reactions: 5,
  },
];

export default function HistoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEntries, setFilteredEntries] = useState(mockEntries);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredEntries(mockEntries);
    } else {
      const filtered = mockEntries.filter(entry =>
        entry.title.toLowerCase().includes(query.toLowerCase()) ||
        entry.preview.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEntries(filtered);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'voice':
        return '🎵';
      case 'visual':
        return '🎨';
      default:
        return '📝';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Journal</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your entries..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredEntries.map((entry) => (
          <TouchableOpacity
            key={entry.id}
            style={styles.entryCard}
            activeOpacity={0.7}
          >
            <View style={styles.entryHeader}>
              <View style={styles.entryMeta}>
                <View style={styles.dateContainer}>
                  <Calendar size={14} color="#6B7280" />
                  <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
                </View>
                <View style={[styles.moodTag, { backgroundColor: entry.moodColor }]}>
                  <Text style={styles.moodText}>{entry.mood}</Text>
                </View>
              </View>
              <Text style={styles.typeIcon}>{getTypeIcon(entry.type)}</Text>
            </View>

            <Text style={styles.entryTitle}>{entry.title}</Text>
            <Text style={styles.entryPreview}>{entry.preview}</Text>

            {entry.shared && (
              <View style={styles.entryFooter}>
                <View style={styles.sharedBadge}>
                  <Text style={styles.sharedText}>Shared to Circle</Text>
                </View>
                {entry.reactions > 0 && (
                  <View style={styles.reactionContainer}>
                    <Heart size={14} color="#EF4444" />
                    <Text style={styles.reactionCount}>{entry.reactions}</Text>
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>
        ))}

        {filteredEntries.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No entries found</Text>
            <Text style={styles.emptyText}>
              {searchQuery ? 'Try a different search term' : 'Start writing your first journal entry'}
            </Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  entryCard: {
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
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  entryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  entryDate: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  moodTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  moodText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  typeIcon: {
    fontSize: 16,
  },
  entryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  entryPreview: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  entryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sharedBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sharedText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
  },
  reactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reactionCount: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
});