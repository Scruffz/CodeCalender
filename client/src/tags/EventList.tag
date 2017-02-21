<EventList>
	<h2>What's on</h2>
	<div each={array, day in this.eventDays}>

		<div class="day-header">{day}</div>

		<div each={event, i in array} class={event-list-item: true, event-list-focus: this.focusEvent === event}>
			<div class="event-list-title">{event.title} </div>
			<div class="event-list-time">{event.getSimpleTimeString()}<div>
		</div>

	</div>


	<style>
		.event-list-item{
			display:flex;
			flex-flow:row nowrap;
			justify-content: space-between;
			min-height:10vh;
			padding: 0% 2%;
		}
		.day-header{
			font-size:1em;
			font-weight: bold;
			padding: 2% 0% 2% 5%;
			border-bottom:2px solid white;
		}
		.event-list-title{
			font-size:1.5em;
			align-self: center;

		}
		.event-list-time{
			align-self: center;
			font-size: 1.5em;
			flex-shrink: 0;

		}

		.event-list-focus{
			background: rgba(133,212,255, 0.8);
		}
	</style>



	<script>
		this.eventDays = {}
		this.focusEvent = this.opts.events[this.opts.focusEvent];

		
		this.on('update', ()=>{
			this.focusEvent = this.opts.events[this.opts.focusEvent];

		})

		//splits the events into object {day: [events]}
		this.opts.events.forEach((event)=>{
			let eventKey = event.getRelativeDay();
			this.eventDays[eventKey] ? this.eventDays[eventKey].push(event) : this.eventDays[eventKey] = [event]
		})

	

	</script>
</EventList>