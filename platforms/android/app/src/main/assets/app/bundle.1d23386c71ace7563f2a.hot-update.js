webpackHotUpdate("bundle",{

/***/ "./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview.component.css":
/***/ (function(module, exports) {

module.exports = ".label1{\r\n  width: 10%;\r\n  float: left;\r\n}\r\n.label2{\r\n  text-align: center;\r\n}\r\n.img-status{\r\n  width: 15%;\r\n  float: left;\r\n}\r\n.img-circle{\r\n  width: 15%;\r\n  float: right;\r\n}\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview.component.html":
/***/ (function(module, exports) {

module.exports = "<ActionBar class=\"action-bar\">\r\n  <NavigationButton\r\n    ios:visibility=\"collapsed\"\r\n    icon=\"~/app/mobileTerminal/fonts/返回.png\"\r\n    (tap)=\"backToHome()\"\r\n  ></NavigationButton>\r\n  <Label class=\"action-bar-title\" text=\"作业列表\" horizontalAlignment=\"left\"></Label>\r\n</ActionBar>\r\n\r\n<StackLayout ios:backgroundColor=\"#CDCECE\" padding=\"5\">\r\n  <Label text=\"按作业号查找:\"></Label>\r\n  <!-- >> angular-autocomplete-remote-html -->\r\n  <RadAutoCompleteTextView #autocomplete [items]=\"dataItems\" completionMode=\"StartsWith\" suggestMode=\"SuggestAppend\" displayMode=\"Tokens\"\r\n                           (textChanged)=\"onTextChanged($event)\" (tokenSelected)=\"onTokenSelected($event)\" (didAutoComplete)=\"onDidAutoComplete($event)\"\r\n                           (tokenRemoved)=\"onTokenRemoved($event)\">\r\n    <SuggestionView tkAutoCompleteSuggestionView suggestionViewHeight=\"300\">\r\n      <ng-template tkSuggestionItemTemplate let-item=\"item\">\r\n        <StackLayout orientation=\"vertical\" padding=\"10\">\r\n          <Label [text]=\"item.text\"></Label>\r\n        </StackLayout>\r\n      </ng-template>\r\n    </SuggestionView>\r\n  </RadAutoCompleteTextView>\r\n  <!-- << angular-autocomplete-remote-html -->\r\n  <ScrollView height=\"100%\">\r\n    <ListView class=\"list-group\" [items]=\"workRequestList\" marginTop=\"0\">\r\n      <ng-template let-item1=\"item\" let-i=\"index\">\r\n        <GridLayout class=\"list-group-item\" rows=\"*\" columns=\"1/10*, 7/10*, 1/10*, 1/10*\">\r\n          <Label row=\"0\" col=\"0\" class=\"label1\" [text]=\"i+1\"></Label>\r\n          <Label row=\"0\" col=\"1\" class=\"label2\" [text]=\"item1.oid\"></Label>\r\n          <Image row=\"0\" col=\"2\" src=\"~/app/mobileTerminal/fonts/图表200#0e932e.png\" class=\"thumb img-circle\" (tap)=\"onChartTap(item1.oid)\"></Image>\r\n          <Image row=\"0\" col=\"3\" src=\"~/app/mobileTerminal/fonts/跳转箭头灰色.png\" class=\"thumb img-circle\" marginLeft=\"30\" (tap)=\"onListTap(item1._id)\"></Image>\r\n        </GridLayout>\r\n      </ng-template>\r\n    </ListView>\r\n  </ScrollView>\r\n</StackLayout>\r\n\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkOrderOverviewComponent", function() { return WorkOrderOverviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/nativescript-angular/index.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _workOrderOverview_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview.service.ts");
/* harmony import */ var nativescript_loading_indicator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/nativescript-loading-indicator/loading-indicator.js");
/* harmony import */ var nativescript_loading_indicator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nativescript_loading_indicator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nativescript_ui_autocomplete_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../node_modules/nativescript-ui-autocomplete/angular/autocomplete-directives.js");
/* harmony import */ var nativescript_ui_autocomplete_angular__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_autocomplete_angular__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var nativescript_ui_autocomplete__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../node_modules/nativescript-ui-autocomplete/ui-autocomplete.js");
/* harmony import */ var nativescript_ui_autocomplete__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_autocomplete__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var WorkOrderOverviewComponent = /** @class */ (function () {
    function WorkOrderOverviewComponent(routerExtensions, workOrderOverviewService) {
        this.routerExtensions = routerExtensions;
        this.workOrderOverviewService = workOrderOverviewService;
        // items: Array<TokenModel> = new Array();
        //保存列表数据(根据过滤动态变动)
        this.workRequestList = [];
        //保存列表数据(完整数据)
        this.filterWorkRequestList = [];
        //保存用户查询的条件
        this.queryArray = [];
        this.indicator = new nativescript_loading_indicator__WEBPACK_IMPORTED_MODULE_3__["LoadingIndicator"]();
    }
    WorkOrderOverviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoaderNoBezel();
        this.workOrderOverviewService.getWorkRequests().subscribe(function (val) {
            _this.workRequestList = val;
            _this.filterWorkRequestList = val;
            console.log(val, "workRequestList!!!");
            var items = new Array();
            for (var i = 0; i < val.length; i++) {
                items.push(new nativescript_ui_autocomplete__WEBPACK_IMPORTED_MODULE_5__["TokenModel"](val[i].oid, null));
            }
            console.log(items, "items!!!");
            // this.dataItems = items;
            // this._items = items;
            _this.autocomplete.autoCompleteTextView.loadSuggestionsAsync = function (text) {
                return new Promise(function (resolve, reject) {
                    return resolve(items);
                });
            };
            _this.hideIndicator();
        });
    };
    Object.defineProperty(WorkOrderOverviewComponent.prototype, "dataItems", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    WorkOrderOverviewComponent.prototype.onTextChanged = function (args) {
        console.log(lodash__WEBPACK_IMPORTED_MODULE_6__["isEmpty"](lodash__WEBPACK_IMPORTED_MODULE_6__["trim"](args.text)), "args.text!!!");
        // _.trim(args.text);
        console.log("onTextChanged: " + args.text);
        var filterObj = lodash__WEBPACK_IMPORTED_MODULE_6__["trim"](args.text);
        if (!lodash__WEBPACK_IMPORTED_MODULE_6__["isEmpty"](filterObj)) {
            var listArray = this.filterWorkRequestList.filter(function (val) { return val.oid.includes(filterObj); });
            this.workRequestList = listArray;
        }
    };
    WorkOrderOverviewComponent.prototype.onTokenRemoved = function (args) {
        console.log("onTokenRemoved: " + args.text);
        this.queryArray.r;
    };
    WorkOrderOverviewComponent.prototype.onTokenSelected = function (args) {
        console.log("onTokenSelected: " + args.text);
        var listArray = this.filterWorkRequestList.filter(function (val) {
            if (val.oid.includes(args.text)) {
                return true;
            }
            else {
                return false;
            }
        });
        this.workRequestList = listArray;
    };
    WorkOrderOverviewComponent.prototype.onDidAutoComplete = function (args) {
        console.log("onDidAutoComplete: " + args.text);
        if (!lodash__WEBPACK_IMPORTED_MODULE_6__["isEmpty"](args.text)) {
            var listArray = this.filterWorkRequestList.filter(function (val) { return val.oid.includes(args.text); });
            this.workRequestList = listArray;
        }
    };
    WorkOrderOverviewComponent.prototype.onChartTap = function (oid) {
        this.routerExtensions.navigate(["/workOrderOverview/work-res/" + oid]);
        // this.routerExtensions.navigate([`/workOrderOverview/work-res/${this.workRequestList[args.index].oid}`]);
    };
    WorkOrderOverviewComponent.prototype.onListTap = function (_id) {
        this.routerExtensions.navigate(["/workOrderOverview/jobOrder/" + _id]);
    };
    WorkOrderOverviewComponent.prototype.backToHome = function () {
        this.routerExtensions.back();
    };
    //显示加载loading
    WorkOrderOverviewComponent.prototype.showLoaderNoBezel = function () {
        this.indicator.show({
            message: '正在加载中...',
            // mode: Mode.Determinate ,
            ios: {
                color: '#000',
                hideBezel: true
            },
            android: {
                // max:20,
                details: "Additional detail note!",
                // margin: 10,//loading标签往上走
                dimBackground: true,
                square: true,
                color: '#000',
                backgroundColor: "green",
                userInteractionEnabled: true,
                hideBezel: true,
                mode: nativescript_loading_indicator__WEBPACK_IMPORTED_MODULE_3__["Mode"].CustomView,
                indeterminate: true,
                // cancelable: true,
                customView: 'icon.png' //mode模式为Mode.CustomView是才生效,自定义loading图片
            }
        });
    };
    WorkOrderOverviewComponent.prototype.hideIndicator = function () {
        this.indicator.hide();
    };
    WorkOrderOverviewComponent.prototype.ngAfterViewInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("autocomplete"),
        __metadata("design:type", nativescript_ui_autocomplete_angular__WEBPACK_IMPORTED_MODULE_4__["RadAutoCompleteTextViewComponent"])
    ], WorkOrderOverviewComponent.prototype, "autocomplete", void 0);
    WorkOrderOverviewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "mes-m-workOrderOverview",
            /*duleId: module.i*/
            template: __webpack_require__("./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview.component.html"),
            styles: [__webpack_require__("./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview.component.css")],
            providers: [_workOrderOverview_service__WEBPACK_IMPORTED_MODULE_2__["WorkOrderOverviewService"]]
        }),
        __metadata("design:paramtypes", [nativescript_angular__WEBPACK_IMPORTED_MODULE_1__["RouterExtensions"],
            _workOrderOverview_service__WEBPACK_IMPORTED_MODULE_2__["WorkOrderOverviewService"]])
    ], WorkOrderOverviewComponent);
    return WorkOrderOverviewComponent;
}());



/***/ })

})