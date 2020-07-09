import {Navigation} from 'react-native-navigation';
export const home = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home',
              options: {
                topBar: {
                  visible: true,
                  title: {
                    text: 'Search Country',
                    fontSize: 20,
                    fontWeight: 'bold',
                  },
                },
              },
            },
          },
        ],
      },
    },
  });
};
