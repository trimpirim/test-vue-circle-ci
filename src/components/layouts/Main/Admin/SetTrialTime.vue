<template>
    <div>
        <h2>Set Trial Time</h2>
        <div class="row tutorlist">
            <label class="col-sm-1">Tutor:</label>
            <select v-if="currentTutor" class="col-sm-2" type="text" v-model="currentTutor">
                <option v-for="item in tutorList" v-bind:value="item">{{item.name}}</option>
            </select>
        </div>
        <calendar :events="events" :calendarType="calendarType" editable="true" selectable="true" @date-changes="catchDateChange" @event-render="eventRender"
            @event-selected="eventSelected" @event-created="eventCreated" @event-resize="eventResized" @event-drop="eventDroped"></calendar>
        <div id="setTrialModal" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">{{dialog_title}}</h4> 
                    </div>
                    <div class="modal-body available_content">
                        <div class="row">
                            <label class="col-sm-2">Tutor:</label>
                            <label class="col-sm-8">{{currentTutor.name}}</label>
                        </div>
                        <div class="row">
                            <label class="col-sm-2">Time:</label>
                            <label class="col-sm-8">{{getSelectedEventTime()}}</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" v-if="event_action_type=='create'" @click="saveCreatedTrial()" class="btn btn-default">Set Trial Time</button>
                        <button type="button" v-if="event_action_type=='delete'" @click="deleteTrial()" class="btn btn-default">Delete</button>
                        <button type="button" v-if="event_action_type=='update'" @click="updateTrial()" class="btn btn-default">Update </button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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
import { deleteEventFromCalendar , cancelEventFromCalendar, isEventOverlap } from '../../../../utility/calendarUtility.js'

Vue.component('calendar', calendar);

