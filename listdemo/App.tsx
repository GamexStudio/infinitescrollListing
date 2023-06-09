import React, { useEffect, useState } from 'react';
import { Text,View,SafeAreaView,Image, StyleSheet,FlatList, ActivityIndicator, } from 'react-native';
import { network } from './Network/Network';
import { colors } from './config/colors';



const App = () => {
  
  const [arrMovie, setarrMovie] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getMovieListing = async () => {
    setIsLoading(true);
      const res = await network.getMovieList(currentPage);
      setIsLoading(false);
      if (res.networkError) {
        console.log('something went wrong');
    } else {
      if (res.data.Search){
          const movies = res.data.Search
        setarrMovie([...arrMovie, ...movies]);
      }
    }
      
  };

  const renderItem = ({ item ,index}:any) => {
    return (
      <View style={styles.itemWrapperStyle}>
      <Image style={styles.itemImageStyle} source={{ uri: item.Poster }} />
      <View style={styles.contentWrapperStyle}>
        <Text style={styles.txtTitle}>{`${item.Title}`}</Text>
        <Text style={styles.txtYear}>{item.Year}</Text>
      </View>
    </View>
    );
  };

  const renderLoader = () => {
    return (
      isLoading ?
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#aaa" />
        </View> : null
    );
  };
  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getMovieListing();
  }, [currentPage]);


  return (
    <>
      <SafeAreaView style={styles.container}>
      <FlatList
        data={arrMovie}
        renderItem={renderItem}
        keyExtractor={item => item.imdbID}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex:1},
  itemWrapperStyle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,    
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {    
    marginHorizontal:10,
    flex:1
  },
  txtTitle:{
    color: colors.white,
    fontSize:15,
    marginHorizontal:10,
    flexWrap: 'wrap',    
    flexShrink:1,
    marginVertical:5,
  },
  txtYear: {
    color: colors.red,
    marginHorizontal:10,
    flexWrap: 'wrap',
    flex:1,
    flexShrink:1
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});
