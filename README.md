# SelfDrivingCar
Car driven by AI. Has lots of issues 


This repository is basically a project to create a (nonrealistic) traffic simulation and an AI to navigate said traffic.

There are a few issues:
1. The AI is stored in localstorage so every new browser instance has to retrain the AI
2. The localstorage of a repository doesnt work so every iteration is random
  2.1 This isnt an issue when running the index.html via a live server in VScode, or just opening the index.html with a browser after cloning the repository
3. Due to the traffic being randomised there may be impossible situations, in such a situation all cars die which means that a random car is chosen as the best one
  3.1 This causes the next iteration to have lost basically all progress and this is a consisten issue
4. It can most likely be so much more optimised, by people way smarter than me
5. The page is reloaded for every iteration so if you have a slow internet speed there will be a lot of waiting time

