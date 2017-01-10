//User Story: I can add, subtract, multiply and divide two numbers.
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//User Story: I can clear the input field with a clear button.
//User Story: I can keep chaining mathematical operations together until I hit the equal button, and the calculator will tell me the correct output.
//when break is done start the session again
var LengthControl = (function (_super) {
    __extends(LengthControl, _super);
    function LengthControl(props) {
        var _this = _super.call(this, props) || this;
        _this.fill = _this.fill.bind(_this);
        return _this;
    }
    LengthControl.prototype.fill = function () {
        var options = [];
        //start = 2;
        for (var i = this.props["default"]; i > 0; i--) {
            options.push(i);
        }
        return options;
    };
    LengthControl.prototype.render = function () {
        var options = this.fill(this.props.length).map(function (item) {
            return (React.createElement("option", null, item));
        });
        return (React.createElement("div", null,
            React.createElement("div", { className: "text-capitalize" }, this.props.id),
            React.createElement("div", null,
                React.createElement("select", { onChange: this.props.onChange, id: this.props.id }, options))));
    };
    return LengthControl;
}(React.Component));
var ClockControl = (function (_super) {
    __extends(ClockControl, _super);
    function ClockControl(props) {
        var _this = _super.call(this, props) || this;
        _this.props = props;
        return _this;
    }
    ClockControl.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("button", { id: this.props.name, className: this.props.buttonClass + " text-uppercase center-block", onClick: this.props.handleClick }, this.props.name)));
    };
    return ClockControl;
}(React.Component));
var PomodoroClock = (function (_super) {
    __extends(PomodoroClock, _super);
    function PomodoroClock() {
        var _this = _super.call(this) || this;
        _this.defaultSession = 25;
        _this.defaultBreak = 5;
        _this.state = {
            resetButtonClass: "reset-disable disable",
            startButtonClass: "show",
            stopButtonClass: "hide",
            remainingSeconds: 0,
            remainingMinutes: _this.defaultSession,
            breakLength: _this.defaultBreak,
            sessionLength: _this.defaultSession,
            runningLengthType: "session"
        };
        _this.setState = _this.setState.bind(_this);
        _this.countdown = _this.countdown.bind(_this);
        _this.start = _this.start.bind(_this);
        _this.stop = _this.stop.bind(_this);
        _this.reset = _this.reset.bind(_this);
        return _this;
    }
    PomodoroClock.prototype.start = function () {
        this.setState({
            startButtonClass: "hide",
            stopButtonClass: "show",
            resetButtonClass: "reset-enable"
        });
        this.interval = setInterval(this.countdown, 1000);
    };
    PomodoroClock.prototype.countdown = function () {
        var remainingSeconds = this.state["remainingSeconds"];
        var remainingMinutes = this.state["remainingMinutes"];
        var runningLengthType = this.state["runningLengthType"];
        if (remainingSeconds === 0) {
            remainingMinutes--;
            remainingSeconds = 60;
        }
        remainingSeconds--;
        if (remainingMinutes === 0 && remainingSeconds === 0) {
            remainingMinutes = runningLengthType === "session" ? this.state["breakLength"] : this.state["sessionLength"];
            runningLengthType = runningLengthType === "session" ? "break" : "session";
        }
        this.setState({
            remainingSeconds: remainingSeconds,
            remainingMinutes: remainingMinutes,
            runningLengthType: runningLengthType
        });
    };
    PomodoroClock.prototype.stop = function () {
        this.setState({
            startButtonClass: "show",
            stopButtonClass: "hide",
            resetButtonClass: "reset-disable disable"
        });
        clearInterval(this.interval);
    };
    PomodoroClock.prototype.reset = function () {
        clearInterval(this.interval);
        this.setState({
            startButtonClass: "show",
            stopButtonClass: "hide",
            resetButtonClass: "reset-disable",
            remainingMinutes: this.state["sessionLength"],
            remainingSeconds: 0,
            runningLengthType: "session"
        });
    };
    PomodoroClock.prototype.pad = function (minOrSec) {
        if (minOrSec < 10) {
            return "0" + minOrSec;
        }
        return minOrSec;
    };
    PomodoroClock.prototype.modifyLength = function (e) {
        if (this.interval !== null) {
            clearInterval(this.interval);
        }
        var controlName = $(e.target).attr("id");
        var length = $(e.target).val();
        if (controlName === "session") {
            this.setState({
                remainingMinutes: length,
                remainingSeconds: 0
            });
        }
        this.setState((_a = {},
            _a[controlName + "Length"] = length,
            _a.startButtonClass = "show",
            _a.stopButtonClass = "hide",
            _a.resetButtonClass = "reset-disable disable",
            _a));
        var _a;
    };
    PomodoroClock.prototype.render = function () {
        return (React.createElement("div", { id: "clock" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-xs-6 text-center" },
                    React.createElement(LengthControl, { "default": this.defaultSession, length: this.state["sessionLength"], id: "session", onChange: this.modifyLength.bind(this) })),
                React.createElement("div", { className: "col-xs-6 text-center" },
                    React.createElement(LengthControl, { "default": this.defaultBreak, length: this.state["breakLength"], id: "break", onChange: this.modifyLength.bind(this) }))),
            React.createElement("div", { id: "countdownArea", className: "text-center text-capitalize" },
                this.state["runningLengthType"],
                React.createElement("div", { id: "countdown" },
                    this.state["remainingMinutes"],
                    ":",
                    this.pad(this.state["remainingSeconds"]))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-xs-6" },
                    React.createElement(ClockControl, { name: "reset", buttonClass: this.state["resetButtonClass"], handleClick: this.reset.bind(this) })),
                React.createElement("div", { className: "col-xs-6" },
                    React.createElement(ClockControl, { name: "start", buttonClass: this.state["startButtonClass"], handleClick: this.start.bind(this) }),
                    React.createElement(ClockControl, { name: "stop", buttonClass: this.state["stopButtonClass"], handleClick: this.stop.bind(this) })))));
    };
    return PomodoroClock;
}(React.Component));
ReactDOM.render(React.createElement(PomodoroClock, null), document.getElementsByTagName("body")[0]);