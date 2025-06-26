import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { LogIn, Shield, Heart, BookOpen } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function IntroScreen() {
  const handleGoogleSignIn = () => {
    // In a real app, implement Google Sign-In here
    // For demo purposes, navigate directly to mood check-in
    router.push('/mood-checkin');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.logoContainer}>
              <View style={styles.logoBackground}>
                <BookOpen size={48} color="#FFFFFF" strokeWidth={1.5} />
              </View>
            </View>
            
            <Text style={styles.appName}>Invisible Journal</Text>
            <Text style={styles.tagline}>
              A safe space for emotional reflection and creative expression
            </Text>
          </View>

          {/* Feature Illustration */}
          <View style={styles.illustrationSection}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={styles.heroImage}
            />
            
            <View style={styles.featureGrid}>
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Heart size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.featureText}>Express freely</Text>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Shield size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.featureText}>Stay anonymous</Text>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <BookOpen size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.featureText}>Reflect deeply</Text>
              </View>
            </View>
          </View>

          {/* Sign In Section */}
          <View style={styles.signInSection}>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleGoogleSignIn}
              activeOpacity={0.9}
            >
              <LogIn size={20} color="#1F2937" />
              <Text style={styles.signInButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
            
            <Text style={styles.privacyText}>
              Your privacy is our priority. All entries are encrypted and secure.
            </Text>
            
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By continuing, you agree to our{' '}
                <Text style={styles.termsLink}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: height * 0.08,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  appName: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: width * 0.8,
  },
  illustrationSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  heroImage: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  featureGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 300,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  signInSection: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 20,
    gap: 12,
    minWidth: width * 0.7,
    justifyContent: 'center',
  },
  signInButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  privacyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
    maxWidth: width * 0.8,
  },
  termsContainer: {
    paddingHorizontal: 16,
  },
  termsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    textDecorationLine: 'underline',
    fontFamily: 'Inter-Medium',
  },
});