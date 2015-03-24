var Log = require("log");
var log = new Log(process.env.loglevel || "error");

var Handlebars = require("handlebars");
require("../handlebars.moment").registerHelpers(Handlebars);

function template(tmpl, data) {
    var urtemplate = Handlebars.compile(tmpl);
    var output = urtemplate(data || {});
    log.info(output);
    return output;
}

describe("Duration helper - dates and date parts", function() {
    it("should handle durations", function () {
        expect(template('{{duration 2000}}')).toBe("a few seconds");
        expect(template('{{duration 2000000 "seconds"}}')).toBe("20");
        expect(template('{{duration 2000000 "asseconds"}}')).toBe("2000");
        expect(template('{{duration 2000000}}')).toBe("33 minutes");
        expect(template('{{duration 2000000 "minutes"}}')).toBe("33");
        expect(template('{{duration 2000000 "asminutes"}}')).toBe("33.333333333333336");
        expect(template('{{duration 2000000 "years"}}')).toBe("0");
        expect(template('{{duration 2000000 "asyears"}}')).toMatch(/^0.000063/);
        expect(template('{{duration 2000000 "asyears"}}')).toMatch(/^0.000063/);
        expect(template('{{duration 2000000 "humanize"}}')).toBe("33 minutes");
        expect(template('{{duration 2000000 "humanize" true}}')).toBe("in 33 minutes");
        expect(template('{{duration 2000000 suffix=true}}')).toBe("in 33 minutes");
        expect(template('{{duration 2000000 as="seconds"}}')).toBe("2000");
        expect(template('{{duration 2000000 get="seconds"}}')).toBe("20");
        expect(template('{{duration 2000000 "s"}}')).toBe("20");
    });
});

describe("Duration helper - manipulation", function() {
    it("should manipulate durations", function () {
        expect(template('{{duration 1000 add=1000 as="milliseconds"}}')).toBe("2000");
        expect(template('{{duration 2000 subtract=1000 as="milliseconds"}}')).toBe("1000");
        expect(template('{{duration "2000" subtract="1000" as="milliseconds"}}')).toBe("1000");
        expect(template('{{duration duration="2000" subtract="1000" as="milliseconds"}}')).toBe("1000");
    });

});


log.info("Tests described");

