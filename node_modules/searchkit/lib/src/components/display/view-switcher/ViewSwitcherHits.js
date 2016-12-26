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
var React = require("react");
var omit = require("lodash/omit");
var defaults = require("lodash/defaults");
var core_1 = require("../../../core");
var _1 = require("../../");
var ViewSwitcherHits = (function (_super) {
    __extends(ViewSwitcherHits, _super);
    function ViewSwitcherHits(props) {
        _super.call(this, props);
    }
    ViewSwitcherHits.prototype.defineAccessor = function () {
        return new core_1.ViewOptionsAccessor("view", this.props.hitComponents);
    };
    ViewSwitcherHits.prototype.render = function () {
        var hitComponents = this.props.hitComponents;
        var props = omit(this.props, "hitComponents");
        var selectedOption = this.accessor.getSelectedOption();
        props.itemComponent = selectedOption.itemComponent;
        props.listComponent = selectedOption.listComponent;
        props.mod = 'sk-hits-' + selectedOption.key;
        return (React.createElement(_1.Hits, __assign({}, props)));
    };
    ViewSwitcherHits.propTypes = defaults({
        hitComponents: React.PropTypes.arrayOf(React.PropTypes.shape({
            key: React.PropTypes.string.isRequired,
            title: React.PropTypes.string.isRequired,
            itemComponent: core_1.RenderComponentPropType,
            listComponent: core_1.RenderComponentPropType,
            defaultOption: React.PropTypes.bool
        }))
    }, _1.Hits.propTypes);
    return ViewSwitcherHits;
}(core_1.SearchkitComponent));
exports.ViewSwitcherHits = ViewSwitcherHits;
//# sourceMappingURL=ViewSwitcherHits.js.map