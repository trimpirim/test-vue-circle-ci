<template>
    <div>
        <h2>Set Availability</h2>
        <ul class="nav nav-tabs availability-tabs">
            <li class="active"><a data-toggle="tab" href="#menu1">Specific Days</a></li>
            <li><a data-toggle="tab" href="#menu2">Regular</a></li>
        </ul>

        <div class="tab-content">
            <div id="menu1" class="tab-pane fade in active">
                <div>
                    <calendar :events="events" editable="true" selectable="true" :calendarType="calendarType" :eventOverlap="false" @date-changes="catchDateChange" @event-render="eventRender"
                        @event-selected="eventSelected" @event-created="eventCreated" @event-resize="eventResized" @event-drop="eventDroped" @event-dragstart="eventDragStarted" @event-resizestart="eventResizeStarted"></calendar>
                </div>
            </div>
            <div id="menu2" class="tab-pane fade">
                <h3>Regular Weekly Hours</h3>
                <p>Use this schedule if you have similar hours week-to-week. Enter window(s) of time (9:00am-12:00pm, 1:00pm-5:00pm).
                </p>
            </div>
        </div>
        <div id="scheduleModal" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">{{this.dialog_title}}</h4>
                    </div>
                    <div class="modal-body available_content">
                        <div class="row">
                            <label class="col-sm-2">Time:</label>
                            <label class="col-sm-8">{{getSelectedEventTime()}}</label>
                        </div>
                        <div class="row">
                            <label class="col-sm-2">Type:</label>
                            <select v-disabled="event_action_type=='delete'" class="col-sm-4" type="text" v-model="type">
                                <option v-for="item in scheduletypes" v-bind:value="item">{{item}}</option>
                            </select>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" v-if="event_action_type=='create'" @click="saveCreatedEvent()" class="btn btn-default">Set Available Time</button>
                        <button type="button" v-if="event_action_type=='delete'" @click="deleteEvent()" class="btn btn-default">Delete</button>
                        <button type="button" v-if="event_action_type=='update'" @click="updateEvent()" class="btn btn-default">Update Time</button>
                        <button type="button" class="btn btn-default" @click="cancelEvent()">Close</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

import Vue from 'vue';
import moment from 'moment';
import calendar from '../../../custom/SchedulingCalendar.vue';
import Storage from '../../../../services/Storage'
import { deleteEventFromCalendar , cancelEventFromCalendar } from '../../../../utility/calendarUtility.js'

Vue.component('calendar', calendar);