export default {
    name:"setavailabletrial",
    beforeCreate() {
      
    },
    created() {
       
    },
    mounted() {
        if(this.$el) {
            this.getTutorList();
        }
    },
    components() {
        calendar
    },
    methods: {
        addCreatedTrial:function(payload) {
            var event = {};
            event.title = "";
            event.start = payload.startTime;
            event.end = payload.endTime;
            event.event_id = payload._id;
            event.color = '#03a9f4';
            event.constraint = "availableForTrial";
            this.events.push(event);
        },
        catchDateChange:function() {

        },
        getTutorList() {
            this.$store.dispatch("getTutorList").then(data=>{
                var list = data.data;
                console.log(list);
                if(Array.isArray(list)) {
                    if(list.length>0) {
                        this.tutorList = list;
                        this.currentTutor = this.tutorList[0];
                    }
                }
            }).catch(() => {

            });
        },
        getAvailableTimeByTutor(payload) {
            this.$store.dispatch("getAvailableTime",payload).then(data=>{
                console.log(data.data);
                this.initEvents(data.data,"available");
            }).catch(()=>{

            });
        },
        getTrialTimeByTutor(payload) {
            this.$store.dispatch("getTrialTime",payload).then(data=>{
                this.initEvents(data.data,"trial");
            }).catch(()=>{

            });
        },
        getSelectedEventTime:function() {
            if(this.start_time && this.end_time) {
                var start_datestring = this.start_time.format("YYYY-MM-DD hh:mm");
                var end_datesting = this.end_time.format("YYYY-MM-DD hh:mm");
                return start_datestring + "-" + end_datesting;
            }
            return "";
        },
        setColorByType(event) {
            switch(event.type) {
                case "schedule":
                    event.color = "#1de669";
                    break;
                case "trial":
                    event.color = "#00bcd4";
                    break;
                default:
                    break;
            }
        },
        setConstraintId(event) {
            switch(event.type) {
                case "schedule":
                    event.id = "availableForSchedule";
                    break;
                case "trial":
                    event.id = "availableForTrial";
                    break;
                case "normal":
                    event.id = "availableForNormal";
                    break;
            }
            return event;
        },
        initEvents: function (event_array , type) {
            for(var i=0;i<event_array.length;i++) {
                var item  = event_array[i];
                var event = {};
                event.start = item.startTime;
                event.end = item.endTime;
                if(type=="available") {
                    event["rendering"] = "background";
                    this.setConstraintId(event);
                }else {
                    event.constraint = "availableForTrial";
                    event.color = "#03a9f4";
                    event.event_id = item._id;
                }
                this.setColorByType(event);
                this.events.push(event);
            }
        },
        processEventChange:function(event) {
            this.selected_event = event;
            this.start_time = moment(event.start);
            this.end_time = moment(event.end);
            if(this.selected_event.hasOwnProperty("type")) {
                this.type = this.selected_event["type"];
            }
            $("#setTrialModal").modal("show");
        },
        saveCreatedTrial: function() {
            if(this.currentTutor) {
                var payload = {};
                payload.tutor_id = this.currentTutor._id;
                payload.start = this.start_time.valueOf();
                payload.end = this.end_time.valueOf();
                this.$store.dispatch("setTrialTime",payload).then(data=>{
                    this.addCreatedTrial(data);
                    $("#setTrialModal").modal("hide");
                }).catch(()=>{
                    $("#setTrialModal").modal("hide");
                });
            }
        },
        deleteTrial: function() {
            if(this.currentTutor) {
                var event_id = this.selected_event.event_id;
                this.$store.dispatch("deleteTrialTime",event_id).then(data=>{
                    deleteEventFromCalendar(this.events,data.data);
                    $("#setTrialModal").modal("hide");
                }).catch(()=>{
                    $("#setTrialModal").modal("hide");
                });
            }
        },
        updateTrial: function() {
            if(this.currentTutor) {
                var payload = {};
                payload.eventData = {};
                payload.id = this.selected_event.event_id;
                payload.eventData["tutor_id"] = this.currentTutor._id;
                payload.eventData["start"] = moment(this.selected_event.start).valueOf();
                payload.eventData["end"] = moment(this.selected_event.end).valueOf();
                var id = this.selected_event.id;
                var tutor_id = this.currentTutor._id;
                this.$store.dispatch("updateTrialTime",payload).then(data=>{
                    $("#setTrialModal").modal("hide");
                }).catch(()=>{
                    $("#setTrialModal").modal("hide");
                });
            }
        },
        eventCreated:function(...eventdate) {
            let start = eventdate[0].start;
            let end  = eventdate[0].end;
            this.event_action_type = "create";
            this.dialog_title = "Set Trial Time";
            this.start_time = moment(start);
            this.end_time = moment(end);
            var isOverlapped = isEventOverlap(this.events,this.start_time.valueOf(),this.end_time.valueOf());
            if(isOverlapped) {
                $('#setTrialModal').modal("show");
            }else {
                alert("please locate trial time on avilable area!")
            }
            
        },
        eventRender: function(...args) {

        },
        eventSelected:function(event) {
            this.event_action_type = "delete";
            this.dialog_title = "Delete Trial Time";
            this.processEventChange(event);
        },
        eventResized:function(...args) {
            this.event_action_type = "update";
            this.dialog_title = "Update Trial Time";
            this.processEventChange(args[0]);
        },
        eventDroped:function(...args) {
            this.event_action_type = "update";
            this.dialog_title = "Update Trial Time";
            this.processEventChange(args[0]);
        }
    },
    watch: {
        'currentTutor':function() {
            this.events=[];
            var payload = {};
            payload.current_month = moment().format("YYYY-MM").toString();
            payload.tutor_id = this.currentTutor._id;
            this.getAvailableTimeByTutor(payload);
            this.getTrialTimeByTutor(payload);
        }
    },
    data() {
        return {
            events: [
            ],
            start_time:null,
            end_time:null,
            event_action_type:"create",
            selected_event: null,
            tutorList: [],
            scheduletypes: ["trial","normal","scheduling"],
            currentTutor: null,
            calendarType: "admin",
            dialog_title: ""
        }
  }
}
</script>

<style>
    .tutorlist select {
        height: 30px;
    }
    
    .tutorlist {
        margin-top: 15px;
        margin-bottom: 15px;
    }
</style>