var Log = require("log");
var log = new Log(process.env.loglevel || "error");

var Moment = require("moment");
var Handlebars = require("handlebars");
require("../handlebars.moment").registerHelpers(Handlebars);

function template(tmpl, data) {
    var urtemplate = Handlebars.compile(tmpl);
    var output = urtemplate(data || {});
    log.info(output);
    return output;
}


var now = new Date();
var year = now.getFullYear();

describe("Moment helper - dates", function() {

    // 1300000000000 -> 2011-03-13T07:06:40+00:00
    it("should handle full dates", function () {
        expect(template('{{moment "1300000000000" utc=true}}')).toBe("2011-03-13T07:06:40+00:00");
        expect(template('{{moment date=1300000000000 utc=true}}')).toBe("2011-03-13T07:06:40+00:00");
    });
    it("should format dates", function () {
        expect(template('{{moment 1300000000000 "YY, MMM dd" utc=true}}')).toBe("11, Mar Su");
        expect(template('{{moment date="1300000000000" format="DD/MM/YYYY" utc=true}}')).toBe("13/03/2011");
        expect(template('{{moment "1300000000" unix=true utc=true}}')).toBe("2011-03-13T07:06:40+00:00");
    });
    it("should accept formatted input", function () {
        expect(template('{{moment "15/2072/03" input="DD-YYYY-MM" utc=true}}')).toBe("2072-03-15T00:00:00+00:00");
    });
    it("should handle timezones", function () {
        expect(template('{{moment "2013-02-04T10:35:24-08:00" utc=true}}')).toBe("2013-02-04T18:35:24+00:00");
        var d = new Date("2013-02-04T10:35:24-08:00");
        expect(template('{{moment "2013-02-04T10:35:24-08:00" "todate" local=true}}')).toBe(d.toString());
    });
});

describe("Moment helper - date parts", function() {

    // 1300000093272 -> 2011-03-13T07:08:13+00:00
    it("should handle milliseconds", function () {
        expect(template('{{moment "1300000093272" "milliseconds"}}')).toBe("272");
        expect(template('{{moment "1300000093272" format="millisecond"}}')).toBe("272");
    });
    it("should handle seconds", function () {
        expect(template('{{moment "1300000093272" "seconds"}}')).toBe("13");
        expect(template('{{moment "1300000093272" format="second"}}')).toBe("13");
    });
    it("should handle minute", function () {
        expect(template('{{moment "1300000093272" "minute"}}')).toBe("8");
        expect(template('{{moment "1300000093272" format="minutes"}}')).toBe("8");
    });
    it("should handle hours", function () {
        expect(template('{{moment "1300000093272" "hour" utc=true}}')).toBe("7");
        expect(template('{{moment "1300000093272" format="hours" utc=true}}')).toBe("7");
    });
    it("should handle date parts", function () {
        expect(template('{{moment "1300000093272" "date" utc=true}}')).toBe("13");
        expect(template('{{moment "1300000093272" "dates" utc=true}}')).toBe("13");
        expect(template('{{moment "1300000093272" format="date" utc=true}}')).toBe("13");
    });
    it("should handle week day numbers", function () {
        expect(template('{{moment "1300000093272" "day" utc=true}}')).toBe("0");
        expect(template('{{moment "1300000093272" "days" utc=true}}')).toBe("0");
        expect(template('{{moment "1300000093272" format="days" utc=true}}')).toBe("0");
    });
    it("should handle week day strings", function () {
        expect(template('{{moment "1300000093272" "weekday" utc=true}}')).toBe("Sunday");
        expect(template('{{moment "1300000093272" format="weekday" utc=true}}')).toBe("Sunday");
        expect(template('{{moment "1300000093272" "weekday" type="s" utc=true}}')).toBe("Sun");
        expect(template('{{moment "1300000093272" "weekday" type="xs" utc=true}}')).toBe("Su");
        expect(template('{{moment "1300000093272" "weekday" type="number" utc=true}}')).toBe("0");
    });
    it("should handle ISO week days", function () {
        expect(template('{{moment "1300000093272" "isoWeekday" utc=true}}')).toBe("7");
        expect(template('{{moment "1300000093272" "isoweekday" utc=true}}')).toBe("7");
        expect(template('{{moment "1300000093272" format="isoweekday" utc=true}}')).toBe("7");
    });
    it("should handle day of the year", function () {
        expect(template('{{moment "1300000093272" "dayOfYear" utc=true}}')).toBe("72");
        expect(template('{{moment "1300000093272" "dayofyear" utc=true}}')).toBe("72");
        expect(template('{{moment "1300000093272" format="dayofyear" utc=true}}')).toBe("72");
    });
    it("should handle week parts", function () {
        expect(template('{{moment "1300000093272" "week" utc=true}}')).toBe("12");
        expect(template('{{moment "1300000093272" "weeks" utc=true}}')).toBe("12");
        expect(template('{{moment "1300000093272" format="weeks" utc=true}}')).toBe("12");
    });
    it("should handle ISO week parts", function () {
        expect(template('{{moment "1300000093272" "isoWeek" utc=true}}')).toBe("10");
        expect(template('{{moment "1300000093272" "isoweek" utc=true}}')).toBe("10");
        expect(template('{{moment "1300000093272" "isoweeks" utc=true}}')).toBe("10");
        expect(template('{{moment "1300000093272" format="isoweeks" utc=true}}')).toBe("10");
    });
    it("should handle month numbers", function () {
        expect(template('{{moment "1300000093272" "month" utc=true}}')).toBe("2");
        expect(template('{{moment "1300000093272" "months" utc=true}}')).toBe("2");
        expect(template('{{moment "1300000093272" format="month" utc=true}}')).toBe("2");
    });
    it("should handle year parts", function () {
        expect(template('{{moment "1300000093272" "year" utc=true}}')).toBe("2011");
        expect(template('{{moment "1300000093272" "years" utc=true}}')).toBe("2011");
        expect(template('{{moment "1300000093272" format="year" utc=true}}')).toBe("2011");
    });
    it("should handle week years", function () {
        expect(template('{{moment "1300000093272" "weekYear" utc=true}}')).toBe("2011");
        expect(template('{{moment "1300000093272" "weekyear" utc=true}}')).toBe("2011");
        expect(template('{{moment "1300000093272" format="weekyear" utc=true}}')).toBe("2011");
    });
    it("should handle ISO week years", function () {
        expect(template('{{moment "1300000093272" "isoWeekYear" utc=true}}')).toBe("2011");
        expect(template('{{moment "1300000093272" "isoweekyear" utc=true}}')).toBe("2011");
        expect(template('{{moment "1300000093272" format="isoweekyear" utc=true}}')).toBe("2011");
    });

});

