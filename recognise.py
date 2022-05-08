import sys
import joblib

handTest = sys.argv[1].split(',')
handTest = list(map(int,handTest))

model = joblib.load('hand_model_new_nv.pkl')

output=model.predict([handTest])

print(output)