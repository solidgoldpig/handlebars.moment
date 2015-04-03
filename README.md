# handlebars.moment

    {{moment}}

Content helpers providing [Moment.js](http://handlebarsjs.com) functionality for [Handlebars](http://handlebarsjs.com)

### Version

1.0.2

### Installation

    npm install handlebars.moment

### Registering the helpers

    var Handlebars = require("handlebars");
    var MomentHandler = require("handlebars.moment");
    MomentHandler.registerHelpers(Handlebars);

### Using the helpers

#### moment

Current date

    {{moment}}

Specific date

    {{moment d}}
    {{moment date=d}}

Date format

    {{moment d "YY, MMM dd"}}
    {{moment date=d format="DD/MM/YYYY"}}
    {{moment d unix=true}}

Date input parsing

    {{moment dinput input="DD-YYYY-MM"}}

Date timezone

    {{moment dstr utc=true}}
    {{moment dstr local=true}}

Date units

    {{moment d "millisecond"}}
    {{moment d "second"}}
    {{moment d "minute"}}
    {{moment d "hour"}}
    {{moment d "date"}}
    {{moment d "day"}}
    {{moment d "weekday"}}
    {{moment d "weekday" type="s"}}
    {{moment d "weekday" type="xs"}}
    {{moment d "weekday" type="number"}}
    {{moment d "isoweekday"}}
    {{moment d "dayofyear"}}
    {{moment d "week"}}
    {{moment d "isoweek"}}
    {{moment d "month"}}
    {{moment d "year"}}
    {{moment d "weekyear"}}
    {{moment d "isoweekyear"}}

Date manipulation

    {{moment d add="days" amount="7"}}
    {{moment d add="365" addparam="d"}}
    {{moment d subtract="days" amount="7"}}
    {{moment d subtract="365" subtractparam="d"}}

Start and end of years

    {{moment d startof="year"}}
    {{moment d endof="year"}}

Date thresholds

    {{moment d max=dmax}}
    {{moment d min=dmin}}

Date from now and specific dates
 
    {{moment d "fromNow"}}
    {{moment d "from" dfrom}}

Difference between dates

    {{moment d diff=ddiff}}

Date as calendar time

    {{moment d "calendar"}}

Date as strings
    {{moment d "str"}}
    {{moment d "val"}}
    {{moment d "unix"}}

Moment utils

    {{moment d "daysinmonth"}}
    {{moment d "todate"}}
    {{moment d "array"}}
    {{moment d "isostring"}}

#### duration

Duration - implictly in milliseconds

    {{duration d}}

Duration with explicit input date unit type
    
    {{duration d input="s"}}

Amount of date units in duration

    {{duration d "seconds"}}
    {{duration d "minutes"}}
    {{duration d "years"}}
    {{duration d get="seconds"}}
    {{duration d "s"}}

Duration as date units

    {{duration d "asseconds"}}
    {{duration d "asminutes"}}
    {{duration d "asyears"}}
    {{duration d as="seconds"}}

Humanize duration output

    {{duration d "humanize"}}
    {{duration d "humanize" true}}
    {{duration d suffix=true}}

Manipulate durations

    {{duration d add=damount as="milliseconds"}}
    {{duration d subtract=damount as="seconds"}}
    {{duration d subtract=damount as="days"}}

### Tests

To run the tests, cd to the handlebars.choice directory

    npm install && npm test

### Unlicense

handlebars.moment is free and unencumbered software released into 
the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>