describe("Moment helper - manipulation", function() {

    it("should be able to add", function () {
        expect(template('{{moment "1300000000000" add="days" amount="7" utc=true}}')).toBe("2011-03-20T07:06:40+00:00");
        expect(template('{{moment "1300000000000" add="365" addparam="d" utc=true}}')).toBe("2012-03-12T07:06:40+00:00");
    });
    it("should be able to subtract", function () {
        expect(template('{{moment "1300000000000" subtract="days" amount="7" utc=true}}')).toBe("2011-03-06T07:06:40+00:00");
        expect(template('{{moment "1300000000000" subtract="365" subtractparam="d" utc=true}}')).toBe("2010-03-13T07:06:40+00:00");
    });

    it("should be able to get endpoints of year", function () {
        expect(template('{{moment startof="year" utc=true}}')).toBe(year+"-01-01T00:00:00+00:00");
        expect(template('{{moment 1300000000000 startof="year" utc=true}}')).toBe("2011-01-01T00:00:00+00:00");
        expect(template('{{moment startof="year" format="DD/MM/YYYY" utc=true}}')).toBe("01/01/"+year);
        expect(template('{{moment endof="year" utc=true}}')).toBe(year + "-12-31T23:59:59+00:00");
        expect(template('{{moment 1300000000000 endof="year" utc=true}}')).toBe("2011-12-31T23:59:59+00:00");
    });
    it("should be able to determine which date is max/min", function () {
        expect(template('{{moment "1300000000000" max="1250000000000" utc=true}}')).toBe(Moment(1300000000000).utc().format());
        expect(template('{{moment "1250000000000" max="1300000000000" utc=true}}')).toBe(Moment(1300000000000).utc().format());
        expect(template('{{moment "1300000000000" min="1350000000000" utc=true}}')).toBe(Moment(1300000000000).utc().format());
        expect(template('{{moment "1350000000000" min="1300000000000" utc=true}}')).toBe(Moment(1300000000000).utc().format());
    });
});