export default {
    name:"availabletime",
    beforeCreate() {
      
    },
    created() {
       
    },
    mounted() {
        this.$nextTick(function() {
            var payload = {};
            payload.current_month = moment().format("YYYY-MM").toString();
            this.getEvents(payload);
        });
    },
    components() {
        calendar
    },
    methods: {
        addCreatedEvent:function(payload) {
            var event = {};
            event.title = "";
            event.start = payload[0].startTime;
            event.end = payload[0].endTime;
            event.available_type = payload[0].type;
            event.event_id = payload[0]._id;
            //set color when type is not normal  (when type is normal , set default color)
            this.setColorByType(event);
            this.events.push(event);
        },
        getEvents(payload) {
            this.$store.dispatch("getAvailableTime",payload).then(data=>{
                var event_array = data.data;
                if(event_array) {
                    this.initEvents(event_array);
                }
            }).catch(() => {

            });
        },
        setColorByType(event) {
            switch(event.available_type) {
                case "schedule":
                    event.color = "#1de669";
                    break;
                case "trial":
                    event.color = "#00bcd4";
                    break;
                default:
                    break;
            }
            return event;
        },
        initEvents(event_array) {
            for(var i=0;i<event_array.length;i++) {
                var item  = event_array[i];
                var event = {};
                event.start = item.startTime;
                event.end = item.endTime;
                event.available_type = item.type;
                event.event_id = item._id;
                this.setColorByType(event);
                this.events.push(event);
            }
        },
        eventCreated:function(...eventdate) {
            let start = eventdate[0].start;
            let end  = eventdate[0].end;
            this.start_time = moment(start);
            this.end_time = moment(end);
            
            this.event_action_type = "create";
            this.dialog_title = "Set Available Time";
            $("#scheduleModal").modal("show");
        },
        eventSelected:function(event) {
            this.event_action_type = "delete";
            this.dialog_title = "Delete Time";
            this.processEventChange(event);
        },
        eventResized:function(...args) {
            var event = args[0];
            this.event_action_type = "update";
            this.dialog_title = "Update Time";
            this.processEventChange(event);
        },
        eventDroped:function(...args) {
            var event = args[0];
            this.event_action_type = "update";
            this.dialog_title = "Update Time";
            this.processEventChange(event);
        },
        eventDragStarted:function(...args) {
            let event = args[0];
            this.prevstart_time = moment(event.start);
            this.prevend_time = moment(event.end);
        },
        eventResizeStarted:function(...args) {
            let event = args[0];
            this.prevstart_time = moment(event.start);
            this.prevend_time = moment(event.end);
        },
        processEventChange:function(event) {       
            this.selected_event = event;
            this.start_time = moment(event.start);
            this.end_time = moment(event.end);
            if(this.selected_event.hasOwnProperty("type")) {
                this.type = this.selected_event["type"];
            }
            $("#scheduleModal").modal("show");
        },
        eventRender:function(...event) {
        },
        getSelectedEventTime:function() {
            if(this.start_time && this.end_time) {
                var start_datestring = this.start_time.format("YYYY-MM-DD hh:mm");
                var end_datesting = this.end_time.format("YYYY-MM-DD hh:mm");
                return start_datestring + "-" + end_datesting;
            }
            return "";
        },
        catchDateChange: function(...event) {
            var m = event[0];
        },
        saveCreatedEvent:function() {
            if(this.start_time && this.end_time) {
                var payload = {};
                payload.regular = false;
                payload.times = [];
                payload.times[0] = {};
                payload.times[0].start = this.start_time.valueOf();
                payload.times[0].end = this.end_time.valueOf();
                payload.times[0].type = this.type;

                this.$store.dispatch("setAvailableTime",payload).then(data=>{
                    this.addCreatedEvent(data);
                    $("#scheduleModal").modal("hide");
                }).catch(() => {
                    $("#scheduleModal").modal("hide");
                });
            }
        },
        deleteEvent: function() {
            if(this.selected_event) {
                var id = this.selected_event.event_id;
                this.$store.dispatch("deleteAvailableTime",id).then(data=>{
                    deleteEventFromCalendar(this.events,data.data);
                    $("#scheduleModal").modal("hide");
                }).catch(()=>{
                    $("#scheduleModal").modal("hide");
                });
            }else {
                $("#scheduleModal").modal("hide");
            }
        },
        updateEvent: function() {
            if(this.selected_event) {
                var payload = {};
                payload.eventData = {};
                payload.id = this.selected_event.event_id;
                payload.eventData["start"] = moment(this.selected_event.start).valueOf();
                payload.eventData["end"] = moment(this.selected_event.end).valueOf();
                payload.eventData["type"] = this.type;
                var id = this.selected_event.id;
                this.$store.dispatch("updateAvailableTime",payload).then(data=>{
                    $("#scheduleModal").modal("hide");
                }).catch(()=>{
                    $("#scheduleModal").modal("hide");
                });
            }else {
                $("#scheduleModal").modal("hide");
            }
        },
        cancelEvent: function() {
            if(this.event_action_type == "update") {
                if(this.prevstart_time && this.prevend_time) {
                    this.start_time = this.prevstart_time;
                    this.end_time = this.prevend_time;
                    let id = this.selected_event.event_id;
                    let prevStartTimeStamp = moment(this.prevstart_time).valueOf();
                    let prevEndTimeStamp = moment(this.prevend_time).valueOf();
                    cancelEventFromCalendar(this.events,id,prevStartTimeStamp,prevEndTimeStamp);
                }
            }
            $('#scheduleModal').modal("hide");
        }
    },
    data() {
        return {
            events: [],
            type: "trial",
            prevstart_time:null,
            prevend_time:null,
            start_time:null,
            end_time:null,
            event_action_type:"create",
            dialog_title:"Set Available Time",
            selected_event: null,
            scheduletypes: ["trial","normal","scheduling"],
            calendarType:"tutor"
        }
  }
}
</script>

<style>
    .availability-tabs {
        margin-top: 20px;
        margin-bottom: 30px;
    }
    
    .available_content {
        padding-left: 25px;
        font-size: 15px;
    }
    
    .available_content select {
        height: 30px;
    }
    
    .available_content .row {
        margin-bottom: 5px;
    }
</style>