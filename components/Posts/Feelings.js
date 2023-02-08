import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Feelings({ selectedFeeling }) {
  return (
    <View>
      {selectedFeeling === 'is feeling happy &#128578;' ? (
        <Text style={styles.emojis}>đang cảm thấy hạnh phúc &#128578;</Text>
      ) : null}
      {selectedFeeling === 'is feeling loved &#128525;' ? (
        <Text style={styles.emojis}>đang cảm thấy đáng yêu &#128525;</Text>
      ) : null}

      {selectedFeeling === 'is feeling sad &#128532;' ? (
        <Text style={styles.emojis}>đang cảm thấy buồn &#128532;</Text>
      ) : null}

      {selectedFeeling === 'is feeling excited &#129321;' ? (
        <Text style={styles.emojis}>đang cảm thấy hứng thú &#129321;</Text>
      ) : null}

      {selectedFeeling === 'is feeling crazy &#129322;' ? (
        <Text style={styles.emojis}>đang cảm thấy điên rồ &#129322;</Text>
      ) : null}

      {selectedFeeling === 'is feeling thoughtful &#129488;' ? (
        <Text style={styles.emojis}>đang suy ngẫm &#129488;</Text>
      ) : null}

       {selectedFeeling === 'is feeling pouting face &#128545;' ? (
        <Text style={styles.emojis}>đang tức giận &#128545;</Text>
      ) : null}
       {selectedFeeling === 'is feeling spleep &#128564;' ? (
        <Text style={styles.emojis}>đang buồn ngủ &#128564;</Text>
      ) : null}
       {selectedFeeling === 'is feeling sneezing  &#128532;' ? (
        <Text style={styles.emojis}>đang bị bệnh rùi &#129319;</Text>
      ) : null}
       {selectedFeeling === 'is feeling with horns &#128520;' ? (
        <Text style={styles.emojis}>đang hắc hắc &#128520;</Text>
      ) : null}
       {selectedFeeling === 'is feeling expressionless &#128529;' ? (
        <Text style={styles.emojis}>đang cạn lời &#128529;</Text>
      ) : null}
       {selectedFeeling === 'is feeling fearful &#128552;' ? (
        <Text style={styles.emojis}>đang rén &#128552;</Text>
      ) : null}
       {selectedFeeling === 'is feeling money mouth &#129297;' ? (
        <Text style={styles.emojis}>đang ăn tiền &#129297;</Text>
      ) : null}
       {selectedFeeling === 'is feeling drooling &#129316;' ? (
        <Text style={styles.emojis}>đang thèm &#129316;</Text>
      ) : null}
       {selectedFeeling === 'is feeling 7tinh &#128557;' ? (
        <Text style={styles.emojis}>đang thất tềnh &#128557;</Text>
      ) : null}
       {selectedFeeling === 'is feeling smirking &#128527;' ? (
        <Text style={styles.emojis}>đang xừ &#128527;</Text>
      ) : null}
 
  {selectedFeeling === 'is Meaning &#127870;' ? (
        <Text style={styles.emojis}>đang ăn mừng &#127870;</Text>
      ) : null}
      {selectedFeeling === 'is CLAPPER BOARD &#127916;' ? (
        <Text style={styles.emojis}>đang xem phim &#127916;</Text>
      ) : null}
      {selectedFeeling === 'is music &#127925;' ? (
        <Text style={styles.emojis}>đang nghe nhạc &#127925;</Text>
      ) : null}
      {selectedFeeling === 'is AIRPLANE DEPARTURE &#128747;' ? (
        <Text style={styles.emojis}>đang du lịch &#128747;</Text>
      ) : null}
      {selectedFeeling === 'is nhaunhet &#127866;' ? (
        <Text style={styles.emojis}>đang nhậu nhẹt &#127866;</Text>
      ) : null}
      {selectedFeeling === 'is BIRTHDAY CAKE &#127874;' ? (
        <Text style={styles.emojis}>đang sinh nhật &#127874;</Text>
      ) : null}
      {selectedFeeling === 'is OPEN BOOK &#128214;' ? (
        <Text style={styles.emojis}>đang đọc sách &#128214;</Text>
      ) : null}
       {selectedFeeling === 'is THOUGHT BALLOON &#128173;' ? (
        <Text style={styles.emojis}>đang nghĩ về &#128173;</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({ emojis: { fontSize: 14,fontFamily:'Roboto'} });

export { Feelings };
