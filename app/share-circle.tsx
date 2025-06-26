import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Switch } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Check, Users, Eye, EyeOff, MessageCircle, Heart } from 'lucide-react-native';

const circles = [
  { id: '1', name: 'Anxiety Before Work', color: '#F59E0B', description: 'Sunday scaries and work-related stress' },
  { id: '2', name: 'Loneliness', color: '#8B5CF6', description: 'Feeling isolated and seeking connection' },
  { id: '3', name: 'Creative Burnout', color: '#EF4444', description: 'When inspiration feels distant' },
  { id: '4', name: 'Relationship Reflections', color: '#10B981', description: 'Family, friends, and romantic relationships' },
  { id: '5', name: 'Open Space', color: '#3B82F6', description: 'For all other thoughts and feelings' },
];

export default function ShareCircleScreen() {
  const [selectedCircle, setSelectedCircle] = useState<string | null>(null);
  const [postAnonymously, setPostAnonymously] = useState(true);
  const [allowReactions, setAllowReactions] = useState(true);
  const [allowComments, setAllowComments] = useState(false);
  const [nickname, setNickname] = useState('');
  const [anonymityLevel, setAnonymityLevel] = useState<'complete' | 'consistent'>('complete');

  const handleBack = () => {
    router.back();
  };

  const handleShare = () => {
    if (selectedCircle) {
      // In a real app, implement sharing logic here
      router.push('/(tabs)/circles');
    }
  };

  const handleSkip = () => {
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Share to Circle</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.promptSection}>
          <Text style={styles.promptTitle}>Choose a Circle</Text>
          <Text style={styles.promptSubtext}>
            Select a theme that best matches your reflection
          </Text>
        </View>

        <View style={styles.circlesSection}>
          {circles.map((circle) => (
            <TouchableOpacity
              key={circle.id}
              style={[
                styles.circleCard,
                selectedCircle === circle.id && styles.circleCardSelected
              ]}
              onPress={() => setSelectedCircle(circle.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.circleColor, { backgroundColor: circle.color }]} />
              <View style={styles.circleInfo}>
                <Text style={styles.circleName}>{circle.name}</Text>
                <Text style={styles.circleDescription}>{circle.description}</Text>
              </View>
              {selectedCircle === circle.id && (
                <Check size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.settingsTitle}>Privacy Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <EyeOff size={20} color="#6B7280" />
              <Text style={styles.settingLabel}>Post anonymously</Text>
            </View>
            <Switch
              value={postAnonymously}
              onValueChange={setPostAnonymously}
              trackColor={{ false: '#F3F4F6', true: '#3B82F6' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {postAnonymously && (
            <>
              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Users size={20} color="#6B7280" />
                  <Text style={styles.settingLabel}>Anonymity Level</Text>
                </View>
                <View style={styles.anonymityOptions}>
                  <TouchableOpacity
                    style={[
                      styles.anonymityButton,
                      anonymityLevel === 'complete' && styles.anonymityButtonActive
                    ]}
                    onPress={() => setAnonymityLevel('complete')}
                  >
                    <Text style={[
                      styles.anonymityText,
                      anonymityLevel === 'complete' && styles.anonymityTextActive
                    ]}>
                      Complete
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.anonymityButton,
                      anonymityLevel === 'consistent' && styles.anonymityButtonActive
                    ]}
                    onPress={() => setAnonymityLevel('consistent')}
                  >
                    <Text style={[
                      styles.anonymityText,
                      anonymityLevel === 'consistent' && styles.anonymityTextActive
                    ]}>
                      Consistent
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {anonymityLevel === 'consistent' && (
                <View style={styles.nicknameSection}>
                  <Text style={styles.nicknameLabel}>Nickname (optional)</Text>
                  <TextInput
                    style={styles.nicknameInput}
                    placeholder="Enter a nickname..."
                    value={nickname}
                    onChangeText={setNickname}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              )}
            </>
          )}

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Heart size={20} color="#6B7280" />
              <Text style={styles.settingLabel}>Allow reactions</Text>
            </View>
            <Switch
              value={allowReactions}
              onValueChange={setAllowReactions}
              trackColor={{ false: '#F3F4F6', true: '#3B82F6' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MessageCircle size={20} color="#6B7280" />
              <Text style={styles.settingLabel}>Allow comments</Text>
            </View>
            <Switch
              value={allowComments}
              onValueChange={setAllowComments}
              trackColor={{ false: '#F3F4F6', true: '#3B82F6' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            activeOpacity={0.7}
          >
            <Text style={styles.skipText}>Skip & Save Privately</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.shareButton,
              selectedCircle && styles.shareButtonActive
            ]}
            onPress={handleShare}
            disabled={!selectedCircle}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.shareText,
              selectedCircle && styles.shareTextActive
            ]}>
              Share Now
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
    paddingVertical: 24,
    alignItems: 'center',
  },
  promptTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  promptSubtext: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  circlesSection: {
    marginBottom: 32,
  },
  circleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
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
  circleCardSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#F8FAFC',
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
  circleDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 18,
  },
  settingsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    marginLeft: 12,
  },
  anonymityOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  anonymityButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  anonymityButtonActive: {
    backgroundColor: '#3B82F6',
  },
  anonymityText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  anonymityTextActive: {
    color: '#FFFFFF',
  },
  nicknameSection: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  nicknameLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
    marginBottom: 8,
  },
  nicknameInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionsSection: {
    paddingVertical: 24,
    gap: 16,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  skipText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  shareButton: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
  },
  shareButtonActive: {
    backgroundColor: '#3B82F6',
  },
  shareText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  shareTextActive: {
    color: '#FFFFFF',
  },
});