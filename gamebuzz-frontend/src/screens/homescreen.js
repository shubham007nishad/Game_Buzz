import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

const HomeScreen = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the news from the Django API
    api.get('news/')
      .then((response) => {
        setNews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching news: ', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.logo}>Game_buzz</Text>
      </View>

      {/* Featured Matches Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Matches</Text>
        <View style={styles.matchCard}>
          <Text style={styles.matchText}>RSA 191 & 77-2</Text>
          <Text style={styles.matchText}>SL 42</Text>
          <Text style={styles.matchText}>
            Day 2: South Africa leads by 226 runs
          </Text>
        </View>
      </View>

      {/* Trending Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending</Text>
        <FlatList
          horizontal
          data={news}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.trendingCard}>
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.thumbnail}
              />
              <Text style={styles.videoTitle}>{item.title}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 15,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  matchCard: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
  },
  matchText: {
    fontSize: 16,
    color: '#fff',
  },
  trendingCard: {
    backgroundColor: '#444',
    marginRight: 10,
    padding: 10,
    borderRadius: 8,
    width: 150,
    alignItems: 'center',
  },
  thumbnail: {
    width: 130,
    height: 80,
    borderRadius: 5,
  },
  videoTitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default HomeScreen;
