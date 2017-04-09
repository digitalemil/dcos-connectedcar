export CASSANDRA_SERVICE=10.0.1.3:9042
export KAFKA_SERVICE="10.0.1.3:2181"
export LISTENER="http://localhost:3030/data"
export MODELEVALUATOR="http://localhost:8080"
export MESOS_SANDBOX=.
export APPDEF="{'name':'Connected Car Platform','showLocation':true,'fields':[{'name':'speed','pivot':true,'type':'Double'},{'name':'driver','pivot':false,'type':'String'},{'name':'altitude','type':'Double','pivot':'false'},{'name':'heading','type':'Double','pivot':'false'},{'name':'motortemp','type':'Double','pivot':'false'},{'name':'batterylevel','type':'Double','pivot':'false'}, {'name':'status','type':'String','pivot':'false'}, {'name':'powerconsumption','type':'Double','pivot':'false'}, {'name':'carid','pivot':false,'type':'String'},{'name':'color','pivot':false,'type':'String'},{'name':'id','type':'Long','pivot':'false'},{'name':'location','type':'Location','pivot':'false'},{'name':'event_timestamp','type':'Date/time','pivot':'false'}],'transformer':'%0A%09result%3D%20rawtext%3B%0A%09%09%09%09%09%0A%09%09%09%09%09','topic':'cardata','table':'cardata','keyspace':'connectedcar','path':'CCP','creator':'http://localhost:3000'}"
nodemon npm start


