import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Brain, BookOpen, SkipForward, Share2 } from 'lucide-react-native';

const aiInsights = [
  "Your words suggest a journey of self-discovery. Like a river finding its path, you're navigating through uncertainty with quiet strength.",
  "There's a beautiful resilience in your reflection. Sometimes we need to sit with our feelings before we can understand their message.",
  "Your thoughts remind me of a seed waiting for the right season to grow. Patience with yourself is a form of self-love.",
];

const poems = [
  {
    title: "Gentle Reminder",
    content: "In the quiet space between\nthoughts and words,\nyou will find\nthe peace you seek.\n\nIt was always there,\nwaiting for you\nto remember\nhow to breathe."
  },
  {
    title: "Current",
    content: "You are not broken—\nyou are breaking open,\nlike dawn splits the sky,\nlike flowers crack\nthrough concrete.\n\nThis is how\nthe light gets in."
  },
  {
    title: "Today",
    content: "Today you showed up\nfor yourself,\nand that is enough.\n\nTomorrow you will\nshow up again,\nand that will be\nenough too."
  },
];

export default function ReflectionScreen() {
  const [selectedReflection, setSelectedReflection] = useState<'ai' | 'poem' | null>(null);
  const [currentInsight] = useState(aiInsights[Math.floor(Math.random() * aiInsights.length)]);
  const [currentPoem] = useState(poems[Math.floor(Math.random() * poems.length)]);

  const handleBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push('/share-circle');
  };

  const handleContinue = () => {
    router.push('/share-circle');
  };

  const renderReflectionContent = () => {
    if (selectedReflection === 'ai') {
      return (
        <View style={styles.reflectionContent}>
          <View style={styles.reflectionCard}>
            <View style={styles.reflectionHeader}>
              <Brain size={24} color="#3B82F6" />
              <Text style={styles.reflectionTitle}>AI Insight</Text>
            </View>
            <Text style={styles.reflectionText}>{currentInsight}</Text>
          </View>
        </View>
      );
    }

    if (selectedReflection === 'poem') {
      return (
        <View style={styles.reflectionContent}>
          <View style={styles.reflectionCard}>
            <View style={styles.reflectionHeader}>
              <BookOpen size={24} color="#8B5CF6" />
              <Text style={styles.reflectionTitle}>{currentPoem.title}</Text>
            </View>
            <Text style={styles.poemText}>{currentPoem.content}</Text>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Reflection</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.promptSection}>
          <Text style={styles.promptTitle}>What kind of reflection would you like today?</Text>
          <Text style={styles.promptSubtext}>
            Choose how you'd like to explore your thoughts further, or skip to continue.
          </Text>
        </View>

        <View style={styles.optionsSection}>
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedReflection === 'ai' && styles.optionCardSelected
            ]}
            onPress={() => setSelectedReflection('ai')}
            activeOpacity={0.7}
          >
            <Brain size={32} color="#3B82F6" />
            <Text style={styles.optionTitle}>AI Insight</Text>
            <Text style={styles.optionDescription}>
              Get a gentle perspective on your thoughts through AI-generated insights
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedReflection === 'poem' && styles.optionCardSelected
            ]}
            onPress={() => setSelectedReflection('poem')}
            activeOpacity={0.7}
          >
            <BookOpen size={32} color="#8B5CF6" />
            <Text style={styles.optionTitle}>Poem</Text>
            <Text style={styles.optionDescription}>
              Find comfort in a short, calming poem curated for reflection
            </Text>
          </TouchableOpacity>
        </View>

        {renderReflectionContent()}

        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            activeOpacity={0.7}
          >
            <SkipForward size={20} color="#6B7280" />
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.continueButton,
              selectedReflection && styles.continueButtonActive
            ]}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Share2 size={20} color={selectedReflection ? '#FFFFFF' : '#6B7280'} />
            <Text style={[
              styles.continueText,
              selectedReflection && styles.continueTextActive
            ]}>
              Continue to Share
            </Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  promptSection: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  promptTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  promptSubtext: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  optionsSection: {
    gap: 16,
    marginBottom: 24,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  optionCardSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#F8FAFC',
  },
  optionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  reflectionContent: {
    marginBottom: 32,
  },
  reflectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  reflectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  reflectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  reflectionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  poemText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 24,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
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
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
    gap: 8,
  },
  continueButtonActive: {
    backgroundColor: '#3B82F6',
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