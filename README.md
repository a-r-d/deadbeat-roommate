# Deadbeat-Roommate

How to annoy your deadbeat roommate who hasn't paid the rent. Programatically SMS message your roommate at all hours of the day until you get paid. 


### Usage:

```
	node ./app.js --config='./config-example.js' --message='Pay the rent bro!'  --target='xxxxxxxxxxx' --type='sms'
```

I provided some examples of how to do this but essentially you will set your Plivo account up, create a config file, and run the app like in the example above. I even added a crob job example to show you how to be extra annoying.



### SMS integration

I'm using plivo because it is cheaper than twilio.


### Voice integration

So with the Plivo voice api you can create the call from the application, but the Plivo application will hit some URL when the call is picked up. Plivo expects you to have some kind of XML at this endpoint. The XML is pretty simple, but you have to supply the answer_url when you place the call. Anyway, it should look something like this:

```
<Response>
    <Speak language="en-GB" loop="3" voice="WOMAN">
       Pay your rent, sucker!
    </Speak>
</Response>
```

