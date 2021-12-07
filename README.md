# SmilingAcrossLocal

SmilingAcrossLocal incentivizes travelling around Singapore with interactive features:

1) Allows user to search attraction by keyword, categorize by type and nearby MRT station
2) Google map displaying attractions’ location on google map, adding up points if logged-in user arrives at attraction
3) User can use points to redeem rewards
4) User can view Travel history, Reward redemption history

Online deployment : https://smilingacrosslocal.000webhostapp.com/ 

# Prerequisite
Guide on how to set up database for SMILEACROSSLOCALSG to use interactive features 
1) Enter phpMyAdmin 
2) Import SQL database under directory './db/CreateSQL/create.sql'
3) Ensure that phpMyAdmin username="root", password=""

# Clarifications on reward system
1) User must be approximately within 1.1km range of the attraction to claim the point(The latitude and longitude round offed to 2 decimal place must be same)
2) Once user arrives at attraction, user should click the customized icon in google map , then click "i arrived here now" button in the infoWindow to claim the point
3) By default, user has 100 point upon signing up. Each time user travels to attraction, 50 point will be added. Cheapest reward costs 200 point. 
