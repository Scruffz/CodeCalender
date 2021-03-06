const Event = require("../models/Event.js");

const assert = require("assert");

describe("An event", function(){


	let event;

	beforeEach(()=>{
		event = new Event({
			title: "Dog walking, advanced class",
			date: "2017-02-20 16:30:00",
			imgUrl: "https://static1.squarespace.com/static/55439320e4b0f92b5d6c4c8b/554393f7e4b09befa5d9963f/575ec48b86db43d4838443f4/1485868556423/YOGA.jpg?format=300w",
			description: [
				"Dogs will walk you for 1 hour whilst you bring them tennis balls",
				"Come join the whimsical sniffs and smells of Princes Gardens while our dogs idly slump by playing Pokemon Go.",
				"Ball rental £5 deposit"],
			hosts: ["Rover","Fido"]
		})
	})

	it("Should have a title", ()=>{
		assert.equal(event.title, "Dog walking, advanced class");
	});

	it("Should have a description as array of paragraphs", ()=>{

		assert.equal(event.description[0], "Dogs will walk you for 1 hour whilst you bring them tennis balls");
		assert.equal(event.description[2], "Ball rental £5 deposit");

	});

	it("Should have hosts as array of names", ()=>{

		assert.equal(event.hosts.length, 2)
		assert.equal(event.hosts[0], "Rover")

	});

	it("Should have a date", ()=>{
		assert.equal( event.date.getDay(), 1 )
	})

	it("Could contain a URL for image", ()=>{
		assert.equal(event.imgUrl, "https://static1.squarespace.com/static/55439320e4b0f92b5d6c4c8b/554393f7e4b09befa5d9963f/575ec48b86db43d4838443f4/1485868556423/YOGA.jpg?format=300w")
	})


})

describe("Event prototype", ()=>{
	
	let jsonObject = [{
			"title": "Dog walking, advanced class",
			"date": "2017-02-20 16:30:00",
			"description": [
				"Dogs will walk you for 1 hour whilst you bring them tennis balls",
				"Come join the whimsical sniffs and smells of Princes Gardens while our dogs idly slump by playing Pokemon Go.",
				"Ball rental £5 deposit"],
			"hosts": ["Rover","Fido"]
		}];



	it("Should parse JSON to protoypes", ()=>{

		let events = Event.parseEvents(jsonObject);
		assert.equal(Object.getPrototypeOf(events[0]), Event.prototype)
	})

	it("should return relative day",()=>{
		let now = new Date()
		let todayEvent = new Event(jsonObject[0]);
		todayEvent.date = new Date();
		let tomorrowEvent = new Event(jsonObject[0]);
		tomorrowEvent.date = new Date(todayEvent.date.getTime() + 86400000)

		assert.equal(todayEvent.getRelativeDay(now), "Today")
		assert.equal(tomorrowEvent.getRelativeDay(now), "Tomorrow")
	})

	it("should generate 12 hour time string",()=>{
		let midnight = new Event({title: "", description: [""], 
			date: "2017-02-20 00:00:00"
		})
		let threePM = new Event({title: "", description: [""], 
			date: "2017-02-20 15:00:00"
		})


		assert.equal( midnight.getSimpleTimeString(), "12:00 am" )
		assert.equal( threePM.getSimpleTimeString(), "3:00 pm")
	})

})