# Deadbeat-Roommate

A fun way to annoy your deadbeat roommate who hasn't paid the rent. Programatically SMS or voice message your roommate at all hours of the day until you get paid. 


### Usage:

```
	node ./app.js --config='./config-example.js' --message='Pay the rent bro!'  --target='xxxxxxxxxxx' --type='sms'
```

I provided some examples of how to do this but essentially you will set your Plivo account up, create a config file, and run the app like in the example above. I even added a crob job example to show you how to be extra annoying.



### SMS integration

I'm using plivo because it is cheaper than twilio. SMS is pretty simple, you supply the 'target' phone number in the command line argument as well as the message and it will send immediately. 


### Voice integration

So with the Plivo voice api you can create the call from the application, but the Plivo API will then hit some URL when the call is picked up, so you must supply this URL when you create the call. Plivo expects you to have some XML at this endpoint that you have specified. The XML is pretty simple, and the parameter where you set the endpoint is "answer_url" in the config file. You can just put your XML file up on S3 or even link it to this repository, it doesn't really matter.


```
<Response>
    <Speak language="en-GB" loop="3" voice="WOMAN">
       Pay your rent, wanker!
    </Speak>
</Response>
```