xdescribe("Moment helper - zones", function() {

    xit("should handle zone stuff", function () {
        /*
        expect(template('{{moment "1300000000000" "utcOffset"}}')).toBe("");
        expect(template('{{moment "1300000000000" fn="zone"}}')).toBe("");
        expect(template('{{moment "1300000000000" "zoneName"}}')).toBe("");
        expect(template('{{moment "1300000000000" fn="zonename"}}')).toBe("");
        expect(template('{{moment "1300000000000" "zoneAbbr"}}')).toBe("");
        expect(template('{{moment "1300000000000" fn="zoneabbr"}}')).toBe("");
        */
    });
});

describe("Moment helper - values", function() {
    it("should return values", function () {
        expect(template('{{moment "1300000000000" "str" utc=true}}')).toBe("Sun Mar 13 2011 07:06:40 GMT+0000");
        expect(template('{{moment "1300000000000" "val"}}')).toBe("1300000000000");
        expect(template('{{moment "1300000000000" "unix"}}')).toBe("1300000000");
    });
});

describe("Moment helper - from", function() {
	it("should output difference from current time", function () {
		var ago = new Date(1300000000000);
		expect(template('{{moment "1300000000000" "fromNow" utc=true}}')).toBe(Moment(ago).fromNow());
		expect(template('{{moment "1300000000000" "fromnow" true utc=true}}')).toBe(Moment(ago).fromNow(true));
		expect(template('{{moment "1300000000000" fn="fromnow" suffix=false utc=true}}')).toBe(Moment(ago).fromNow(true));
		expect(template('{{moment "1300000000000" "fromnow" suffix=true utc=true}}')).toBe(Moment(ago).fromNow());
	});
	it("should output difference from specified time", function () {
		var ago = year - 2011;
		expect(template('{{moment "1300000000000" from=1200000000000 utc=true}}')).toBe("in 3 years");
		expect(template('{{moment "1300000000000" "from" 1500000000000 utc=true}}')).toBe("6 years ago");
		expect(template('{{moment "1300000000000" "from" 1500000000000 true utc=true}}')).toBe("6 years");
		expect(template('{{moment "1300000000000" "from" 1500000000000 suffix=false utc=true}}')).toBe("6 years");
		expect(template('{{moment "1300000000000" "from" 1500000000000 nosuffix=true utc=true}}')).toBe("6 years");
	});
});


describe("Moment helper - calendar", function() {
    it("should return calendar values", function () {

        expect(template('{{moment "1300000000000" "calendar" utc=true}}')).toBe("03/13/2011");
        function getHour (h) {
            h = h % 12;
            h = h || 12;
            return h;
        }
        function getMeridian (h) {
            return h > 11 ? "PM" : "AM";
        }
        var hvalue = now.getHours();
        var mvalue = now.getMinutes();
        if (mvalue < 10) {
            mvalue = "0" + mvalue;
        }
        var future = 6;
        var past = 2;
        var futurecalendar = (hvalue >= 24 - future) ? "Tomorrow" : "Today";
        var futurehour = (hvalue + future) % 24;
        var futuremeridian = getMeridian(futurehour);
        futurehour = getHour(futurehour);
        var pastday = (now.getDay() + 7 - past) % 7;
        var pasthour = getHour(hvalue);
        var pastmeridian = getMeridian(hvalue);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        expect(template('{{moment date "calendar" add="hours" amount=future}}', {date: now, future: future})).toBe(futurecalendar + " at " + futurehour + ":" + mvalue + " " + futuremeridian);
        expect(template('{{moment date "calendar" subtract="days" amount=past}}', {date: now, past: past})).toBe("Last " + days[pastday] + " at " + pasthour + ":" + mvalue + " " + pastmeridian);
    });
});

describe("Moment helper - diff", function() {

    it("should output the diff between 2 dates", function () {
        expect(template('{{moment "1300000000000" diff=1200000000000}}')).toBe("100000000000");
        expect(template('{{moment "1300000000000" "diff" 1299000000000 "days" false}}')).toBe("11");
        expect(template('{{moment "1300000000000" "diff" 1299000001000 "days" true}}')).toBe("11.5740625");
    });
});

describe("Moment helper - misc", function() {

    it("should provide util methods", function () {
        expect(template('{{moment "1300000000000" "daysinmonth"}}')).toBe("31");
        var d = new Date(1300000000000);
        expect(template('{{moment "1300000000000" "todate" utc=true}}')).toBe(d.toString());
        expect(template('{{moment "1300000000000" "array" utc=true}}')).toBe("2011,2,13,7,6,40,0");
        expect(template('{{moment "1300000000000" "isostring"}}')).toBe("2011-03-13T07:06:40.000Z");
    });
});

log.info("Tests described");

