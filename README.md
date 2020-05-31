# BusTicketing
Simple NodeJS server to handle ticketing for Bus Company

# Task
1. Change ticket status from true/false to Open/Close
2. Make changes in API and Test files accordingly

# EndPoints For Required API
1. [ PATCH ] Update the ticket status (open/close + adding user details) - '/tickets/:ticketId/update' 
JSON FORMAT - [
              {"propName":"name","value":"updatedname"},
              {"propName":"src","value":"newsource"}.
              ...
              ]
2. [ GET ] View Ticket Status -  '/tickets/:ticketId/status'
3. [ GET ] View all closed tickets - '/tickets/close'
4. [ GET ] View all open tickets - '/tickets/open'
5. [ GET ] View Details of person owning the ticket - '/tickets/:ticketId/details'
6. [ PATCH ] Additional API for admin to reset the server (opens up all the tickets) - '/admin'

# Additional API For Development and Testing Purpose
1. [ DELETE ] Delete a ticket - '/id/:ticketId'
2. [ DELETE ] Delete all ticket with status true/close - '/true'
3. [ DELETE ] Delete all ticket with status false/open - '/false'
4. [ POST ] Insert a ticket to DB - '/tickets/book'
JSON FORMAT - {
               "name" : "anyname",
               "src"  : "anysrc",
               "des"  :  "anydes",
               "status":"true/false"
               }
 5. [ GET ] View a ticket by Id - '/tickets/:ticketId'

# Command to start server - npm start
# Run Test Files - npm run test
# Database Used - MongoDB(MongoDB Atlas)
# Testing Libraries - Mocha, chai, Supertest
# Public DNS for EC2 - ec2-18-191-155-75.us-east-2.compute.amazonaws.com
