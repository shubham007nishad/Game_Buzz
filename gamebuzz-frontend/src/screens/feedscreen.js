import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, StatusBar } from 'react-native';

const newsData = [
  {
    id: '1',
    title: 'Red Bull Home Ground #5: Format, Schedule, Teams and More',
    category: 'Valorant',
    description: 'One of the biggest and most popular off-season events...',
    time: '9h',
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
  {
    id: '2',
    title: 'Valorant Patch 9.10 Agent Changes and Their Impact on the Meta',
    category: 'Valorant',
    description: 'The Patch 9.10 Agent changes aim to mix up the meta...',
    time: 'Yesterday',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    title: 'Valorant Introduces New Upcoming Bundle',
    category: 'Valorant',
    description: 'Valorant’s new bundle brings exciting skins...',
    time: '2 days ago',
    image: 'https://via.placeholder.com/150',
  },
];

export default function FeedScreen() {
  const renderNewsItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Latest News</Text>
      <FlatList
        data={newsData}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background for modern look
    paddingHorizontal: 16,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 56,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#121212', // Dark grey card background
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flex: 1,
    padding: 8,
  },
  category: {
    color: '#FF4081', // Accent color
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: '#aaa',
    fontSize: 14,
    marginVertical: 4,
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
});
