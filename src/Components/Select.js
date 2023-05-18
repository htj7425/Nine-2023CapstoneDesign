import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";

const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

function Select({ navigation, visibleState }) {
  const [visible, setVisible] = React.useState(visibleState);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ModalPoup visible={visible}>
        <View style={styles.textContainer}>
          <TouchableOpacity
            style={{
              ...styles.textContainer_detail,
              width: "100%",
              borderBottomWidth: 0.5,
              borderColor: "lightgrey",
            }}
          >
            <Text style={styles.modal_Text}>카메라</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.textContainer_detail,
              width: "100%",
              borderBottomWidth: 0.5,
              borderColor: "lightgrey",
            }}
          >
            <Text style={styles.modal_Text}>앨범</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textContainer_detail}>
            <Text style={styles.modal_Text}>텍스트</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.textContainer}>
          <TouchableOpacity
            style={styles.cancel}
            onPress={() => setVisible(false)}
          >
            <View>
              <Text
                style={{
                  ...styles.modal_Text,
                  fontWeight: "bold",
                }}
              >
                취소
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ModalPoup>
      <Button title="Open Modal" onPress={() => setVisible(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textContainer: {
    borderRadius: 12,
    elevation: 20,
    marginBottom: 12,
    backgroundColor: "white",
  },
  textContainer_detail: {
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    width: "80%",
    borderRadius: 20,
    elevation: 20,
    marginBottom: 40,
  },
  cancel: {
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modal_Text: {
    fontSize: 22,
    fontWeight: "500",
    color: "#445CE9",
  },
});

export default Select;
