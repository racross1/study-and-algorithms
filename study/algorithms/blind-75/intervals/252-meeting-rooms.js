// Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.

 

// Example 1:

// Input: intervals = [[0,30],[5,10],[15,20]]
// Output: false
// Example 2:

// Input: intervals = [[7,10],[2,4]]
// Output: true
 

// Constraints:

// 0 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= starti < endi <= 106

/*
Sort arr. For loop with i starting at 1 (so you can look back). if intervals[i][0] < intervals[i-1][1]) return false. return true after loop
*/

var canAttendMeetings = function(intervals) {
    intervals = intervals.sort((a, b) => a[0] - b[0])
    
    for (let i = 1; i < intervals.length; i++){
        if (intervals[i][0] < intervals[i-1][1]) return false
    }
    
    return true
};