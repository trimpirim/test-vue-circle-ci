export function deleteEventFromCalendar(events , deleted_event) {
    for(var i=0;i<events.length;i++) {
        var e = events[i];
        if(e.event_id == deleted_event["_id"]) {
            events.splice(i,1);
            return;
        }
    }
}

export function cancelEventFromCalendar(events , id , start , end) {        
    for(var i=0;i<events.length;i++) {
        var e = events[i];
        if(e.event_id == id) {
            e.start = start;
            e.end = end;
            return;
        }
    }
}

export function isEventOverlap(events,start,end) {
    for(var i=0;i<events.length;i++) {
        var e = events[i];
        if(e.hasOwnProperty("rendering") && e["rendering"]=="background") {
            if((e.start<=start) && (end<=e.end)) {
                return true;
            }
        }
    }
    return false;
}