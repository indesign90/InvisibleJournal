import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Check, Type, Mic, Palette } from 'lucide-react-native';

const moodTags = [
  { id: 'calm', label: 'Calm', color: '#10B981' },
  { id: 'overwhelmed', label: 'Overwhelmed', color: '#F59E0B' },
  { id: 'numb', label: 'Numb', color: '#6B7280' },
  { id: 'hopeful', label: 'Hopeful', color: '#3B82F6' },
  { id: 'confused', label: 'Confused', color: '#8B5CF6' },
  { id: 'creative', label: 'Creative', color: '#F97316' },
];

export default function JournalEntryScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [expressionMode, setExpressionMode] = useState<'text' | 'voice' | 'visual'>('text');
  const [entryContent, setEntryContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleDone = () => {
    if (entryContent.trim()) {
      router.push('/reflection');
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // In a real app, implement voice recording here
    setTimeout(() => {
      setIsRecording(false);
      setEntryContent('Voice recording captured...');
    }, 2000);
  };

  const renderExpressionModeContent = () => {
    switch (expressionMode) {
      case 'voice':
        return (
          <View style={styles.voiceContainer}>
            <TouchableOpacity
              style={[styles.recordButton, isRecording && styles.recordButtonActive]}
              onPress={handleStartRecording}
              disabled={isRecording}
            >
              <Mic size={32} color={isRecording ? '#EF4444' : '#6B7280'} />
            </TouchableOpacity>
            <Text style={styles.recordingText}>
              {isRecording ? 'Recording...' : 'Tap to record your thoughts'}
            </Text>
            {entryContent && (
              <View style={styles.recordingPreview}>
                <Text style={styles.recordingPreviewText}>Recording saved</Text>
              </View>
            )}
          </View>
        );
      
      case 'visual':
        return (
          <View style={styles.visualContainer}>
            <View style={styles.visualPlaceholder}>
              <Palette size={48} color="#6B7280" />
              <Text style={styles.visualPlaceholderText}>Visual mode coming soon</Text>
              <Text style={styles.visualSubtext}>Upload images or create drawings</Text>
            </View>
          </View>
        );
      
      default:
        return (
          <TextInput
            style={styles.textInput}
            placeholder="Start typing here..."
            value={entryContent}
            onChangeText={setEntryContent}
            multiline
            textAlignVertical="top"
            placeholderTextColor="#9CA3AF"
            autoFocus
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>New Entry</Text>
        <TouchableOpacity
          style={[styles.doneButton, entryContent.trim() && styles.doneButtonActive]}
          onPress={handleDone}
          disabled={!entryContent.trim()}
        >
          <Check size={20} color={entryContent.trim() ? '#FFFFFF' : '#9CA3AF'} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.moodSection}>
          <Text style={styles.sectionLabel}>How are you feeling?</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moodContainer}
          >
            {moodTags.map((mood) => (
              <TouchableOpacity
                key={mood.id}
                style={[
                  styles.moodChip,
                  selectedMood === mood.id && styles.selectedMoodChip,
                  { borderColor: mood.color }
                ]}
                onPress={() => setSelectedMood(mood.id)}
              >
                <Text style={[
                  styles.moodText,
                  selectedMood === mood.id && { color: mood.color }
                ]}>
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.expressionSection}>
          <Text style={styles.sectionLabel}>Expression Mode</Text>
          <View style={styles.modeSelector}>
            <TouchableOpacity
              style={[styles.modeButton, expressionMode === 'text' && styles.modeButtonActive]}
              onPress={() => setExpressionMode('text')}
            >
              <Type size={20} color={expressionMode === 'text' ? '#3B82F6' : '#6B7280'} />
              <Text style={[
                styles.modeText,
                expressionMode === 'text' && styles.modeTextActive
              ]}>
                Text
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.modeButton, expressionMode === 'voice' && styles.modeButtonActive]}
              onPress={() => setExpressionMode('voice')}
            >
              <Mic size={20} color={expressionMode === 'voice' ? '#3B82F6' : '#6B7280'} />
              <Text style={[
                styles.modeText,
                expressionMode === 'voice' && styles.modeTextActive
              ]}>
                Voice
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.modeButton, expressionMode === 'visual' && styles.modeButtonActive]}
              onPress={() => setExpressionMode('visual')}
            >
              <Palette size={20} color={expressionMode === 'visual' ? '#3B82F6' : '#6B7280'} />
              <Text style={[
                styles.modeText,
                expressionMode === 'visual' && styles.modeTextActive
              ]}>
                Visual
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputSection}>
          {renderExpressionModeContent()}
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
  doneButton: {
    backgroundColor: '#E5E7EB',
    padding: 8,
    borderRadius: 20,
  },
  doneButtonActive: {
    backgroundColor: '#3B82F6',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  moodSection: {
    paddingVertical: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  moodContainer: {
    gap: 8,
    paddingHorizontal: 4,
  },
  moodChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  selectedMoodChip: {
    backgroundColor: '#F9FAFB',
  },
  moodText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  expressionSection: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  modeButtonActive: {
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
  modeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  modeTextActive: {
    color: '#3B82F6',
  },
  inputSection: {
    flex: 1,
    paddingVertical: 20,
    minHeight: 300,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    lineHeight: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  voiceContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  recordButtonActive: {
    backgroundColor: '#FEF2F2',
  },
  recordingText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  recordingPreview: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  recordingPreviewText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
  },
  visualContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  visualPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visualPlaceholderText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  visualSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
  },
});