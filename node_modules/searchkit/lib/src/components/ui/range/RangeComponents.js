"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var React = require('react');
var _1 = require('./');
var core_1 = require("../../../core");
var defaults = require("lodash/defaults");
var RangeComponent = (function (_super) {
    __extends(RangeComponent, _super);
    function RangeComponent() {
        _super.apply(this, arguments);
    }
    RangeComponent.prototype.render = function () {
        var _a = this.props, showHistogram = _a.showHistogram, showSlider = _a.showSlider, showInput = _a.showInput;
        return (React.createElement("div", null, showHistogram ? React.createElement(_1.RangeHistogram, __assign({}, this.props)) : undefined, showSlider ? React.createElement(_1.RangeSlider, __assign({}, this.props)) : undefined, showInput ? React.createElement(_1.RangeInput, __assign({}, this.props)) : undefined));
    };
    RangeComponent.propTypes = {
        showHistogram: React.PropTypes.bool,
        showSlider: React.PropTypes.bool,
        showInput: React.PropTypes.bool
    };
    RangeComponent = __decorate([
        core_1.PureRender, 
        __metadata('design:paramtypes', [])
    ], RangeComponent);
    return RangeComponent;
}(React.Component));
exports.RangeComponent = RangeComponent;
function RangeComponentBuilder(components) {
    return function (props) { return React.createElement(RangeComponent, __assign({}, props, components)); };
}
exports.RangeComponentBuilder = RangeComponentBuilder;
exports.RangeSliderHistogram = RangeComponentBuilder({ showHistogram: true, showSlider: true });
exports.RangeSliderHistogramInput = RangeComponentBuilder({ showHistogram: true, showSlider: true, showInput: true });
exports.RangeSliderInput = RangeComponentBuilder({ showSlider: true, showInput: true });
exports.RangeHistogramInput = RangeComponentBuilder({ showHistogram: true, showInput: true });
//# sourceMappingURL=RangeComponents.js.map