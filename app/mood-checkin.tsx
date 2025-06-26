import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, SkipForward } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const moodTags = [
  { id: 'calm', label: 'Calm', color: '#10B981', emoji: '😌' },
  { id: 'overwhelmed', label: 'Overwhelmed', color: '#F59E0B', emoji: '😰' },
  { id: 'numb', label: 'Numb', color: '#6B7280', emoji: '😶' },
  { id: 'hopeful', label: 'Hopeful', color: '#3B82F6', emoji: '🌟' },
  { id: 'confused', label: 'Confused', color: '#8B5CF6', emoji: '🤔' },
  { id: 'creative', label: 'Creative', color: '#F97316', emoji: '🎨' },
];

export default function MoodCheckInScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Want to tag your mood?</Text>
          <Text style={styles.subtitle}>
            Choose what resonates with you right now, or skip to continue
          </Text>
        </View>

        {/* Mood Selection */}
        <View style={styles.moodSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moodScrollContainer}
            style={styles.moodScrollView}
          >
            {moodTags.map((mood, index) => (
              <TouchableOpacity
                key={mood.id}
                style={[
                  styles.moodChip,
                  selectedMood === mood.id && [
                    styles.selectedMoodChip,
                    { borderColor: mood.color, backgroundColor: `${mood.color}15` }
                  ],
                  index === 0 && styles.firstMoodChip,
                  index === moodTags.length - 1 && styles.lastMoodChip,
                ]}
                onPress={() => setSelectedMood(selectedMood === mood.id ? null : mood.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={[
                  styles.moodText,
                  selectedMood === mood.id && { color: mood.color, fontFamily: 'Inter-SemiBold' }
                ]}>
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Selected Mood Display */}
        {selectedMood && (
          <View style={styles.selectedMoodDisplay}>
            <View style={[
              styles.selectedMoodCard,
              { borderLeftColor: moodTags.find(m => m.id === selectedMood)?.color }
            ]}>
              <Text style={styles.selectedMoodLabel}>Current mood:</Text>
              <View style={styles.selectedMoodContent}>
                <Text style={styles.selectedMoodEmoji}>
                  {moodTags.find(m => m.id === selectedMood)?.emoji}
                </Text>
                <Text style={[
                  styles.selectedMoodText,
                  { color: moodTags.find(m => m.id === selectedMood)?.color }
                ]}>
                  {moodTags.find(m => m.id === selectedMood)?.label}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            activeOpacity={0.7}
          >
            <SkipForward size={20} color="#6B7280" />
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.continueButton,
              selectedMood && styles.continueButtonActive
            ]}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.continueText,
              selectedMood && styles.continueTextActive
            ]}>
              {selectedMood ? 'Continue' : 'Continue without mood'}
            </Text>
            <ArrowRight size={20} color={selectedMood ? '#FFFFFF' : '#6B7280'} />
          </TouchableOpacity>
        </View>
      </View>
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
    paddingTop: 32,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: width * 0.85,
  },
  moodSection: {
    flex: 1,
    justifyContent: 'center',
  },
  moodScrollView: {
    flexGrow: 0,
  },
  moodScrollContainer: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  moodChip: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 6,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  firstMoodChip: {
    marginLeft: 12,
  },
  lastMoodChip: {
    marginRight: 12,
  },
  selectedMoodChip: {
    borderWidth: 2,
    transform: [{ scale: 1.05 }],
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  moodText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    textAlign: 'center',
  },
  selectedMoodDisplay: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  selectedMoodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    minWidth: width * 0.7,
  },
  selectedMoodLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 8,
  },
  selectedMoodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  selectedMoodEmoji: {
    fontSize: 28,
  },
  selectedMoodText: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
  },
  actionsSection: {
    paddingBottom: 32,
    gap: 16,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  skipText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
    gap: 8,
  },
  continueButtonActive: {
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  continueText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  continueTextActive: {
    color: '#FFFFFF',
  },
});