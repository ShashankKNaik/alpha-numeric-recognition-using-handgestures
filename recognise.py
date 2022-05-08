import sys
import joblib
# from sklearn import neighbors
# import pandas as pd

# dataset = pd.read_csv('newData.csv')
# x = dataset[['0','2', '3', '4', '6', '7', '8', '10', '11', '12', '14', '15', '16', '18', '19', '20']].values
# y = dataset['letter'].values

# model=neighbors.KNeighborsClassifier().fit(x,y)

handTest = sys.argv[1].split(',')
handTest = list(map(int,handTest))

model = joblib.load('hand_model_new_nv.pkl')


output=model.predict([handTest])


print(output)