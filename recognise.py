import sys
import joblib

handTest = sys.argv[1].split(',')
handTest = list(map(int,handTest))

model = joblib.load('hand_model_k5_2.pkl')

output=model.predict([handTest])

print(output)