webpackHotUpdate("bundle",{

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
    // dataItems = [];
    function WorkOrderOverviewComponent(routerExtensions, workOrderOverviewService) {
        this.routerExtensions = routerExtensions;
        this.workOrderOverviewService = workOrderOverviewService;
        // items: Array<TokenModel> = new Array();
        this.workRequestList = [];
        this.filterWorkRequestList = [];
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
        lodash__WEBPACK_IMPORTED_MODULE_6__["trim"](args.text);
        console.log("onTextChanged: " + args.text);
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