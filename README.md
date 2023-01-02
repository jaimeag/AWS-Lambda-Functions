`twillio` - delivers a JWT token that allows the user to connect to
a Programmable Video instance

`transcribe` - grabs the s3 audio link in order to call an AWS Transcribe
instance, returning a transcribed version of an audio file. 

`transcribeParse` - without needless listening, an event is triggered by s3 when a json file is successfully uploaded to the transcription bucket. When this event is triggered, this function parses through the transcribed conversation and uploads it to our DynamoDB instance and stores it as a message to be viewed client-side. Because of the fact that Lambda functions are only charged when running, the event driven focus on this particular function allows for resources to be saved as the event listeners don't cost any money to implement. 

`s3Link` - used to generate a temporary upload link for the audio transcription for security measures. 

Note
----
These aren't the only functions that I wrote at my time at HearRo as a lot of the functions were first created within the environment. These are the ones that I built from scratch and generic enough to showcase a few of the use cases where serverless can enchance an application.
