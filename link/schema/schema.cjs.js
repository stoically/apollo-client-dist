'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var graphql = require('graphql');
var core = require('../core');
var utilities = require('../../utilities');

var SchemaLink = (function (_super) {
    tslib.__extends(SchemaLink, _super);
    function SchemaLink(options) {
        var _this = _super.call(this) || this;
        _this.schema = options.schema;
        _this.rootValue = options.rootValue;
        _this.context = options.context;
        return _this;
    }
    SchemaLink.prototype.request = function (operation) {
        var _this = this;
        return new utilities.Observable(function (observer) {
            new Promise(function (resolve) { return resolve(typeof _this.context === 'function'
                ? _this.context(operation)
                : _this.context); }).then(function (context) { return graphql.execute(_this.schema, operation.query, _this.rootValue, context, operation.variables, operation.operationName); }).then(function (data) {
                if (!observer.closed) {
                    observer.next(data);
                    observer.complete();
                }
            }).catch(function (error) {
                if (!observer.closed) {
                    observer.error(error);
                }
            });
        });
    };
    return SchemaLink;
}(core.ApolloLink));

exports.SchemaLink = SchemaLink;
//# sourceMappingURL=schema.cjs.js.map
