import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PenTool, Lightbulb } from 'lucide-react-native';

const creativePrompts = [
  "Describe a place where you feel most like yourself.",
  "What would you tell your younger self today?",
  "Write about a moment that changed your perspective.",
];

export default function HomeScreen() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [currentPrompt] = useState(creativePrompts[Math.floor(Math.random() * creativePrompts.length)]);

  const handleStartWriting = () => {
    router.push('/journal-entry');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hi there, ready to reflect?</Text>
        </View>

        <View style={styles.promptCard}>
          <Text style={styles.promptTitle}>What's been on your mind lately?</Text>
          <Text style={styles.promptSubtext}>
            You can write as much or as little as you'd like.
          </Text>
          
          <TouchableOpacity
            style={styles.inspirationButton}
            onPress={() => setShowPrompt(!showPrompt)}
            activeOpacity={0.7}
          >
            <Lightbulb size={16} color="#3B82F6" />
            <Text style={styles.inspirationText}>Need inspiration?</Text>
          </TouchableOpacity>

          {showPrompt && (
            <View style={styles.creativePrompt}>
              <Text style={styles.creativePromptText}>{currentPrompt}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.startWritingButton}
          onPress={handleStartWriting}
          activeOpacity={0.8}
        >
          <PenTool size={20} color="#FFFFFF" />
          <Text style={styles.startWritingText}>Start Writing</Text>
        </TouchableOpacity>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Reflections</Text>
          <View style={styles.recentCard}>
            <Text style={styles.recentDate}>Yesterday</Text>
            <Text style={styles.recentPreview}>
              Today I realized that sometimes the best conversations happen...
            </Text>
          </View>
          <View style={styles.recentCard}>
            <Text style={styles.recentDate}>3 days ago</Text>
            <Text style={styles.recentPreview}>
              The morning light through my window reminded me of...
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingVertical: 24,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  promptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  promptTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  promptSubtext: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 16,
  },
  inspirationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inspirationText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
  },
  creativePrompt: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  creativePromptText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  startWritingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 32,
    gap: 8,
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startWritingText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  recentSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  recentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
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
  recentDate: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 4,
  },
  recentPreview: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 20,
  },
});