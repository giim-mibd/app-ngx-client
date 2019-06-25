module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 	    delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = global["webpackHotUpdate"];
/******/ 	global["webpackHotUpdate"] =     function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 	        hotAddUpdateChunk(chunkId, moreModules);
/******/ 	        if (parentHotUpdateCallback) {
/******/ 	            parentHotUpdateCallback(chunkId, moreModules);
/******/ 	        }
/******/ 	    }
/******/
/******/ 	    function hotDownloadUpdateChunk(chunkId) {
/******/ 	        const requestPath = './' + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 	        try {
/******/ 	            require(requestPath);
/******/ 	        } catch (e) {
/******/ 	            console.log("Hot download for update chunk failed.");
/******/ 	            console.error(e);
/******/ 	        }
/******/ 	    }
/******/
/******/ 	    function hotDownloadManifest() {
/******/ 	        return new Promise(function (resolve, reject) {
/******/ 	            const requestPath = './' + "" + hotCurrentHash + ".hot-update.json";
/******/ 	            try {
/******/ 	                const update = require(requestPath);
/******/ 	                resolve(update);
/******/ 	            } catch (e) {
/******/ 	                console.log("Hot download for manifest failed.");
/******/ 	                console.error(e);
/******/ 	                reject(e);
/******/ 	            }
/******/ 	        });
/******/ 	    }
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "ef70c44464f06be857dc";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		"bundle": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = global["webpackJsonp"] = global["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./main.ts","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./app.css":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.i(__webpack_require__("../node_modules/css-loader/index.js?!../node_modules/nativescript-theme-core/css/core.light.css"), "");

// module
exports.push([module.i, "/*\r\nIn NativeScript, the app.css file is where you place CSS rules that\r\nyou would like to apply to your entire application. Check out\r\nhttp://docs.nativescript.org/ui/styling for a full list of the CSS\r\nselectors and properties you can use to style UI components.\r\n\r\n/*\r\nIn many cases you may want to use the NativeScript core theme instead\r\nof writing your own CSS rules. For a full list of class names in the theme\r\nrefer to http://docs.nativescript.org/ui/theme.\r\n*/\r\n", ""]);

// exports
;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './app.css' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./app/@core/data/app.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppService", function() { return AppService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_internal_operators_tap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/rxjs/internal/operators/tap.js");
/* harmony import */ var rxjs_internal_operators_tap__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_operators_tap__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./app/@core/data/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppService = /** @class */ (function () {
    function AppService(http, messageService) {
        this.http = http;
        this.messageService = messageService;
        this.baseUrl = "http://100.13.32.237:9000";
    }
    AppService.prototype.createRequestHeader = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json' });
        return headers;
    };
    /**
     * 获取所有的层级信息
     * @return {Observable<IHierarchyScope[]>} [层级信息 Array]
     */
    AppService.prototype.getHss = function (field, sort) {
        var _this = this;
        if (field === void 0) { field = ''; }
        if (sort === void 0) { sort = 'path'; }
        var url = this.baseUrl + "/api/hierarchyScopes/?field=" + field + "&sort=" + sort;
        return this.http.get(url)
            .pipe(Object(rxjs_internal_operators_tap__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (_) { return _this.log('fetched hss'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(this.handleError('getHss', [])));
    };
    /** Log a HeroService message with the MessageService */
    AppService.prototype.log = function (message) {
        this.messageService.add("HsService: " + message);
    };
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    AppService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _this.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(result);
        };
    };
    AppService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _message_service__WEBPACK_IMPORTED_MODULE_5__["MessageService"]])
    ], AppService);
    return AppService;
}());



/***/ }),

/***/ "./app/@core/data/message.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageService", function() { return MessageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MessageService = /** @class */ (function () {
    function MessageService() {
        this.messages = [];
    }
    MessageService.prototype.add = function (message) {
        this.messages.push(message);
    };
    MessageService.prototype.clear = function () {
        this.messages = [];
    };
    MessageService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' })
    ], MessageService);
    return MessageService;
}());



/***/ }),

/***/ "./app/@core/data/util.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilData", function() { return UtilData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialData", function() { return MaterialData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipData", function() { return EquipData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkData", function() { return WorkData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableSettings", function() { return TableSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IDCmpFn", function() { return IDCmpFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OIDCmpFn", function() { return OIDCmpFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NameCmpFn", function() { return NameCmpFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "winSize", function() { return winSize; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

//应用相关数据
var UtilData = /** @class */ (function () {
    function UtilData() {
    }
    UtilData.systemObj = {
        hs: {
            text: 'hs',
            name: '层级结构',
        },
        personnel: {
            text: 'personnel',
            name: '员工',
        },
        equipment: {
            text: 'equipment',
            name: '设备',
        },
        material: {
            text: 'material',
            name: '物料',
        },
        para: {
            text: 'para',
            name: '参数',
        },
        opdef: {
            text: 'opdef',
            name: '操作定义',
        },
        kpi: {
            text: 'kpi',
            name: 'KPI',
        },
        physicalAsset: {
            text: 'physicalAsset',
            name: '工装',
        },
        energy: {
            text: 'energy',
            name: '能源',
        },
        sched: {
            text: 'sched',
            name: '维护计划',
        }
    };
    //正常的logo
    UtilData.logo = '传奇陶瓷We系统';
    //简写的logo
    UtilData.shortLogo = '传奇陶瓷';
    //详细完整的logo
    UtilData.longLogo = '';
    //长时间格式 2018年01月23日 19:43
    UtilData.longDateOpt = { year: 'numeric', month: 'long', day: 'numeric', hour12: false, hour: 'numeric', minute: 'numeric' };
    //短时间格式 2018年01月23日
    UtilData.shortDateOpt = { year: 'numeric', month: 'long', day: 'numeric' };
    //calendar的时间显示中文版（完整）
    UtilData.zhFull = {
        firstDayOfWeek: 0,
        dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
        monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        today: '今天',
        clear: '清除'
    };
    //calendar的时间显示中文版
    UtilData.zh = {
        firstDayOfWeek: 0,
        dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
        monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        today: '今天',
        clear: '清除'
    };
    //代替字符串，需要被替代的内容
    UtilData.txtReplace = '*#*';
    //查看的自负表示，静态修改，可统一配置
    UtilData.txtGet = '确定';
    //新建的字符表示，静态修改，可统一配置
    UtilData.txtNew = '新建';
    //更新的字符表示，静态修改，可统一配置
    UtilData.txtUpdate = '更新';
    //选择的字符表示，静态修改，可统一配置
    UtilData.txtSelect = '选择';
    UtilData.txtRelease = '布产';
    UtilData.txtReleaseSingle = '单独布产';
    UtilData.txtReleaseMulti = '联合布产';
    //get 的类型字符串，一般不需要修改，为了一致性，在此统一配置
    UtilData.txtGetType = 'get';
    //create 的类型字符串，一般不需要修改，为了一致性，在此统一配置
    UtilData.txtCreateType = 'create';
    //createby 的类型字符串，一般不需要修改，为了一致性，在此统一配置
    //createby 与 create 的区别在于，createby 有一个额外的参数，
    //作为 createby 创建的依据
    UtilData.txtCreateByType = 'createby';
    //订单创建的物料批次
    UtilData.txtCreateByJobType = 'createbyjob';
    //update 的类型字符串，一般不需要修改，为了一致性，在此统一配置
    UtilData.txtUpdateType = 'update';
    //updatepart, update part of an object, 为了一致性，在此统一配置
    UtilData.txtUpdatePartType = 'updateType';
    UtilData.txtReleaseType = 'release';
    UtilData.txtManageType = 'manage';
    //delete行 的提示说明，一般不需要修改，为了一致性，在此统一配置
    UtilData.txtDeleteRowDes = '删除该行数据后，不可恢复，是否继续？';
    //delete属性 的提示说明，一般不需要修改，为了一致性，在此统一配置
    UtilData.txtDeletePropDes = '该属性将被删除，是否继续？';
    //生产节拍的单位，表示一个Op或者一个Job的生产时间
    UtilData.tuints = ['年', '月', '周', '天', '小时', '分钟', '秒'];
    //生产管理员的角色
    UtilData.txtManager = '生产管理员';
    //公共生产元的角色
    UtilData.txtPublic = '公共生产员';
    //超级管理员的角色
    UtilData.txtSuper = '超级管理管';
    //组长的角色
    UtilData.txtTeamLeader = '组长';
    //标准的属性标签
    UtilData.txtTags = ['tag', '员工属性', '设备属性', '物料属性', '缺陷',
        '瓷土', '瓷釉', '成型', '修坯', '喷釉',
        '登窑', '烧成', '报警属性', '其他', '工序属性',
        '操作项属性', '订单属性', '检验项', '半检', '报废',
        '成检', '巡检'];
    UtilData.tags = {
        tag: {
            text: 'tag',
            name: 'tag',
        },
        person: {
            text: 'person',
            name: '员工属性',
        },
        equipment: {
            text: 'equipment',
            name: '设备属性',
        },
        material: {
            text: 'material',
            name: '物料属性',
        },
        defect: {
            text: 'defect',
            name: '缺陷',
        },
        ct: {
            text: 'ct',
            name: '瓷土',
        },
        cj: {
            text: 'cj',
            name: '瓷釉',
        },
        mold: {
            text: 'mold',
            name: '成型',
        },
    };
    /**
     * [终端操作可能出现的错误]
     * trans: 有限状态机报错，状态转移错误
     * mismatch: 物料不匹配，扫描的物料与订单需求不匹配
     * molder: 成型工扫的条码与成型工自己不匹配，扫了别人的条码
     * color：喷釉颜色不匹配
     * invalid: 无效的条码
     * repeat: 重复条码
     * kiln: 窑炉不匹配
     * repair: 修复方式不匹配
     * @type {Array}
     */
    UtilData.terminalErrs = ['trans', 'mismatch', 'molder', 'color', 'invalid', 'repeat', 'kiln', 'repair', 'order', ''];
    /**
     * [终端操作的警告信息]
     * emptyKiln: 窑炉信息为空
     * emptyMdef： 物料定义不完
     * emptyMdefKiln：以上两者
     * @type {Array}
     */
    UtilData.terminalWarnings = ['emptyKiln', 'emptyMdef', 'emptyMdefKiln', ''];
    /**
     * [ run for job running
     * qc for quality control
     * sc for scrap
     * err for error]
     * @type {Array}
     */
    UtilData.terminalStates = ['run', 'qc', 'sc', 'err', 'warning'];
    UtilData.terminalCategorys = ['电子看板', '检验终端', '巡视终端', '大屏'];
    UtilData.terminalSizes = ['5*7', '12*16'];
    UtilData.terminalResolutions = ['600*800', '600*900'];
    /**
     * [成型工的字符串]
     * @type {String}
     */
    UtilData.txtMolder = '成型工';
    /**
     * [成品的字符床]
     * @type {String}
     */
    UtilData.txtProduct = '成品';
    /**
     * [坯体的字符串]
     * @type {String}
     */
    UtilData.txtPT = '坯体';
    /**
     * [模具的字符串]
     * @type {String}
     */
    UtilData.txtMJ = '模具';
    /**
     * [备品备件的字符串]
     * @type {String}
     */
    UtilData.txtBJ = '备品备件';
    /**
     * [纸箱的字符串]
     * @type {String}
     */
    UtilData.txtZX = '纸箱';
    /**
     * [托盘的字符串]
     * @type {String}
     */
    UtilData.txtTP = '托盘';
    //HierarchyScope Levels
    UtilData.hsLevels = ['Enterprise', 'Site', 'Area',
        'ProcessCell', 'Unit', 'ProductionLine', 'WorkCell', 'ProductionUnit',
        'StorageZone', 'StorageUnit', 'StorageLocation', 'WorkCenter', 'WorkUnit',
        'EquipmentModule', 'ControlModule', 'Other'];
    UtilData.hsLevelTree = {
        text: 'Enterprise',
        value: 'Enterprise',
        checked: false,
        children: [{ text: 'Site',
                value: 'Site',
                checked: false,
                children: [{ text: 'Area',
                        value: 'Area',
                        checked: false,
                        children: [{ text: 'WorkCenter',
                                value: 'WorkCenter',
                                checked: false,
                                children: [{ text: 'WorkUnit',
                                        value: 'WorkUnit',
                                        checked: false
                                    }]
                            }, { text: 'StorageZone',
                                value: 'StorageZone',
                                checked: false,
                                children: [{ text: 'StorageUnit',
                                        value: 'StorageUnit',
                                        checked: false
                                    }]
                            }, { text: 'ProductionLine',
                                value: 'ProductionLine',
                                checked: false,
                                children: [{ text: 'WorkCell',
                                        value: 'WorkCell',
                                        checked: false
                                    }]
                            }, { text: 'ProcessCell',
                                value: 'ProcessCell',
                                checked: false,
                                children: [{ text: 'Unit',
                                        value: 'Unit',
                                        checked: false
                                    }]
                            }, { text: 'ProductionUnit',
                                value: 'ProductionUnit',
                                checked: false,
                                children: [{ text: 'Unit',
                                        value: 'Unit',
                                        checked: false
                                    }]
                            }] // children of Area
                    }] // children of Site
            }] // children of Enterprise
    };
    UtilData = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], UtilData);
    return UtilData;
}());

//物料相关数据
var MaterialData = /** @class */ (function () {
    function MaterialData() {
    }
    //物料装配类型
    MaterialData.assemblyTypes = ['Physical', 'Logical', 'Other', ''];
    //物料装配关系
    MaterialData.assemblyRelations = ['Permanent', 'Transient', 'Other', ''];
    //物料批次或者物料子批次的状态
    MaterialData.statuses = ['released', 'approved', 'blocked', 'in process', 'in quality check', 'scraped'];
    //使用类型
    MaterialData.useTypes = ['Consumed', 'Produced', 'Consumable', 'Replaced Asset', 'Replacement Asset',
        'Sample', 'Returned Sample', 'Carrier', 'Returned Carrier', 'Other', ''];
    //material use type for production operations
    MaterialData.pUseTypes = ['Consumed', 'Produced', 'Consumable', 'Other', ''];
    //material use type for maintenance operations
    MaterialData.mUseTypes = ['Consumable', 'Replaced Asset', 'Replacement Asset', 'Other', ''];
    //material use type for quality operations
    MaterialData.qUseTypes = ['Consumable', 'Sample', 'Returned Sample', 'Other', ''];
    //material use type for inventory operations
    MaterialData.iUseTypes = ['Consumable', 'Carrier', 'Returned Carrier', 'Other', ''];
    //终端操作相关的所有内容，包括字符/名称/状态/URL
    MaterialData.BodyOps = {
        create: {
            text: 'create',
            name: '创建',
            pre: '',
            oper: '',
            state: 'Created',
            desc: '已创建',
            url: ''
        },
        mold: {
            text: 'mold',
            name: '成型',
            pre: '',
            oper: '成型工',
            state: 'Molded',
            desc: '已成型',
            url: '/terminals/molding',
        },
        remold: {
            text: 'remold',
            name: '型号更换',
            pre: '',
            oper: '成型工',
            state: 'Molded',
            desc: '已成型',
            url: ''
        },
        dry: {
            text: 'dry',
            name: '干燥',
            pre: '',
            oper: '',
            state: 'Dried',
            desc: '已干燥',
            url: '',
        },
        trim: {
            text: 'trim',
            name: '修坯',
            pre: '成型',
            oper: '修坯工',
            state: 'Trimed',
            desc: '已修坯',
            url: '/terminals/job/trimming',
        },
        mgtrim: {
            text: 'mgtrim',
            name: '管理员修坯',
            pre: '成型',
            oper: '生产管理员',
            state: 'Trimed',
            desc: '已修坯',
            url: '',
        },
        glaze: {
            text: 'glaze',
            name: '喷釉',
            pre: '修坯',
            oper: '喷釉工',
            state: 'Glazed',
            desc: '已喷釉',
            url: '/terminals/job/glazing',
        },
        reglaze: {
            text: 'reglaze',
            name: '颜色更换',
            pre: '喷釉',
            oper: '喷釉工',
            state: 'Glazed',
            desc: '已喷釉',
            url: '',
        },
        grind: {
            text: 'grind',
            name: '刮脚',
            pre: '喷釉',
            oper: '刮脚工',
            state: 'Ground',
            desc: '已刮脚',
            url: '/terminals/job/grinding',
        },
        load: {
            text: 'load',
            name: '登窑',
            pre: '刮脚',
            oper: '登窑工',
            state: 'Loaded',
            desc: '已登窑',
            url: '/terminals/job/loading',
        },
        unload: {
            text: 'unload',
            name: '退出',
            pre: '登窑',
            oper: '登窑工',
            state: 'Ground',
            desc: '已刮脚',
            url: '',
        },
        fire: {
            text: 'fire',
            name: '窑烧',
            pre: '登窑',
            oper: '烧火工',
            state: 'Fired',
            desc: '已窑烧',
            url: '',
        },
        draw: {
            text: 'draw',
            name: '卸窑',
            pre: '窑烧',
            oper: '',
            state: 'Drawed',
            desc: '已卸窑',
            url: '',
        },
        undo: {
            text: 'undo',
            name: '反扫码',
            state: 'Defective',
            desc: '有缺陷',
            url: '',
        },
        qc: {
            text: 'qc',
            name: '质检',
            oper: '质检员',
            state: 'Checked',
            desc: '优等品',
            url: '/terminals/qc',
        },
        wgqc: {
            text: 'wgqc',
            name: '外购质检',
            oper: '质检员',
            state: 'Checked',
            desc: '优等品',
            url: '/terminals/qc',
        },
        wxqc: {
            text: 'wxqc',
            name: '外协质检',
            oper: '质检员',
            state: 'Checked',
            desc: '优等品',
            url: '/terminals/qc',
        },
        pass: {
            text: 'pass',
            name: '等外',
            state: 'NG',
            desc: '等外品',
            url: '',
        },
        reject: {
            text: 'reject',
            name: '缺陷',
            state: 'Defective',
            desc: '有缺陷',
            url: '',
        },
        suspend: {
            text: 'suspend',
            name: '暂缓',
            state: 'Suspending',
            desc: '已隔离',
            url: '',
        },
        renew: {
            text: 'renew',
            name: '返修',
            state: 'Renewed',
            desc: '已返修',
            url: '',
        },
        repair: {
            text: 'repair',
            name: '修复',
            state: 'Repaired',
            desc: '已修复',
            url: '/terminals/repair',
        },
        recovery: {
            text: 'recovery',
            name: '恢复',
            state: 'OK',
            desc: '再检优等品',
            url: '',
        },
        edge: {
            text: 'edge',
            name: '磨边',
            oper: '磨边工',
            state: 'Edged',
            desc: '已磨边',
            url: '/terminals/edging',
        },
        scrap: {
            text: 'scrap',
            name: '报废',
            state: 'Scraped',
            desc: '已报废',
            url: '',
        },
        pqc: {
            text: 'pqc',
            name: '装检',
            state: 'OK',
            desc: '优等品',
            url: '',
        },
        pack: {
            text: 'pack',
            name: '包装',
            oper: '包装工',
            state: 'Packed',
            desc: '已包装',
            url: '/terminals/packing',
        },
        packcarrier: {
            text: 'packcarrier',
            name: '包材包装',
            oper: '包装工',
            state: 'PackedCarrier',
            desc: '已包装',
            url: '',
        },
        unpack: {
            text: 'unpack',
            name: '退包',
            pre: '包装',
            oper: '包装工',
            state: 'Checked',
            desc: '优等品',
            url: '',
        },
        palletize: {
            text: 'palletize',
            name: '打托',
            oper: '包装工',
            state: 'Palletized',
            desc: '已打托',
            url: '/terminals/palletizing',
        },
        palletizecarrier: {
            text: 'palletizecarrier',
            name: '包材打托',
            oper: '包装工',
            state: 'PalletizedCarrier',
            desc: '已打托',
            url: '',
        },
        unpalletize: {
            text: 'unpalletize',
            name: '退托',
            pre: '打托',
            oper: '包装工',
            state: 'Packed',
            desc: '已包装',
            url: '',
        },
        trunk: {
            text: 'trunk',
            name: '装车',
            oper: '包装工',
            state: 'Trunked',
            desc: '已装车',
            url: '/terminals/trunking',
        },
        replace: {
            text: 'replace',
            name: '坯体替换',
            state: '',
            desc: '已替换',
            url: '',
        },
        track: {
            text: 'track',
            name: '巡检',
            state: '',
            desc: '',
            url: '/terminals/track',
        },
        gc: {
            text: 'gc',
            name: '配釉检测',
            state: '',
            desc: '',
            url: '/terminals/gc',
        },
        idle: {
            text: 'idle',
            name: '停滞',
            state: 'Idle',
            desc: '已停滞',
            url: '',
        },
        inventory: {
            text: 'inventory',
            name: '盘点',
            state: 'Inventoried',
            desc: '已盘点',
            url: '/terminals/inventory',
        },
        invqc: {
            text: 'invqc',
            name: '优等盘点',
            state: 'Checked',
            desc: '优等品',
            url: ''
        },
        invpass: {
            text: 'invpass',
            name: '等外盘点',
            state: 'NG',
            desc: '等外品',
            url: '',
        },
        invscrap: {
            text: 'invscrap',
            name: '报废盘点',
            state: 'Scraped',
            desc: '已报废',
            url: '',
        },
    };
    MaterialData = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], MaterialData);
    return MaterialData;
}());

//设备静态数据
var EquipData = /** @class */ (function () {
    function EquipData() {
    }
    //设备状态
    EquipData.statuses = ['正常运行', '故障', '正常停机'];
    //设备维护操作名称
    EquipData.ops = ['维修', '保养'];
    /**
   * [窑炉终端的PLC数采数据的的参数对应表]
   * @type {Object}
   */
    EquipData.plcKiln = {
        kiln1: {
            text: '窑炉1#',
            table: 'kiln1_data',
            WKFL: {
                name: '燃气工况流量',
                para: 'kiln_data.kiln_saPLC.1WKFL',
                unit: 'm³/h',
                desc: '采集自燃气表'
            },
            STFL: {
                name: '燃气标况流量',
                para: 'kiln_data.kiln_saPLC.1STFL',
                unit: 'm³/h',
                desc: '采集自燃气表'
            },
            SP2W: {
                name: '风机压力',
                para: 'kiln_data.kiln_saPLC.1SP2W',
                unit: 'kPa',
                desc: '*60/27648'
            },
            SP1G: {
                name: '燃气压力',
                para: 'kiln_data.kiln_saPLC.1SP1G',
                unit: 'kPa',
                desc: '*60/27648'
            },
            PT4: {
                name: '温度4',
                para: 'kiln_data.kiln_saPLC.1PT4',
                unit: '℃',
                desc: '*1600/27648'
            },
            PT3: {
                name: '温度3',
                para: 'kiln_data.kiln_saPLC.1PT3',
                unit: '℃',
                desc: '*1600/27648'
            },
            PT2: {
                name: '温度2',
                para: 'kiln_data.kiln_saPLC.1PT2',
                unit: '℃',
                desc: '*1600/27648'
            },
            PT1: {
                name: '温度1',
                para: 'kiln_data.kiln_saPLC.1PT1',
                unit: '℃',
                desc: '*1600/27648'
            },
            GTOTAL: {
                name: '燃气总量',
                para: 'kiln_data.kiln_saPLC.1GTOTAL',
                unit: 'm³',
                desc: '采集自燃气表'
            },
            GSTP: {
                name: '燃气温度',
                para: 'kiln_data.kiln_saPLC.1GSTP',
                unit: '℃',
                desc: '采集自燃气表'
            },
            GSPR: {
                name: '燃气压力',
                para: 'kiln_data.kiln_saPLC.1GSPR',
                unit: 'kPa',
                desc: '采集自燃气表'
            },
            FRQ: {
                name: '风机频率',
                para: 'kiln_data.kiln_saPLC.1FRQ',
                unit: 'Hz',
                desc: '*50/27648'
            },
        },
        kiln2: {
            text: '窑炉2#',
            table: 'kiln2_data',
            WKFL: {
                name: '燃气工况流量',
                para: 'kiln_data.kiln_saPLC.2WKFL',
                unit: 'm³/h',
                desc: '采集自燃气表'
            },
            STFL: {
                name: '燃气标况流量',
                para: 'kiln_data.kiln_saPLC.2STFL',
                unit: 'm³/h',
                desc: '采集自燃气表'
            },
            SP2W: {
                name: '风机压力',
                para: 'kiln_data.kiln_saPLC.2SP2W',
                unit: 'kPa',
                desc: '*60/27648'
            },
            SP1G: {
                name: '燃气压力',
                para: 'kiln_data.kiln_saPLC.2SP1G',
                unit: 'kPa',
                desc: '*60/27648'
            },
            PT4: {
                name: '温度4',
                para: 'kiln_data.kiln_saPLC.2PT4',
                unit: '℃',
                desc: '*1600/27648'
            },
            PT3: {
                name: '温度3',
                para: 'kiln_data.kiln_saPLC.2PT3',
                unit: '℃',
                desc: '*1600/27648'
            },
            PT2: {
                name: '温度2',
                para: 'kiln_data.kiln_saPLC.2PT2',
                unit: '℃',
                desc: '*1600/27648'
            },
            PT1: {
                name: '温度1',
                para: 'kiln_data.kiln_saPLC.2PT1',
                unit: '℃',
                desc: '*1600/27648'
            },
            GTOTAL: {
                name: '燃气总量',
                para: 'kiln_data.kiln_saPLC.2GTOTAL',
                unit: 'm³',
                desc: '采集自燃气表'
            },
            GSTP: {
                name: '燃气温度',
                para: 'kiln_data.kiln_saPLC.2GSTP',
                unit: '℃',
                desc: '采集自燃气表'
            },
            GSPR: {
                name: '燃气压力',
                para: 'kiln_data.kiln_saPLC.2GSPR',
                unit: 'kPa',
                desc: '采集自燃气表'
            },
            FRQ: {
                name: '风机频率',
                para: 'kiln_data.kiln_saPLC.2FRQ',
                unit: 'Hz',
                desc: '*50/27648'
            },
        },
        kiln3: {
            text: '窑炉3#',
            table: 'kiln_data1106',
            WKFL: {
                name: '燃气工况流量',
                para: 'kiln_data.kiln_saPLC.3WKFL',
                unit: 'm³/h',
                desc: '采集自燃气表'
            },
            STFL: {
                name: '燃气标况流量',
                para: 'kiln_data.kiln_saPLC.3STFL',
                unit: 'm³/h',
                desc: '采集自燃气表'
            },
            SP2W: {
                name: '风机压力',
                para: 'kiln_data.kiln_saPLC.3SP2W',
                unit: 'kPa',
                desc: '*60/27648'
            },
            SP1G: {
                name: '燃气压力',
                para: 'kiln_data.kiln_saPLC.3SP1G',
                unit: 'kPa',
                desc: '*60/27648'
            },
            PT4: {
                name: '温度4',
                para: 'kiln_data.kiln_saPLC.3PT4',
                unit: '℃',
                desc: '*1600/27648'
            },
            PT3: {
                name: '温度3',
                para: 'kiln_data.kiln_saPLC.3PT3',
                unit: '℃',
                desc: '*1600/27648'
            },
            PT2: {
                name: '温度2',
                para: 'kiln_data.kiln_saPLC.3PT2',
                unit: '℃',
                desc: '*1600/27648'
            },
            PT1: {
                name: '温度1',
                para: 'kiln_data.kiln_saPLC.3PT1',
                unit: '℃',
                desc: '*1600/27648'
            },
            GTOTAL: {
                name: '燃气总量',
                para: 'kiln_data.kiln_saPLC.3GTOTAL',
                unit: 'm³',
                desc: '采集自燃气表'
            },
            GSTP: {
                name: '燃气温度',
                para: 'kiln_data.kiln_saPLC.3GSTP',
                unit: '℃',
                desc: '采集自燃气表'
            },
            GSPR: {
                name: '燃气压力',
                para: 'kiln_data.kiln_saPLC.3GSPR',
                unit: 'kPa',
                desc: '采集自燃气表'
            },
            FRQ: {
                name: '风机频率',
                para: 'kiln_data.kiln_saPLC.3FRQ',
                unit: 'Hz',
                desc: '*50/27648'
            },
        },
        weather: {
            text: '厂外环境',
            table: 'weather_data1109',
            TEMP: {
                name: '厂外实时温度',
                para: 'kiln_data.kiln_saPLC.TEMP',
                unit: '℃',
                desc: '/10'
            },
            DIR: {
                name: '厂外实时风向',
                para: 'kiln_data.kiln_saPLC.WIND_DIR',
                unit: '°',
                desc: '25为西风、115为北风、205为东风、295为南风、25-115之间为西北风、115-205之间为东北风、205-295之间为东南风、0-25和295-360之间为西南风'
            },
            SPD: {
                name: '厂外实时风速',
                para: 'kiln_data.kiln_saPLC.WIND_SPD',
                unit: 'm/s',
                desc: '/10'
            },
            HUMI: {
                name: '厂外实时湿度',
                para: 'kiln_data.kiln_saPLC.HUMI',
                unit: '%RH',
                desc: '/10'
            },
            PRES: {
                name: '厂外实时大气压强',
                para: 'kiln_data.kiln_saPLC.PRES',
                unit: 'hPa',
                desc: '/10'
            },
            RAIN: {
                name: '雨量',
                para: 'kiln_data.kiln_saPLC.RAIFALL',
                unit: 'mm',
                desc: '/10'
            },
        }
    };
    return EquipData;
}());

//操作相关数据
var WorkData = /** @class */ (function () {
    function WorkData() {
    }
    //员工使用类型
    /**
     * [员工适用类型
     * allocated: 安排工作
     * move: 搬坯]
     * @type {Array}
     */
    WorkData.personnelUses = ['allocated', 'move'];
    //设备使用类型
    WorkData.equipmentUses = ['allocated', 'maintenance'];
    //设备维护类型
    WorkData.mtypes = ['维护', '修理', '校准', '报废'];
    //能力类型
    WorkData.capTypes = ['used', 'unused', 'total', 'available', 'unattainable', 'committed'];
    //操作类型或者作业类型
    WorkData.opTypes = ['Production', 'Maintenance', 'Quality', 'Inventory', 'Mixed', 'Other'];
    //KPI参数
    WorkData.trend = ['Higher-is-better', 'Lower-is-better', 'Other', ''];
    WorkData.timing = ['Real-time', 'Periodically', 'On-demand', 'Other', ''];
    WorkData.audience = ['Operator', 'Supervisor', 'Management', ''];
    WorkData.prodMethodology = ['Batch', 'Continuous', 'Discrete', 'Other', ''];
    /**
     * [工单运行命令集]
     * @type {Object}
     */
    WorkData.JobCmds = {
        start: {
            text: 'start',
            name: '开工',
            state: 'Running',
            post: 'hold',
            desc: '运行中',
        },
        complete: {
            text: 'complete',
            name: '完工',
            state: 'Completed',
            post: '',
            desc: '已完工',
        },
        stop: {
            text: 'stop',
            name: '停止',
            state: 'Stopped',
            post: 'reset',
            desc: '已停止',
        },
        hold: {
            text: 'hold',
            name: '暂停',
            state: 'Held',
            post: 'restart',
            desc: '已暂停',
        },
        restart: {
            text: 'restart',
            name: '继续',
            state: 'Running',
            post: 'hold',
            desc: '运行中',
        },
        abort: {
            text: 'abort',
            name: '中止',
            state: 'Aborted',
            post: 'reset',
            desc: '已中止',
        },
        reset: {
            text: 'reset',
            name: '重置',
            state: 'Ready',
            post: 'start',
            desc: '已准备',
        },
        pause: {
            text: 'pause',
            name: '中断',
            state: 'Paused',
            post: 'resume',
            desc: '已中断',
        },
        resume: {
            text: 'resume',
            name: '恢复',
            state: 'Running',
            post: 'pause',
            desc: '运行中',
        },
    };
    //工单或操作的状态，在原有文本的基础上，增加其他字段，方便统一替换或统一管理
    WorkData.WorkStates = {
        Ready: {
            text: 'Ready',
            status: 'info',
            txtClass: 'text-info',
        },
        Running: {
            text: 'Running',
            status: 'primary',
            txtClass: 'text-primary'
        },
        Completed: {
            text: 'Completed',
            status: 'success',
            txtClass: 'text-success'
        },
        Stopped: {
            text: 'Stopped',
            status: 'danger',
            txtClass: 'text-danger'
        },
        Held: {
            text: 'Held',
            status: 'warning',
            txtClass: 'text-warning'
        },
        Paused: {
            text: 'Paused',
            status: 'warning',
            txtClass: 'text-warning'
        },
        Aborted: {
            text: 'Aborted',
            status: 'info',
            txtClass: 'text-info'
        }
    };
    //工单的分配状态
    //Received：已收到，但未排产
    //Forecast：预排产
    //Released：已排产
    WorkData.dispatchStatus = ['Received', 'Forecast', 'Released'];
    //请求状态
    WorkData.reqStates = ['Forecast', 'Released', 'Distributed'];
    //报警处理状态
    WorkData.alertStates = ['To be processed', 'Processing', 'Processed', 'Not processed yet'];
    //计划状态
    WorkData.scheduleStates = ['Forecast', 'Released', ''];
    //可执行的命令
    WorkData.commands = ['start', 'complete', 'stop', 'hold', 'restart', 'abort',
        'reset', 'pause', 'resume', ''];
    //所有工序之间的可能存在的依赖关系
    WorkData.dependencies = ['NotFollow', 'PossibleParallel', 'NotInParallel',
        'AtStart', 'AfterStart', 'AfterEnd', 'NoLaterAfterStart',
        'NoEarlierAfterStart', 'NoLaterAfterEnd', 'NoEarlierAfterEnd', 'Other', ''];
    return WorkData;
}());

var TableSettings = /** @class */ (function () {
    function TableSettings() {
    }
    TableSettings.getPspecColumns = function () {
        return TableSettings.pColumns;
    };
    TableSettings.getEspecColumns = function () {
        return TableSettings.eColumns;
    };
    TableSettings.getMspecColumns = function () {
        return TableSettings.mColumns;
    };
    TableSettings.getProdspecColumns = function () {
        var cols = __assign({}, TableSettings.mColumns);
        cols['para'] = {
            title: '颜色',
            type: 'string',
            valuePrepareFunction: function (para, row) {
                var color = row.para ? row.para.find(function (item) { return item.oid === '颜色'; }) : undefined;
                return color ? color.value.valueStr : '';
            },
        };
        return cols;
    };
    TableSettings.getPopColumns = function () {
        var cols = __assign({}, TableSettings.pColumns);
        cols['hs'] = {
            title: '层级结构',
            type: 'string',
            valuePrepareFunction: function (hs, row) {
                return row.hs ? row.hs.name + " [" + row.hs.level + "]" : '';
            },
            filterFunction: function (value, search) {
                return (value.name && value.name.toString().toLowerCase().includes(search.toString().toLowerCase())) ||
                    (value.level && value.level.toString().toLowerCase().includes(search.toString().toLowerCase()));
            }
        },
            cols['pclass'] = {
                title: '员工类型',
                type: 'string',
                valuePrepareFunction: function (pclass, row) {
                    return row.pclass ? row.pclass.oid : '';
                },
                filterFunction: function (value, search) {
                    return value.oid && value.oid.toString().toLowerCase().includes(search.toString().toLowerCase());
                }
            };
        return cols;
    };
    TableSettings.getEopColumns = function () {
        var cols = __assign({}, TableSettings.eColumns);
        cols['hs'] = {
            title: '层级结构',
            type: 'string',
            valuePrepareFunction: function (hs, row) {
                return row.hs ? row.hs.name + " [" + row.hs.level + "]" : '';
            },
            filterFunction: function (value, search) {
                return (value.name && value.name.toString().toLowerCase().includes(search.toString().toLowerCase())) ||
                    (value.level && value.level.toString().toLowerCase().includes(search.toString().toLowerCase()));
            }
        };
        return cols;
    };
    TableSettings.getMopColumns = function () {
        var cols = __assign({}, TableSettings.mColumns);
        cols['lot'] = {
            title: '批次',
            type: 'string',
            valuePrepareFunction: function (lot, row) {
                return row.lot ? row.lot.oid : '';
            },
            filterFunction: function (value, search) {
                return value.oid && value.oid.toString().toLowerCase().includes(search.toString().toLowerCase());
            }
        };
        cols['subLot'] = {
            title: '子批次',
            type: 'string',
            valuePrepareFunction: function (subLot, row) {
                return row.subLot ? row.subLot.oid : '';
            },
            filterFunction: function (value, search) {
                return value.oid && value.oid.toString().toLowerCase().includes(search.toString().toLowerCase());
            }
        };
        cols['mclass'] = {
            title: '物料类型',
            type: 'string',
            valuePrepareFunction: function (mclass, row) {
                return row.mclass ? row.mclass.oid : '';
            },
            filterFunction: function (value, search) {
                return value.oid && value.oid.toString().toLowerCase().includes(search.toString().toLowerCase());
            }
        },
            cols['hs'] = {
                title: '层级结构',
                type: 'string',
                valuePrepareFunction: function (hs, row) {
                    return row.hs ? row.hs.name + " [" + row.hs.level + "]" : '';
                },
                filterFunction: function (value, search) {
                    return (value.name && value.name.toString().toLowerCase().includes(search.toString().toLowerCase())) ||
                        (value.level && value.level.toString().toLowerCase().includes(search.toString().toLowerCase()));
                }
            };
        return cols;
    };
    TableSettings.getPcapColumns = function () {
        var cols = TableSettings.getPopColumns();
        cols['capType'] = {
            title: '能力类型',
            type: 'string',
        };
        cols['reason'] = {
            title: '原因',
            type: 'string',
        };
        cols['conFactor'] = {
            title: '可信度',
            type: 'number',
        };
        cols['startTime'] = {
            title: '起始时间',
            type: 'date',
        };
        cols['endTime'] = {
            title: '结束时间',
            type: 'date',
        };
        return cols;
    };
    TableSettings.getEcapColumns = function () {
        var cols = TableSettings.getEopColumns();
        cols['capType'] = {
            title: '能力类型',
            type: 'string',
        };
        cols['reason'] = {
            title: '原因',
            type: 'string',
        };
        cols['conFactor'] = {
            title: '可信度',
            type: 'number',
        };
        cols['startTime'] = {
            title: '起始时间',
            type: 'date',
        };
        cols['endTime'] = {
            title: '结束时间',
            type: 'date',
        };
        return cols;
    };
    TableSettings.getMcapColumns = function () {
        var cols = TableSettings.getMopColumns();
        cols['capType'] = {
            title: '能力类型',
            type: 'string',
        };
        cols['reason'] = {
            title: '原因',
            type: 'string',
        };
        cols['conFactor'] = {
            title: '可信度',
            type: 'number',
        };
        cols['startTime'] = {
            title: '起始时间',
            type: 'date',
        };
        cols['endTime'] = {
            title: '结束时间',
            type: 'date',
        };
        return cols;
    };
    TableSettings.getCapPropColumns = function () {
        var cols = __assign({}, TableSettings.opPropColumns);
        cols['quantity'] = {
            title: '时长',
            type: 'string',
            valuePrepareFunction: function (quantity, row) {
                return row.quantity ? row.quantity.quantity + row.quantity.unit : '';
            },
        };
        return cols;
    };
    //ng2-smart-table的Settings，在界面风格不变的情况下，这些是不变的
    TableSettings.basic = {
        actions: {
            columnTitle: '操作',
            add: true,
            edit: true,
            delete: true,
        },
        noDataMessage: '暂时未有相关属性。',
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
        },
        mode: 'external',
        selectMode: '',
        columns: {},
        pager: {
            display: true,
            perPage: 10
        }
    };
    TableSettings.editBasic = {
        actions: {
            columnTitle: '操作',
            add: false,
            edit: true,
            delete: false,
        },
        noDataMessage: '暂时未有相关属性。',
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        mode: 'external',
        selectMode: '',
        columns: {},
        pager: {
            display: true,
            perPage: 10
        }
    };
    //ng2-smart-table 的弹出窗口呈现模式
    TableSettings.exMode = 'external';
    TableSettings.inMode = 'inline';
    //员工列呈现属性
    TableSettings.pColumns = {
        oid: {
            title: '规格名称',
            type: 'string',
        },
        desc: {
            title: '描述',
            type: 'string',
        },
        pclass: {
            title: '员工类型',
            type: 'string',
            valuePrepareFunction: function (pclass, row) {
                return row.pclass ? row.pclass.oid : '';
            },
            filterFunction: function (value, search) {
                return value.oid && value.oid.toString().toLowerCase().includes(search.toString().toLowerCase());
            }
        },
        person: {
            title: '员工',
            type: 'string',
            valuePrepareFunction: function (person, row) {
                return row.person ? row.person.oid : '';
            },
            filterFunction: function (value, search) {
                return value.oid && value.oid.toString().toLowerCase().includes(search.toString().toLowerCase());
            }
        },
        use: {
            title: '使用类型',
            type: 'string',
        },
        qty: {
            title: '数量',
            type: 'string',
            valuePrepareFunction: function (qty, row) {
                return row.qty ? "" + row.qty.quantity + row.qty.unit : '';
            },
            filterFunction: function (value, search) {
                return value.quantity && value.unit &&
                    ("" + value.quantity + value.unit).toString().toLowerCase().includes(search.toString().toLowerCase());
            }
        },
    };
    TableSettings.jobResColumns = {
        oid: {
            title: 'ID',
            type: 'string',
        },
        desc: {
            title: '描述',
            type: 'string',
        },
        workType: {
            title: '类型',
            type: 'string',
        },
        hs: {
            title: '层级结构',
            type: 'string',
            valuePrepareFunction: function (hs, row) {
                return row.hs ? row.hs.name + " [" + row.hs.level + "]" : '';
            },
        },
        qty: {
            title: '数量',
            type: 'string',
            valuePrepareFunction: function (qty, row) {
                return row.qty && row.qty.quantity ? row.qty.quantity + row.qty.unit : '';
            },
        },
        startTime: {
            title: '起始时间',
            type: 'string',
            valuePrepareFunction: function (startTime, row) {
                return row.startTime ? new Date(row.startTime).toLocaleDateString('zh', UtilData.longDateOpt) : '';
            },
        },
        endTime: {
            title: '结束时间',
            type: 'string',
            valuePrepareFunction: function (endTime, row) {
                return row.endTime ? new Date(row.endTime).toLocaleDateString('zh', UtilData.longDateOpt) : '';
            },
        },
        jobState: {
            title: '状态',
            type: 'string',
        },
    };
    TableSettings.segResColumns = {
        oid: {
            title: '名称',
            type: 'string',
        },
        actSTime: {
            title: '实际起时',
            type: 'string',
            valuePrepareFunction: function (actSTime, row) {
                return row.actSTime ?
                    new Date(row.actSTime).toLocaleDateString('zh', UtilData.longDateOpt) : '';
            },
        },
        actETime: {
            title: '实际终时',
            type: 'string',
            valuePrepareFunction: function (actETime, row) {
                return row.actETime ?
                    new Date(row.actETime).toLocaleDateString('zh', UtilData.longDateOpt) : '';
            },
        },
        state: {
            title: '段响应状态',
            type: 'string',
        },
        jobResponse: {
            title: '工单执行',
            type: 'html',
            valuePrepareFunction: function (jobResponse, row) {
                return row.jobResponse ?
                    "<a href=\"/#/pages/works/jobresponse/" + row.jobResponse._id + "\" routerLinkActive=\"active\">" + row.jobResponse.oid + "</a>" : '';
            }
        }
    };
    //设备列呈现属性
    TableSettings.eColumns = {
        oid: {
            title: '规格名称',
            type: 'string',
        },
        desc: {
            title: '描述',
            type: 'string',
        },
        eclass: {
            title: '设备类型',
            type: 'string',
            valuePrepareFunction: function (eclass, row) {
                return row.eclass ? row.eclass.oid : '';
            },
            filterFunction: function (value, search) {
                return value.oid && value.oid.toString().toLowerCase().includes(search.toString().toLowerCase());
            }
        },
        equipment: {
            title: '设备',
            type: 'string',
            valuePrepareFunction: function (equipment, row) {
                return row.equipment ? row.equipment.oid : '';
            },
            filterFunction: function (value, search) {
                return value.oid && value.oid.toString().toLowerCase().includes(search.toString().toLowerCase());
            }
        },
        use: {
            title: '使用类型',
            type: 'string',
        },
        qty: {
            title: '数量',
            type: 'string',
            valuePrepareFunction: function (qty, row) {
                return row.qty ? "" + row.qty.quantity + row.qty.unit : '';
            },
            filterFunction: function (value, search) {
                return value.quantity && value.unit &&
                    ("" + value.quantity + value.unit).toString().toLowerCase().includes(search.toString().toLowerCase());
            }
        },
    };
    //物料列呈现属性，只包含了'物料类型'和'物料', 没有包含‘物料批次’和‘物料子批次’
    TableSettings.mColumns = {
        oid: {
            title: '规格名称',
            type: 'string',
        },
        desc: {
            title: '描述',
            type: 'string',
        },
        mclass: {
            title: '物料类型',
            type: 'string',
            valuePrepareFunction: function (mclass, row) {
                return row.mclass ? row.mclass.oid : '';
            },
            filterFunction: function (value, search) {
                return value && value.length > 0 &&
                    value.oid && value.oid.toString().toLowerCase().includes(search.toString().toLowerCase());
            }
        },
        mdef: {
            title: '物料',
            type: 'string',
            valuePrepareFunction: function (mdef, row) {
                return row.mdef ? row.mdef.oid : '';
            },
            filterFunction: function (value, search) {
                return value.oid && value.oid.toString().toLowerCase().includes(search.toString().toLowerCase());
            }
        },
        use: {
            title: '使用类型',
            type: 'string',
        },
        qty: {
            title: '数量',
            type: 'string',
            valuePrepareFunction: function (qty, row) {
                return row.qty ? row.qty.quantity + row.qty.unit : '';
            },
            filterFunction: function (value, search) {
                return value.quantity && value.unit &&
                    ("" + value.quantity + value.unit).toString().toLowerCase().includes(search.toString().toLowerCase());
            }
        },
    };
    //参数列属性
    TableSettings.resPropColumns = {
        oid: {
            title: '名称',
            type: 'string',
        },
        desc: {
            title: '描述',
            type: 'string',
        },
        value: {
            title: '值',
            type: 'string',
            valuePrepareFunction: function (value, row) {
                return row.value ? row.value.valueStr + row.value.unit : '';
            },
        },
        active: {
            title: '可用',
            filter: {
                type: 'checkbox',
                config: {
                    true: 'true',
                    false: 'false',
                    resetText: '重置',
                },
            },
            editor: {
                type: 'checkbox',
            }
        },
    };
    //属性列属性
    TableSettings.opPropColumns = {
        oid: {
            title: '名称',
            type: 'string',
        },
        desc: {
            title: '描述',
            type: 'string',
        },
        value: {
            title: '值',
            type: 'string',
            valuePrepareFunction: function (value, row) {
                return row.value ? row.value.valueStr + row.value.unit : '';
            },
        },
        qty: {
            title: '数量',
            type: 'string',
            valuePrepareFunction: function (qty, row) {
                return row.qty ? row.qty.quantity + row.qty.unit : '';
            },
        },
        active: {
            title: '可用',
            filter: {
                type: 'checkbox',
                config: {
                    true: 'true',
                    false: 'false',
                    resetText: '重置',
                },
            },
            editor: {
                type: 'checkbox',
            }
        },
    };
    return TableSettings;
}());

//ID通用的比较函数，没有特别指明，就用该函数作为 Object 的比较函数
function IDCmpFn(o1, o2) {
    return o1 && o2 && o1._id && o2._id ? o1._id === o2._id : o1 == o2;
}
//OID通用的比较函数，没有特别指明，就用该函数作为 Object 的比较函数
function OIDCmpFn(o1, o2) {
    return o1 && o2 && o1.oid && o2.oid ? o1.oid === o2.oid : o1 == o2;
}
function NameCmpFn(o1, o2) {
    return o1 && o2 && o1.name && o2.name ? o1.name === o2.name : o1 == o2;
}
function winSize() {
    //获取浏览器窗口的可视区域的高度
    var height = document.body.clientHeight;
    var ssize;
    //根据高度大小确定弹窗的大小
    if (height > 816) {
        ssize = 'xxlarge';
    }
    else if (height > 696) {
        ssize = 'xlarge';
    }
    else if (height > 576) {
        ssize = 'large';
    }
    else {
        ssize = 'medium';
    }
    return ssize;
}


/***/ }),

/***/ "./app/app-routing.module.tns.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var nativescript_angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/nativescript-angular/router/index.js");
/* harmony import */ var nativescript_angular_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mobileTerminal_mobile_pages_login_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./app/mobileTerminal/mobile-pages/login/user.service.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./app/mobileTerminal/mobile-pages/login/login.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_barcodescanner_barcodescanner_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./app/mobileTerminal/mobile-pages/barcodescanner/barcodescanner.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_home_home_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./app/mobileTerminal/mobile-pages/home/home.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_localnotification_localnotification_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./app/mobileTerminal/mobile-pages/localnotification/localnotification.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_workalert_workalert_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./app/mobileTerminal/mobile-pages/workalert/workalert.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_workalert_workalert_detail_workalert_detail_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./app/mobileTerminal/mobile-pages/workalert/workalert-detail/workalert-detail.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_productionManagement_pmHome_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./app/mobileTerminal/mobile-pages/productionManagement/pmHome.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_equipmentManagement_emHome_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./app/mobileTerminal/mobile-pages/equipmentManagement/emHome.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_warningManagement_wmHome_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./app/mobileTerminal/mobile-pages/warningManagement/wmHome.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_workOrderOverview_workOrderOverview_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_workOrderOverview_workOrderOverview_detail_work_res_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview-detail/work-res.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var routes = [
    {
        path: '',
        redirectTo: _mobileTerminal_mobile_pages_login_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"].isUserLoggedIn() ? '/home' : '/login',
        pathMatch: 'full',
    },
    { path: "login", component: _mobileTerminal_mobile_pages_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] },
    { path: "home", component: _mobileTerminal_mobile_pages_home_home_component__WEBPACK_IMPORTED_MODULE_5__["HomeComponent"] },
    { path: "pmHome", component: _mobileTerminal_mobile_pages_productionManagement_pmHome_component__WEBPACK_IMPORTED_MODULE_9__["PmHomeComponent"] },
    { path: "emHome", component: _mobileTerminal_mobile_pages_equipmentManagement_emHome_component__WEBPACK_IMPORTED_MODULE_10__["EmHomeComponent"] },
    { path: "wmHome", component: _mobileTerminal_mobile_pages_warningManagement_wmHome_component__WEBPACK_IMPORTED_MODULE_11__["WmHomeComponent"] },
    { path: "workOrderOverview", component: _mobileTerminal_mobile_pages_workOrderOverview_workOrderOverview_component__WEBPACK_IMPORTED_MODULE_12__["WorkOrderOverviewComponent"] },
    { path: "workOrderOverview/work-res/:oid", component: _mobileTerminal_mobile_pages_workOrderOverview_workOrderOverview_detail_work_res_component__WEBPACK_IMPORTED_MODULE_13__["WorkResComponent"] },
    { path: "barcodescanner", component: _mobileTerminal_mobile_pages_barcodescanner_barcodescanner_component__WEBPACK_IMPORTED_MODULE_4__["BarcodescannerComponent"] },
    { path: "localnotification", component: _mobileTerminal_mobile_pages_localnotification_localnotification_component__WEBPACK_IMPORTED_MODULE_6__["LocalnotificationComponent"] },
    { path: "workalert", component: _mobileTerminal_mobile_pages_workalert_workalert_component__WEBPACK_IMPORTED_MODULE_7__["WorkalertComponent"] },
    { path: "workalert/workalert-detail/:_id", component: _mobileTerminal_mobile_pages_workalert_workalert_detail_workalert_detail_component__WEBPACK_IMPORTED_MODULE_8__["WorkalertDetailComponent"], data: { _id: '123', name: '小六' } },
    { path: '**', component: _mobileTerminal_mobile_pages_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [nativescript_angular_router__WEBPACK_IMPORTED_MODULE_1__["NativeScriptRouterModule"].forRoot(routes)],
            exports: [nativescript_angular_router__WEBPACK_IMPORTED_MODULE_1__["NativeScriptRouterModule"]],
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- https://docs.nativescript.org/angular/core-concepts/angular-navigation.html#page-router-outlet -->\r\n<page-router-outlet></page-router-outlet>\r\n"

/***/ }),

/***/ "./app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-app',
            template: __webpack_require__("./app/app.component.html"),
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var nativescript_angular_nativescript_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/nativescript-angular/nativescript.module.js");
/* harmony import */ var nativescript_angular_nativescript_module__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular_nativescript_module__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_routing_module_tns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./app/app-routing.module.tns.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./app/app.component.ts");
/* harmony import */ var _auto_generated_auto_generated_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./app/auto-generated/auto-generated.component.ts");
/* harmony import */ var nativescript_angular_http_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../node_modules/nativescript-angular/http-client/index.js");
/* harmony import */ var nativescript_angular_http_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular_http_client__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mobileTerminal_mobile_pages_login_login_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./app/mobileTerminal/mobile-pages/login/login.component.ts");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../node_modules/nativescript-angular/index.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mobileTerminal_mobile_pages_login_user_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./app/mobileTerminal/mobile-pages/login/user.service.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_barcodescanner_barcodescanner_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./app/mobileTerminal/mobile-pages/barcodescanner/barcodescanner.component.ts");
/* harmony import */ var nativescript_ui_sidedrawer_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../node_modules/nativescript-ui-sidedrawer/angular/side-drawer-directives.js");
/* harmony import */ var nativescript_ui_sidedrawer_angular__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_sidedrawer_angular__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var nativescript_ui_listview_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("../node_modules/nativescript-ui-listview/angular/listview-directives.js");
/* harmony import */ var nativescript_ui_listview_angular__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_listview_angular__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var nativescript_ui_calendar_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("../node_modules/nativescript-ui-calendar/angular/calendar-directives.js");
/* harmony import */ var nativescript_ui_calendar_angular__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_calendar_angular__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var nativescript_ui_chart_angular__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("../node_modules/nativescript-ui-chart/angular/chart-directives.js");
/* harmony import */ var nativescript_ui_chart_angular__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_chart_angular__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var nativescript_ui_dataform_angular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("../node_modules/nativescript-ui-dataform/angular/dataform-directives.js");
/* harmony import */ var nativescript_ui_dataform_angular__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_dataform_angular__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var nativescript_ui_autocomplete_angular__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("../node_modules/nativescript-ui-autocomplete/angular/autocomplete-directives.js");
/* harmony import */ var nativescript_ui_autocomplete_angular__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_autocomplete_angular__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var nativescript_ui_gauge_angular__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("../node_modules/nativescript-ui-gauge/angular/gauges-directives.js");
/* harmony import */ var nativescript_ui_gauge_angular__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_gauge_angular__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var nativescript_angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("../node_modules/nativescript-angular/common.js");
/* harmony import */ var nativescript_angular_common__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular_common__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _mobileTerminal_mobile_pages_home_home_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./app/mobileTerminal/mobile-pages/home/home.component.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("../node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
/* harmony import */ var _mobileTerminal_mobile_pages_localnotification_localnotification_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./app/mobileTerminal/mobile-pages/localnotification/localnotification.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_workalert_workalert_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./app/mobileTerminal/mobile-pages/workalert/workalert.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_barcodescanner_msublot_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./app/mobileTerminal/mobile-pages/barcodescanner/msublot.service.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_workalert_workalert_detail_workalert_detail_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("./app/mobileTerminal/mobile-pages/workalert/workalert-detail/workalert-detail.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_productionManagement_pmHome_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("./app/mobileTerminal/mobile-pages/productionManagement/pmHome.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_equipmentManagement_emHome_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__("./app/mobileTerminal/mobile-pages/equipmentManagement/emHome.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_warningManagement_wmHome_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__("./app/mobileTerminal/mobile-pages/warningManagement/wmHome.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_workOrderOverview_workOrderOverview_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__("./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_workOrderOverview_workOrderOverview_detail_work_res_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__("./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview-detail/work-res.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_workOrderOverview_workOrderOverview_detail_job_show_qty_job_show_qty_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__("./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview-detail/job-show-qty/job-show-qty.component.ts");
/* harmony import */ var _mobileTerminal_mobile_pages_workOrderOverview_workOrderOverview_detail_job_show_qci_job_show_qci_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__("./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview-detail/job-show-qci/job-show-qci.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};































// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';
// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
//  import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _auto_generated_auto_generated_component__WEBPACK_IMPORTED_MODULE_4__["AutoGeneratedComponent"],
                _mobileTerminal_mobile_pages_login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
                _mobileTerminal_mobile_pages_barcodescanner_barcodescanner_component__WEBPACK_IMPORTED_MODULE_9__["BarcodescannerComponent"],
                _mobileTerminal_mobile_pages_home_home_component__WEBPACK_IMPORTED_MODULE_18__["HomeComponent"],
                _mobileTerminal_mobile_pages_localnotification_localnotification_component__WEBPACK_IMPORTED_MODULE_20__["LocalnotificationComponent"],
                _mobileTerminal_mobile_pages_workalert_workalert_component__WEBPACK_IMPORTED_MODULE_21__["WorkalertComponent"],
                _mobileTerminal_mobile_pages_workalert_workalert_detail_workalert_detail_component__WEBPACK_IMPORTED_MODULE_23__["WorkalertDetailComponent"],
                _mobileTerminal_mobile_pages_productionManagement_pmHome_component__WEBPACK_IMPORTED_MODULE_24__["PmHomeComponent"],
                _mobileTerminal_mobile_pages_equipmentManagement_emHome_component__WEBPACK_IMPORTED_MODULE_25__["EmHomeComponent"],
                _mobileTerminal_mobile_pages_warningManagement_wmHome_component__WEBPACK_IMPORTED_MODULE_26__["WmHomeComponent"],
                _mobileTerminal_mobile_pages_workOrderOverview_workOrderOverview_component__WEBPACK_IMPORTED_MODULE_27__["WorkOrderOverviewComponent"],
                _mobileTerminal_mobile_pages_workOrderOverview_workOrderOverview_detail_work_res_component__WEBPACK_IMPORTED_MODULE_28__["WorkResComponent"],
                _mobileTerminal_mobile_pages_workOrderOverview_workOrderOverview_detail_job_show_qty_job_show_qty_component__WEBPACK_IMPORTED_MODULE_29__["JobShowQtyComponent"],
                _mobileTerminal_mobile_pages_workOrderOverview_workOrderOverview_detail_job_show_qci_job_show_qci_component__WEBPACK_IMPORTED_MODULE_30__["JobShowQciComponent"]
            ],
            imports: [
                nativescript_angular_nativescript_module__WEBPACK_IMPORTED_MODULE_1__["NativeScriptModule"],
                _app_routing_module_tns__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                nativescript_angular_http_client__WEBPACK_IMPORTED_MODULE_5__["NativeScriptHttpClientModule"],
                nativescript_angular__WEBPACK_IMPORTED_MODULE_7__["NativeScriptFormsModule"],
                nativescript_ui_sidedrawer_angular__WEBPACK_IMPORTED_MODULE_10__["NativeScriptUISideDrawerModule"],
                nativescript_ui_listview_angular__WEBPACK_IMPORTED_MODULE_11__["NativeScriptUIListViewModule"],
                nativescript_ui_calendar_angular__WEBPACK_IMPORTED_MODULE_12__["NativeScriptUICalendarModule"],
                nativescript_ui_chart_angular__WEBPACK_IMPORTED_MODULE_13__["NativeScriptUIChartModule"],
                nativescript_ui_dataform_angular__WEBPACK_IMPORTED_MODULE_14__["NativeScriptUIDataFormModule"],
                nativescript_ui_autocomplete_angular__WEBPACK_IMPORTED_MODULE_15__["NativeScriptUIAutoCompleteTextViewModule"],
                nativescript_ui_gauge_angular__WEBPACK_IMPORTED_MODULE_16__["NativeScriptUIGaugeModule"],
                nativescript_angular_common__WEBPACK_IMPORTED_MODULE_17__["NativeScriptCommonModule"],
                nativescript_angular__WEBPACK_IMPORTED_MODULE_7__["NativeScriptFormsModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_19__["FontAwesomeModule"],
            ],
            providers: [
                _mobileTerminal_mobile_pages_login_user_service__WEBPACK_IMPORTED_MODULE_8__["UserService"],
                _mobileTerminal_mobile_pages_barcodescanner_msublot_service__WEBPACK_IMPORTED_MODULE_22__["MsubLotService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NO_ERRORS_SCHEMA"]],
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./app/auto-generated/auto-generated.component.css":
/***/ (function(module, exports) {

module.exports = "/* Add mobile styles for the component here.  */\r\n"

/***/ }),

/***/ "./app/auto-generated/auto-generated.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<Button text=\"auto-generated works!\" class=\"btn btn-primary\"></Button>-->\r\n<TextView editable=\"false\">\r\n  <FormattedString>\r\n    <Span text=\"This is a text view that uses attributed text. You can use text attributes such as \"></Span>\r\n    <Span text=\"bold, \" fontWeight=\"Bold\"></Span>\r\n    <Span text=\"italic \" fontStyle=\"Italic\"></Span>\r\n    <Span text=\"and \" ></Span>\r\n    <Span text=\"underline.\" textDecoration=\"Underline\"></Span>\r\n\r\n    <Span text=\"\" ></Span>\r\n  </FormattedString>\r\n</TextView>\r\n<ListView class=\"list-group\" [items]=\"iHierarchyScope\" style=\"height:1250px\">\r\n  <ng-template let-country=\"item\">\r\n    <FlexboxLayout flexDirection=\"row\" class=\"list-group-item\">\r\n<!--      <Image [src]=\"country.imageSrc\" class=\"thumb img-circle\"></Image>-->\r\n      <Label [text]=\"country.name\" class=\"list-group-item-heading\" verticalAlignment=\"center\" style=\"width: 60%\"></Label>\r\n    </FlexboxLayout>\r\n  </ng-template>\r\n</ListView>\r\n"

/***/ }),

/***/ "./app/auto-generated/auto-generated.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutoGeneratedComponent", function() { return AutoGeneratedComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _core_data_message_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./app/@core/data/message.service.ts");
/* harmony import */ var _core_data_app_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./app/@core/data/app.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AutoGeneratedComponent = /** @class */ (function () {
    function AutoGeneratedComponent(http, messageService, appService) {
        this.http = http;
        this.messageService = messageService;
        this.appService = appService;
        this.iHierarchyScope = [];
    }
    AutoGeneratedComponent.prototype.ngOnInit = function () {
        this.getHss();
    };
    AutoGeneratedComponent.prototype.getHss = function () {
        var _this = this;
        this.appService.getHss()
            .subscribe(function (iHierarchyScope) {
            console.log(iHierarchyScope);
            _this.iHierarchyScope = iHierarchyScope;
        });
    };
    AutoGeneratedComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'auto-generated',
            template: __webpack_require__("./app/auto-generated/auto-generated.component.html"),
            styles: [__webpack_require__("./app/auto-generated/auto-generated.component.css")],
            providers: [_core_data_app_service__WEBPACK_IMPORTED_MODULE_3__["AppService"]]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _core_data_message_service__WEBPACK_IMPORTED_MODULE_2__["MessageService"],
            _core_data_app_service__WEBPACK_IMPORTED_MODULE_3__["AppService"]])
    ], AutoGeneratedComponent);
    return AutoGeneratedComponent;
}());



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/barcodescanner/barcodescanner.component.css":
/***/ (function(module, exports) {

module.exports = ".btn{\r\n  background-color: #0072e3;\r\n  color:#ffffff;\r\n}\r\n\r\n.label {\r\n  vertical-align: center;\r\n  text-align: left;\r\n}\r\n.card {\r\n  background-color: #fff;\r\n  color: #4d4d4d;\r\n  margin: 15 15 15;\r\n  font-size: 12rem;\r\n}\r\n.card-layout {\r\n  padding: 20;\r\n}\r\n.card-layout .h1 {\r\n  margin-bottom: 15;\r\n}\r\nlabel{\r\n  text-align: left;\r\n}\r\n/* .label1{\r\n    width: 17%;\r\n} */\r\n.label2{\r\n  width: 35%;\r\n  color:#2894ff;\r\n}\r\n.label3{\r\n  padding-left: 5%;\r\n  /* width: 20%; */\r\n}\r\n.label4{\r\n  color:#2894ff;\r\n}\r\n\r\n.weui-btn{\r\n  position:relative;\r\n  display:block;\r\n  width:20%;\r\n  margin-left:auto;\r\n  margin-right:auto;\r\n  padding:8px 24px;\r\n  box-sizing:border-box;\r\n  font-weight:700;\r\n  font-size:17px;\r\n  text-align:center;\r\n  text-decoration:none;\r\n  color:#FFFFFF;\r\n  line-height:1.41176471;\r\n  border-radius:4px;\r\n  -webkit-tap-highlight-color:rgba(0, 0, 0, 0);\r\n  overflow:hidden;\r\n}\r\n.weui-btn_primary{\r\n  background-color:#07C160;\r\n}\r\n\r\n.weui-cells{\r\n  margin-top:8px;\r\n  background-color:#FFFFFF;\r\n  line-height:1.41176471;\r\n  font-size:17px;\r\n  overflow:hidden;\r\n  position:relative;\r\n}\r\n\r\n.weui-cell{\r\n  padding:16px;\r\n  position:relative;\r\n  display:-webkit-box;\r\n  display:-webkit-flex;\r\n  display:flex;\r\n  -webkit-box-align:center;\r\n  -webkit-align-items:center;\r\n  align-items:center;\r\n}\r\n\r\n.weui-cell__bd{\r\n  -webkit-box-flex:1;\r\n  -webkit-flex:1;\r\n  flex:1;\r\n}\r\n\r\n.weui-input{\r\n  width:100%;\r\n  border:0;\r\n  outline:0;\r\n  -webkit-appearance:none;\r\n  background-color:transparent;\r\n  font-size:inherit;\r\n  color:inherit;\r\n  height:1.41176471em;\r\n  line-height:1.41176471;\r\n}\r\n\r\n.line-stepper {\r\n  background-color: #f6bd00;\r\n  border-width: 1;\r\n  border-color: #f6bd00;\r\n}\r\n\r\n.item-image--stepper {\r\n  width: 100;\r\n  height: 30;\r\n  background-repeat: no-repeat;\r\n  background-size: contain;\r\n  background-position: center top;\r\n  background-image: url(\"~/app/mobileTerminal/fonts/airplane.png\");\r\n}\r\n\r\n.item-stepper {\r\n  color: #ffffff;\r\n  font-weight: bold;\r\n  border-color: #cccccc;\r\n  border-width: 1;\r\n  text-align: center;\r\n  background-color: #cccccc;\r\n  clip-path: polygon(50% 0%, 100% 21%, 89% 76%, 50% 100%, 12% 76%, 0 22%);\r\n  padding: 10 0;\r\n}\r\n\r\n.current-step {\r\n  background-color: #07C160;\r\n  color: #ffffff;\r\n  border-color: #ffffff;\r\n}\r\n\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/barcodescanner/barcodescanner.component.html":
/***/ (function(module, exports) {

module.exports = "<ActionBar class=\"action-bar\">\r\n  <ActionItem text=\"Item\" ios.position=\"right\" android.position=\"popup\"></ActionItem>\r\n  <NavigationButton\r\n    ios:visibility=\"collapsed\"\r\n    icon=\"~/app/mobileTerminal/fonts/返回.png\"\r\n    (tap)=\"backToHome()\"\r\n  ></NavigationButton>\r\n  <Label class=\"action-bar-title\" text=\"产品扫码\" horizontalAlignment=\"left\"></Label>\r\n</ActionBar>\r\n\r\n<GridLayout backgroundColor=\"#ccc\">\r\n  <StackLayout orientation=\"horizontal\" verticalAlignment=\"top\" height=\"50\">\r\n    <TextField [(ngModel)]=\"oid\" marginLeft=\"5\" hint=\"单号\" top=\"5\" width=\"50%\" height=\"40\"\r\n               backgroundColor=\"#fff\" (tap)=\"onChange()\"></TextField>\r\n    <button height=\"40\" borderRadius=\"5\" marginLeft=\"10\" text=\"扫码\" (tap)=\"openBarcodesScanner()\"\r\n            class=\"weui-btn weui-btn_primary\"></button>\r\n    <button height=\"40\" borderRadius=\"5\" marginLeft=\"10\" text=\"查询\" (tap)=\"getMsubLotByOid()\"\r\n            class=\"weui-btn weui-btn_primary\"></button>\r\n  </StackLayout>\r\n  <StackLayout paddingTop=\"50\">\r\n    <ScrollView class=\"page\">\r\n      <StackLayout *ngIf=\"oplogData.length>0\">\r\n        <StackLayout orientation=\"horizontal\" *ngFor=\"let item of oplogData;let i = index\">\r\n          <Label [text]=\"i+1\" id=\"itemStepper1\" height=\"40\" width=\"40\"\r\n                 class=\"item-stepper current-step\"></Label>\r\n          <CardView class=\"card\" elevation=\"40\" radius=\"10\" ios:shadowRadius=\"3\" width=\"85%\">\r\n            <StackLayout class=\"card-layout\">\r\n              <Label class=\"h2\" [text]=\"item.name\"></Label>\r\n              <StackLayout class=\"body\">\r\n                <Label *ngIf=\"item.hsname\" text=\"工位：{{item.hsname}}\"></Label>\r\n                <Label *ngIf=\"item.psubperson\" text=\"工号：{{item.psubperson}}\"></Label>\r\n                <Label *ngIf=\"item.date\" text=\"时间：{{item.date | date:'yy-MM-dd HH:mm:ss'}}\"></Label>\r\n              </StackLayout>\r\n            </StackLayout>\r\n          </CardView>\r\n        </StackLayout>\r\n      </StackLayout>\r\n      <StackLayout *ngIf=\"oplogData.length==0\" borderColor=\"lime\">\r\n        <GridLayout columns=\"250, 250, *\" rows=\"250, 30, 30, *\" width=\"600\" height=\"780\" backgroundColor=\"lightgray\">\r\n          <Label text=\"\" row=\"0\" col=\"0\" colSpan=\"3\"></Label>\r\n          <Label [text]=\"oid\" row=\"1\" col=\"0\" colSpan=\"3\" textAlignment=\"center\" fontSize=\"20\"></Label>\r\n          <Label [text]=\"errorResult\" row=\"2\" col=\"0\" colSpan=\"3\" textAlignment=\"center\" fontSize=\"20\"></Label>\r\n          <Label text=\"\" row=\"3\" col=\"0\" colSpan=\"3\"></Label>\r\n        </GridLayout>\r\n      </StackLayout>\r\n\r\n    </ScrollView>\r\n  </StackLayout>\r\n</GridLayout>\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/barcodescanner/barcodescanner.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarcodescannerComponent", function() { return BarcodescannerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var nativescript_barcodescanner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/nativescript-barcodescanner/barcodescanner.js");
/* harmony import */ var nativescript_barcodescanner__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nativescript_barcodescanner__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nativescript_angular_element_registry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/nativescript-angular/element-registry.js");
/* harmony import */ var nativescript_angular_element_registry__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular_element_registry__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var nativescript_cardview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/nativescript-cardview/cardview.js");
/* harmony import */ var nativescript_cardview__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nativescript_cardview__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../node_modules/nativescript-angular/index.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _msublot_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./app/mobileTerminal/mobile-pages/barcodescanner/msublot.service.ts");
/* harmony import */ var _core_data_util_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./app/@core/data/util.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { ModalDialogParams } from "nativescript-angular/modal-dialog";






Object(nativescript_angular_element_registry__WEBPACK_IMPORTED_MODULE_2__["registerElement"])("CardView", function () { return nativescript_cardview__WEBPACK_IMPORTED_MODULE_3__["CardView"]; });
var BarcodescannerComponent = /** @class */ (function () {
    function BarcodescannerComponent(routerExtensions, msubLotService) {
        this.routerExtensions = routerExtensions;
        this.msubLotService = msubLotService;
        this.oplogData = [];
        this.oid = '';
        this.errorResult = '';
        this.listPickerCountries = ["Australia", "Belgium", "Bulgaria", "Canada", "Switzerland",
            "China", "Czech Republic", "Germany", "Spain", "Ethiopia", "Croatia", "Hungary",
            "Italy", "Jamaica", "Romania", "Russia", "United States"];
        this.countries = [
            { name: "Australia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png" },
            { name: "Belgium", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png" },
            { name: "Bulgaria", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png" },
            { name: "Canada", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ca.png" },
            { name: "Switzerland", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ch.png" },
            { name: "China", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cn.png" },
            { name: "Czech Republic", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cz.png" },
            { name: "Germany", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/de.png" },
            { name: "Spain", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/es.png" },
            { name: "Ethiopia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/et.png" },
            { name: "Croatia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hr.png" },
            { name: "Hungary", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hu.png" },
            { name: "Italy", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/it.png" },
            { name: "Jamaica", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/jm.png" },
            { name: "Romania", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ro.png" },
            { name: "Russia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ru.png" },
            { name: "United States", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/us.png" },
        ];
        this.barcodescanner = new nativescript_barcodescanner__WEBPACK_IMPORTED_MODULE_1__["BarcodeScanner"]();
    }
    BarcodescannerComponent.prototype.ngOnInit = function () {
    };
    BarcodescannerComponent.prototype.getMsubLotByOid = function () {
        var _this = this;
        this.oplogData = [];
        this.msubLotService.getMsubLotByOid(this.oid).subscribe(function (iMsubLots) {
            if (iMsubLots || iMsubLots != undefined) {
                iMsubLots.oplog.map(function (item) {
                    var data = {
                        name: _core_data_util_service__WEBPACK_IMPORTED_MODULE_6__["MaterialData"].BodyOps[item.op].name,
                        date: new Date(item.date),
                        hsname: item.hs ? item.hs.name : '',
                        psubperson: item.psub.person ? (item.psub.person.name + "-[" + item.psub.person.oid + "]") : ''
                    };
                    _this.oplogData.push(data);
                    _this.errorResult = '';
                });
            }
            else {
                _this.errorResult = '没有该产品信息！！';
                _this.oplogData = [];
            }
        });
    };
    BarcodescannerComponent.prototype.onChange = function () {
        this.errorResult = '';
    };
    BarcodescannerComponent.prototype.openBarcodesScanner = function () {
        var _this = this;
        this.barcodescanner.scan({
            formats: "QR_CODE, EAN_13",
            cancelLabel: "EXIT. Also, try the volume buttons!",
            cancelLabelBackgroundColor: "#333333",
            showFlipCameraButton: true,
            preferFrontCamera: false,
            showTorchButton: true,
            beepOnScan: true,
            torchOn: false,
            closeCallback: function () {
                console.log("Scanner closed");
            },
            openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
        }).then(function (result) {
            _this.oid = result.text;
            // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
            console.log({
                title: "扫描结果",
                message: "Format: " + result.format + ",\nValue: " + result.text,
                okButtonText: "OK"
            }, _this.oid, 222);
            _this.getMsubLotByOid();
        }, function (errorMessage) {
            console.log("No scan. " + errorMessage);
        });
    };
    BarcodescannerComponent.prototype.backToHome = function () {
        this.routerExtensions.back();
    };
    BarcodescannerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "mes-m-barcodescanner",
            /*duleId: module.i*/
            template: __webpack_require__("./app/mobileTerminal/mobile-pages/barcodescanner/barcodescanner.component.html"),
            styles: [__webpack_require__("./app/mobileTerminal/mobile-pages/barcodescanner/barcodescanner.component.css")],
            providers: [_msublot_service__WEBPACK_IMPORTED_MODULE_5__["MsubLotService"], _core_data_util_service__WEBPACK_IMPORTED_MODULE_6__["MaterialData"]]
        }),
        __metadata("design:paramtypes", [nativescript_angular__WEBPACK_IMPORTED_MODULE_4__["RouterExtensions"],
            _msublot_service__WEBPACK_IMPORTED_MODULE_5__["MsubLotService"]])
    ], BarcodescannerComponent);
    return BarcodescannerComponent;
}());



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/barcodescanner/msublot.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MsubLotService", function() { return MsubLotService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_data_message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./app/@core/data/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json' })
};
var MsubLotService = /** @class */ (function () {
    function MsubLotService(http, messageService) {
        this.http = http;
        this.messageService = messageService;
        this.baseUrl = "http://100.13.32.237:9000";
    }
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    MsubLotService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error, 123123123); // log to console instead
            // TODO: better job of transforming error for user consumption
            _this.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(result);
        };
    };
    /** Log a HeroService message with the MessageService */
    MsubLotService.prototype.log = function (message) {
        this.messageService.add("MsubLotService: " + message);
    };
    /**
     * [通过oid查询msublot]
     * @param  {string}               oid [description]
     * @return {Observable<IMsubLot>}     [description]
     */
    MsubLotService.prototype.getMsubLotByOid = function (oid) {
        var _this = this;
        var url = this.baseUrl + ("/api/materialSubLots/oid/" + oid);
        return this.http.get(url, httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (_) { return _this.log('fetched MsubLot by oid oid=${oid}'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('getMsubLotByOid')));
    };
    MsubLotService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _core_data_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"]])
    ], MsubLotService);
    return MsubLotService;
}());



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/equipmentManagement/emHome.component.css":
/***/ (function(module, exports) {

module.exports = ".home-panel{\r\n  vertical-align: center;\r\n  font-size: 20;\r\n  margin: 15;\r\n}\r\n\r\n.description-label{\r\n  margin-bottom: 15;\r\n}\r\n\r\n.rooms{\r\n  width:33.33%;\r\n  text-align: center;\r\n  padding: 20 0;\r\n  border-width:0.1em;\r\n  border-color:#f5f5f5;\r\n}\r\n.rooms-image{\r\n  width: 50%;\r\n}\r\n\r\n.rooms-brand{\r\n  font-weight:bold;\r\n  font-size: 20;\r\n  color: black;\r\n  padding-top: 10;\r\n}\r\n\r\n.page{\r\n  background-color:transparent;\r\n}\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/equipmentManagement/emHome.component.html":
/***/ (function(module, exports) {

module.exports = "<ActionBar class=\"action-bar\">\r\n  <NavigationButton\r\n    ios:visibility=\"collapsed\"\r\n    icon=\"~/app/mobileTerminal/fonts/返回.png\"\r\n    (tap)=\"backToHome()\"\r\n  ></NavigationButton>\r\n  <Label class=\"action-bar-title\" text=\"功能展示\"></Label>\r\n</ActionBar>\r\n<ScrollView class=\"page\">\r\n  <ListView class=\"list-group\" [items]=\"data\" (itemTap)=\"onItemTap($event)\">\r\n    <ng-template let-item=\"item\">\r\n      <GridLayout class=\"list-group-item\" rows=\"*\" columns=\"auto, *\">\r\n<!--        <Image row=\"0\" col=\"0\" [src]=\"item.src\" class=\"thumb img-circle\"></Image>-->\r\n        <Label row=\"0\" col=\"1\" [text]=\"item.text\"></Label>\r\n      </GridLayout>\r\n    </ng-template>\r\n  </ListView>\r\n</ScrollView>\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/equipmentManagement/emHome.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmHomeComponent", function() { return EmHomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/nativescript-angular/index.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EmHomeComponent = /** @class */ (function () {
    function EmHomeComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.data = [];
    }
    EmHomeComponent.prototype.ngOnInit = function () {
        // this.data.push({ text: "告警推送", path: "localnotification" });
        // this.data.push({ text: "告警列表", path: "workalert" });
    };
    EmHomeComponent.prototype.backToHome = function () {
        this.routerExtensions.back();
    };
    EmHomeComponent.prototype.onItemTap = function (args) {
        console.log(this.data[args.index].text + "::" + this.data[args.index].path);
        this.routerExtensions.navigate([this.data[args.index].path]);
    };
    EmHomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "mes-m-emHome",
            /*duleId: module.i*/
            template: __webpack_require__("./app/mobileTerminal/mobile-pages/equipmentManagement/emHome.component.html"),
            styles: [__webpack_require__("./app/mobileTerminal/mobile-pages/equipmentManagement/emHome.component.css")]
        }),
        __metadata("design:paramtypes", [nativescript_angular__WEBPACK_IMPORTED_MODULE_1__["RouterExtensions"]])
    ], EmHomeComponent);
    return EmHomeComponent;
}());



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/home/home.component.css":
/***/ (function(module, exports) {

module.exports = ".home-panel{\r\n  vertical-align: center;\r\n  font-size: 20;\r\n  margin: 15;\r\n}\r\n\r\n.description-label{\r\n  margin-bottom: 15;\r\n}\r\n\r\n.rooms{\r\n  width:33.33%;\r\n  text-align: center;\r\n  padding: 20 0;\r\n  border-width:0.1em;\r\n  border-color:#f5f5f5;\r\n}\r\n.rooms-image{\r\n  width: 50%;\r\n}\r\n\r\n.rooms-brand{\r\n  font-weight:bold;\r\n  font-size: 20;\r\n  color: black;\r\n  padding-top: 10;\r\n}\r\n\r\n.page{\r\n  background-color:transparent;\r\n}\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<ActionBar class=\"action-bar\">\r\n  <Label class=\"action-bar-title\" text=\"功能展示\"></Label>\r\n</ActionBar>\r\n\r\n<FlexboxLayout flexWrap=\"wrap\" alignContent=\"flex-start\" class=\"page\">\r\n  <StackLayout class=\"rooms\" (tap)=\"onProductionManagementTap($event)\">\r\n    <Image class=\"rooms-image\" src=\"~/app/mobileTerminal/fonts/生产管理200.png\"></Image>\r\n    <Label class=\"rooms-brand\" text=\"生产管理\"></Label>\r\n  </StackLayout>\r\n  <StackLayout class=\"rooms\" (tap)=\"onEquipmentManagementTap($event)\">\r\n    <Image class=\"rooms-image\" src=\"~/app/mobileTerminal/fonts/设备管理200.png\"></Image>\r\n    <Label class=\"rooms-brand\" text=\"设备管理\"></Label>\r\n  </StackLayout>\r\n  <StackLayout class=\"rooms\">\r\n    <Image class=\"rooms-image\" src=\"~/app/mobileTerminal/fonts/质量管理200.png\"></Image>\r\n    <Label class=\"rooms-brand\" text=\"质量管理\"></Label>\r\n  </StackLayout>\r\n  <StackLayout class=\"rooms\">\r\n    <Image class=\"rooms-image\" src=\"~/app/mobileTerminal/fonts/人力资源管理210.png\"></Image>\r\n    <Label class=\"rooms-brand\" paddingTop=\"15\" text=\"人力资源管理\"></Label>\r\n  </StackLayout>\r\n  <StackLayout class=\"rooms\" (tap)=\"onWarningManagementTap($event)\">\r\n    <Image class=\"rooms-image \" src=\"~/app/mobileTerminal/fonts/预警管理200.png\"></Image>\r\n    <Label class=\"rooms-brand\" text=\"预警管理\"></Label>\r\n  </StackLayout>\r\n  <StackLayout class=\"rooms\">\r\n    <Image class=\"rooms-image\" src=\"~/app/mobileTerminal/fonts/能源管理200.png\"></Image>\r\n    <Label class=\"rooms-brand\" text=\"能源管理\"></Label>\r\n  </StackLayout>\r\n  <StackLayout class=\"rooms\">\r\n    <Image class=\"rooms-image\" src=\"~/app/mobileTerminal/fonts/交互终端200.png\"></Image>\r\n    <Label class=\"rooms-brand\" text=\"交互终端管理\"></Label>\r\n  </StackLayout>\r\n  <StackLayout class=\"rooms\">\r\n    <Image class=\"rooms-image\" src=\"~/app/mobileTerminal/fonts/系统配置管理200.png\"></Image>\r\n    <Label class=\"rooms-brand\" text=\"系统配置管理\"></Label>\r\n  </StackLayout>\r\n  <StackLayout class=\"rooms\" (tap)=\"onWorkOrderOverviewTap($event)\">\r\n    <Image class=\"rooms-image\" src=\"~/app/mobileTerminal/fonts/系统配置管理200.png\"></Image>\r\n    <Label class=\"rooms-brand\" text=\"工单概览\"></Label>\r\n  </StackLayout>\r\n\r\n</FlexboxLayout>\r\n\r\n<!--<ScrollView class=\"page\">-->\r\n<!--  <ListView class=\"list-group\" [items]=\"data\" (itemTap)=\"onItemTap($event)\">-->\r\n<!--    <ng-template let-item=\"item\">-->\r\n<!--      <GridLayout class=\"list-group-item\" rows=\"*\" columns=\"auto, *\">-->\r\n<!--&lt;!&ndash;        <Image row=\"0\" col=\"0\" [src]=\"item.src\" class=\"thumb img-circle\"></Image>&ndash;&gt;-->\r\n<!--        <Label row=\"0\" col=\"1\" [text]=\"item.text\"></Label>-->\r\n<!--      </GridLayout>-->\r\n<!--    </ng-template>-->\r\n<!--  </ListView>-->\r\n<!--</ScrollView>-->\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/nativescript-angular/index.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = /** @class */ (function () {
    function HomeComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.data = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.data.push({ text: "产品扫码", path: "barcodescanner" });
        this.data.push({ text: "告警推送", path: "localnotification" });
        this.data.push({ text: "告警列表", path: "workalert" });
        this.data.push({ text: "Charmander", path: "" });
        this.data.push({ text: "Charmeleon", path: "" });
        this.data.push({ text: "Charizard", path: "" });
        this.data.push({ text: "Squirtle", path: "" });
        this.data.push({ text: "Wartortle", path: "" });
        this.data.push({ text: "Blastoise", path: "" });
        this.data.push({ text: "Caterpie", path: "" });
        this.data.push({ text: "Metapod", path: "" });
        this.data.push({ text: "Butterfree", path: "" });
        this.data.push({ text: "Weedle", path: "" });
        this.data.push({ text: "Kakuna", path: "" });
        this.data.push({ text: "Beedrill", path: "" });
    };
    HomeComponent.prototype.onProductionManagementTap = function (args) {
        console.log(args.element);
        this.routerExtensions.navigate(["pmHome"]);
    };
    HomeComponent.prototype.onEquipmentManagementTap = function (args) {
        this.routerExtensions.navigate(["emHome"]);
    };
    HomeComponent.prototype.onWarningManagementTap = function (args) {
        this.routerExtensions.navigate(["wmHome"]);
    };
    HomeComponent.prototype.onWorkOrderOverviewTap = function (args) {
        this.routerExtensions.navigate(["workOrderOverview"]);
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "mes-m-home",
            /*duleId: module.i*/
            template: __webpack_require__("./app/mobileTerminal/mobile-pages/home/home.component.html"),
            styles: [__webpack_require__("./app/mobileTerminal/mobile-pages/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [nativescript_angular__WEBPACK_IMPORTED_MODULE_1__["RouterExtensions"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/localnotification/localnotification.component.css":
/***/ (function(module, exports) {

module.exports = ".weui-btn{\r\n  position:relative;\r\n  display:block;\r\n  width:20%;\r\n  margin-left:auto;\r\n  margin-right:auto;\r\n  padding:8px 24px;\r\n  box-sizing:border-box;\r\n  font-weight:700;\r\n  font-size:17px;\r\n  text-align:center;\r\n  text-decoration:none;\r\n  color:#FFFFFF;\r\n  line-height:1.41176471;\r\n  border-radius:4px;\r\n  -webkit-tap-highlight-color:rgba(0, 0, 0, 0);\r\n  overflow:hidden;\r\n}\r\n\r\n.weui-btn_primary{\r\n  background-color:#07C160;\r\n}\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/localnotification/localnotification.component.html":
/***/ (function(module, exports) {

module.exports = "<ActionBar class=\"action-bar\">\r\n  <NavigationButton\r\n    ios:visibility=\"collapsed\"\r\n    icon=\"~/app/mobileTerminal/fonts/返回.png\"\r\n\r\n    (tap)=\"backToHome()\"\r\n  ></NavigationButton>\r\n  <Label class=\"action-bar-title\" text=\"告警推送\" horizontalAlignment=\"left\"></Label>\r\n</ActionBar>\r\n\r\n<GridLayout backgroundColor=\"#ccc\">\r\n  <StackLayout orientation=\"horizontal\" verticalAlignment=\"top\" height=\"50\">\r\n    <Label text=\"发送告警推送:\" marginLeft=\"5\" top=\"5\" width=\"60%\" height=\"40\" textAlignment=\"right\" fontSize=\"22\"></Label>\r\n    <button height=\"40\" borderRadius=\"5\" marginLeft=\"10\" text=\"推送\" (tap)=\"pushNotification()\"\r\n            class=\"weui-btn weui-btn_primary\"></button>\r\n  </StackLayout>\r\n</GridLayout>\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/localnotification/localnotification.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalnotificationComponent", function() { return LocalnotificationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/nativescript-angular/index.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nativescript_local_notifications__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/nativescript-local-notifications/local-notifications.js");
/* harmony import */ var nativescript_local_notifications__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nativescript_local_notifications__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tns_core_modules_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/tns-core-modules/color/color.js");
/* harmony import */ var tns_core_modules_color__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_color__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LocalnotificationComponent = /** @class */ (function () {
    function LocalnotificationComponent(routerExtensions) {
        var _this = this;
        this.routerExtensions = routerExtensions;
        nativescript_local_notifications__WEBPACK_IMPORTED_MODULE_2__["LocalNotifications"].addOnMessageReceivedCallback(function (notificationData) {
            // console.log("Notification received: " + JSON.stringify(notificationData));
            if (notificationData) {
                var stringNotificationData = JSON.stringify(notificationData);
                var channelIndex = stringNotificationData.indexOf('"channel":');
                var stringChannel = stringNotificationData.substring(channelIndex + 11, stringNotificationData.length);
                var selector = stringChannel.substring(stringChannel.indexOf('selector') + 10, stringChannel.indexOf('\','));
                if (selector === 'mes-m-workalert-detail') {
                    console.log(selector, 'selector!!!');
                    var id = stringChannel.substring(stringChannel.indexOf('id') + 4, stringChannel.indexOf('\'}'));
                    console.log(id, '123123123');
                    _this.routerExtensions.navigate(["/workalert/workalert-detail/" + id]);
                }
            }
        });
    }
    LocalnotificationComponent.prototype.ngOnInit = function () {
    };
    LocalnotificationComponent.prototype.backToHome = function () {
        this.routerExtensions.back();
    };
    LocalnotificationComponent.prototype.pushNotification = function () {
        nativescript_local_notifications__WEBPACK_IMPORTED_MODULE_2__["LocalNotifications"].schedule([{
                id: 1,
                title: '报警信息',
                body: '打磨机故障',
                color: new tns_core_modules_color__WEBPACK_IMPORTED_MODULE_3__["Color"]("red"),
                // groupedMessages:["跟着习近平共赴文明之约", "保护生态环境 习近平的这些话值得牢记", "习近平为新时代创新发展打造“科普之翼”", "香者自香 臭者自臭:‘中国技术有害论’可以休矣", "将制造业“逼”回美国？  上海为何不说“晚安”？"], //仅限android
                groupedMessages: ['告警等级：1', '层级结构：设备处', '设备：DMRob1[打磨机器人1#]', '负责人：设备管理员1#', '报警时间：2019-05-30 16:56'],
                groupSummary: "设备故障",
                ticker: 'The ticker',
                badge: 1,
                sound: "customsound-ios.wav",
                bigTextStyle: false,
                ongoing: false,
                icon: '',
                image: "",
                thumbnail: true,
                interval: 'minute',
                channel: "{selector:'mes-m-workalert-detail',id:'5cb7ed19f14c1e10f4fb2624'}",
                forceShowWhenInForeground: true,
                notificationLed: true,
                // at: new Date(new Date().getTime() + (0 * 1000)) // 10秒后发送通知,
                actions: [
                    {
                        id: 'yes',
                        type: 'button',
                        title: 'Yes',
                        launch: true,
                        submitLabel: 'OK',
                        placeholder: '请输入',
                        editable: true,
                        choices: ["Red", "Yellow", "Green"]
                    },
                    {
                        id: 'no',
                        type: 'button',
                        title: 'No',
                        launch: false,
                        submitLabel: 'OK',
                        placeholder: '请输入',
                        editable: true,
                        choices: ["Red", "Yellow", "Green"]
                    }
                ]
            }]).then(function () {
            console.log("Notification scheduled");
        }, function (error) {
            console.log("scheduling error: " + error);
        });
    };
    LocalnotificationComponent.prototype.cancelAllNotification = function () {
    };
    LocalnotificationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "mes-m-localnotification",
            /*duleId: module.i*/
            template: __webpack_require__("./app/mobileTerminal/mobile-pages/localnotification/localnotification.component.html"),
            styles: [__webpack_require__("./app/mobileTerminal/mobile-pages/localnotification/localnotification.component.css")],
            providers: []
        }),
        __metadata("design:paramtypes", [nativescript_angular__WEBPACK_IMPORTED_MODULE_1__["RouterExtensions"]])
    ], LocalnotificationComponent);
    return LocalnotificationComponent;
}());



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/login/login.component.css":
/***/ (function(module, exports) {

module.exports = ".page {\n  align-items: center;\n  flex-direction: column;\n}\n.form {\n  margin-left: 30;\n  margin-right: 30;\n  flex-grow: 2;\n  vertical-align: middle;\n}\n\n.logo {\n  margin-bottom: 12;\n  height: 90;\n  font-weight: bold;\n}\n.header {\n  horizontal-align: center;\n  font-size: 25;\n  font-weight: 600;\n  margin-bottom: 70;\n  text-align: center;\n  color: #0e932e;\n}\n\n.input-field {\n  margin-bottom: 25;\n}\n.input {\n  font-size: 18;\n  placeholder-color: #A8A8A8;\n}\n.input:disabled {\n  background-color: white;\n  opacity: 0.5;\n}\n\n.btn-primary {\n  margin: 30 5 15 5;\n}\n\n.login-label {\n  horizontal-align: center;\n  color: #A8A8A8;\n  font-size: 16;\n}\n.sign-up-label {\n  margin-bottom: 20;\n}\n.bold {\n  color: #000000; \n}\n\n.btn-primary {\n  height: 50;\n  background-color: #0e932e;\n  border-radius: 5;\n  font-size: 20;\n  font-weight: 600;\n}\n.btn-primary:disabled {\n  opacity: 0.5;\n}\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<FlexboxLayout class=\"page\">\n    <StackLayout class=\"form\">\n        <Image class=\"logo\" src=\"~/app/mobileTerminal/fonts/mes200.png\"></Image>\n        <Label class=\"header\" text=\"MES 智能终端\"></Label>\n\n        <PreviousNextView>\n            <GridLayout rows=\"auto, auto, auto\">\n                <StackLayout row=\"0\" class=\"input-field\">\n                    <TextField class=\"input\" hint=\"邮箱\" [isEnabled]=\"!processing\"\n                        keyboardType=\"email\" autocorrect=\"false\"\n                        autocapitalizationType=\"none\" [(ngModel)]=\"user.email\"\n                        returnKeyType=\"next\" (returnPress)=\"focusPassword()\"></TextField>\n                    <StackLayout class=\"hr-light\"></StackLayout>\n                </StackLayout>\n\n                <StackLayout row=\"1\" class=\"input-field\">\n                    <TextField #password class=\"input\" [isEnabled]=\"!processing\"\n                        hint=\"密码\" secure=\"true\" [(ngModel)]=\"user.password\"\n                        [returnKeyType]=\"isLoggingIn ? 'done' : 'next'\"\n                        (returnPress)=\"focusConfirmPassword()\"></TextField>\n                    <StackLayout class=\"hr-light\"></StackLayout>\n                </StackLayout>\n\n                <StackLayout row=\"2\" *ngIf=\"!isLoggingIn\" class=\"input-field\">\n                    <TextField #confirmPassword class=\"input\" [isEnabled]=\"!processing\"\n                        hint=\"确认密码\" secure=\"true\" [(ngModel)]=\"user.confirmPassword\"\n                        returnKeyType=\"done\"></TextField>\n                    <StackLayout class=\"hr-light\"></StackLayout>\n                </StackLayout>\n\n                <ActivityIndicator rowSpan=\"3\" [busy]=\"processing\"></ActivityIndicator>\n            </GridLayout>\n        </PreviousNextView>\n\n        <Button [text]=\"isLoggingIn ? '登录' : '注册'\" [isEnabled]=\"!processing\"\n            (tap)=\"submit()\" class=\"btn btn-primary m-t-20\"></Button>\n        <Label *ngIf=\"isLoggingIn\" text=\"忘记密码？\" class=\"login-label\"\n            (tap)=\"forgotPassword()\"></Label>\n    </StackLayout>\n\n    <Label class=\"login-label sign-up-label\" (tap)=\"toggleForm()\">\n        <FormattedString>\n            <Span [text]=\"isLoggingIn ? '还没有账户？' : '返回到登录'\"></Span>\n            <Span [text]=\"isLoggingIn ? '注册' : ''\" class=\"bold\"></Span>\n        </FormattedString>\n    </Label>\n</FlexboxLayout>\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var tns_core_modules_ui_dialogs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/tns-core-modules/ui/dialogs/dialogs.js");
/* harmony import */ var tns_core_modules_ui_dialogs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_ui_dialogs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tns_core_modules_ui_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/tns-core-modules/ui/page/page.js");
/* harmony import */ var tns_core_modules_ui_page__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_ui_page__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var nativescript_angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/nativescript-angular/router/index.js");
/* harmony import */ var nativescript_angular_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _user_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./app/mobileTerminal/mobile-pages/login/user.model.ts");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./app/mobileTerminal/mobile-pages/login/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginComponent = /** @class */ (function () {
    function LoginComponent(page, routerExtensions, userService) {
        this.page = page;
        this.routerExtensions = routerExtensions;
        this.userService = userService;
        this.isLoggingIn = true;
        this.processing = false;
        this.userData = [
            new _user_model__WEBPACK_IMPORTED_MODULE_4__["User"]('admin', 'admin', 'admin')
        ];
        this.page.actionBarHidden = true;
        this.user = new _user_model__WEBPACK_IMPORTED_MODULE_4__["User"]();
        this.user.email = "admin";
        this.user.password = "admin";
    }
    LoginComponent.prototype.toggleForm = function () {
        this.isLoggingIn = !this.isLoggingIn;
    };
    LoginComponent.prototype.submit = function () {
        if (!this.user.email || !this.user.password) {
            this.alert("请填写账号和密码！");
            return;
        }
        this.processing = true;
        if (this.isLoggingIn) {
            this.login();
        }
        else {
            this.register();
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        // this.userService.login(this.user)
        //     .then(() => {
        //         this.processing = false;
        //         this.routerExtensions.navigate(["/home"], { clearHistory: true });
        //     })
        //     .catch(() => {
        //         this.processing = false;
        //         this.alert("Unfortunately we could not find your account.");
        //     });
        var loginFlag = true;
        this.userData.map(function (user) {
            if (_this.user.email === user.email && _this.user.password === user.password) {
                _this.processing = false;
                _this.user = user;
                _user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"].setCurrentUser(_this.user.email);
                loginFlag = false;
                _this.routerExtensions.navigate(["/home"], { clearHistory: true });
                // this.routerExtensions.navigate(["/home"]);
                return;
            }
        });
        if (loginFlag) {
            this.processing = false;
            this.alert("抱歉，未能找到与之对应的账号和密码！");
        }
        // if(this.user.email==='admin'&&this.user.password==='admin'){
        //     this.processing = false;
        //     this.routerExtensions.navigate(["/home"],{ clearHistory: true });
        // }else{
        //     this.processing = false;
        //     this.alert("抱歉，未能找到与之对应的账号和密码！");
        // }
    };
    LoginComponent.prototype.register = function () {
        if (this.user.password != this.user.confirmPassword) {
            this.alert("两次密码不一致，请重新确认！");
            this.processing = false;
            return;
        }
        //访问数据库，新增账号和密码
        this.processing = false;
        this.userData.push(this.user);
        this.alert("你的账号已成功创建！");
        this.isLoggingIn = true;
        // this.userService.register(this.user)
        //     .then(() => {
        //         this.processing = false;
        //         this.alert("Your account was successfully created.");
        //         this.isLoggingIn = true;
        //     })
        //     .catch(() => {
        //         this.processing = false;
        //         this.alert("Unfortunately we were unable to create your account.");
        //     });
    };
    LoginComponent.prototype.forgotPassword = function () {
        Object(tns_core_modules_ui_dialogs__WEBPACK_IMPORTED_MODULE_1__["prompt"])({
            title: "Forgot Password",
            message: "Enter the email address you used to register for APP NAME to reset your password.",
            inputType: "email",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        }).then(function (data) {
            if (data.result) {
                //访问数据库更改密码
                // this.userService.resetPassword(data.text.trim())
                //     .then(() => {
                //         this.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
                //     }).catch(() => {
                //         this.alert("Unfortunately, an error occurred resetting your password.");
                //     });
            }
        });
    };
    LoginComponent.prototype.focusPassword = function () {
        this.password.nativeElement.focus();
    };
    LoginComponent.prototype.focusConfirmPassword = function () {
        if (!this.isLoggingIn) {
            this.confirmPassword.nativeElement.focus();
        }
    };
    LoginComponent.prototype.alert = function (message) {
        return Object(tns_core_modules_ui_dialogs__WEBPACK_IMPORTED_MODULE_1__["alert"])({
            title: "MES",
            okButtonText: "确定",
            message: message
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("password"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], LoginComponent.prototype, "password", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("confirmPassword"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], LoginComponent.prototype, "confirmPassword", void 0);
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "mes-m-login",
            /*duleId: module.i*/
            template: __webpack_require__("./app/mobileTerminal/mobile-pages/login/login.component.html"),
            styles: [__webpack_require__("./app/mobileTerminal/mobile-pages/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [tns_core_modules_ui_page__WEBPACK_IMPORTED_MODULE_2__["Page"],
            nativescript_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterExtensions"],
            _user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/login/user.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
var User = /** @class */ (function () {
    function User(email, passwork, confirmPassword) {
        this.email = email;
        this.password = passwork;
        this.confirmPassword = confirmPassword;
    }
    ;
    return User;
}());



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/login/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// The following is a sample implementation of a backend service using Progress Kinvey (https://www.progress.com/kinvey).
// Feel free to swap in your own service / APIs / etc here for your own apps.

var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.isUserLoggedIn = function () {
        console.log(!!this.CURRENT_USER);
        return !!this.CURRENT_USER;
    };
    UserService.setCurrentUser = function (name) {
        this.CURRENT_USER = name;
    };
    UserService.CURRENT_USER = '';
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/productionManagement/pmHome.component.css":
/***/ (function(module, exports) {

module.exports = ".home-panel{\r\n  vertical-align: center;\r\n  font-size: 20;\r\n  margin: 15;\r\n}\r\n\r\n.description-label{\r\n  margin-bottom: 15;\r\n}\r\n\r\n.rooms{\r\n  width:33.33%;\r\n  text-align: center;\r\n  padding: 20 0;\r\n  border-width:0.1em;\r\n  border-color:#f5f5f5;\r\n}\r\n.rooms-image{\r\n  width: 50%;\r\n}\r\n\r\n.rooms-brand{\r\n  font-weight:bold;\r\n  font-size: 20;\r\n  color: black;\r\n  padding-top: 10;\r\n}\r\n\r\n.page{\r\n  background-color:transparent;\r\n}\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/productionManagement/pmHome.component.html":
/***/ (function(module, exports) {

module.exports = "<ActionBar class=\"action-bar\">\r\n  <NavigationButton\r\n    ios:visibility=\"collapsed\"\r\n    icon=\"~/app/mobileTerminal/fonts/返回.png\"\r\n    (tap)=\"backToHome()\"\r\n  ></NavigationButton>\r\n  <Label class=\"action-bar-title\" text=\"功能展示\"></Label>\r\n</ActionBar>\r\n<ScrollView class=\"page\">\r\n  <ListView class=\"list-group\" [items]=\"data\" (itemTap)=\"onItemTap($event)\">\r\n    <ng-template let-item=\"item\">\r\n      <GridLayout class=\"list-group-item\" rows=\"*\" columns=\"auto, *\">\r\n<!--        <Image row=\"0\" col=\"0\" [src]=\"item.src\" class=\"thumb img-circle\"></Image>-->\r\n        <Label row=\"0\" col=\"1\" [text]=\"item.text\"></Label>\r\n      </GridLayout>\r\n    </ng-template>\r\n  </ListView>\r\n</ScrollView>\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/productionManagement/pmHome.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PmHomeComponent", function() { return PmHomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/nativescript-angular/index.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PmHomeComponent = /** @class */ (function () {
    function PmHomeComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.data = [];
    }
    PmHomeComponent.prototype.ngOnInit = function () {
        this.data.push({ text: "产品扫码", path: "barcodescanner" });
    };
    PmHomeComponent.prototype.backToHome = function () {
        this.routerExtensions.back();
    };
    PmHomeComponent.prototype.onItemTap = function (args) {
        console.log(this.data[args.index].text + "::" + this.data[args.index].path);
        this.routerExtensions.navigate([this.data[args.index].path]);
    };
    PmHomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "mes-m-pmHome",
            /*duleId: module.i*/
            template: __webpack_require__("./app/mobileTerminal/mobile-pages/productionManagement/pmHome.component.html"),
            styles: [__webpack_require__("./app/mobileTerminal/mobile-pages/productionManagement/pmHome.component.css")]
        }),
        __metadata("design:paramtypes", [nativescript_angular__WEBPACK_IMPORTED_MODULE_1__["RouterExtensions"]])
    ], PmHomeComponent);
    return PmHomeComponent;
}());



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/warningManagement/wmHome.component.css":
/***/ (function(module, exports) {

module.exports = ".home-panel{\r\n  vertical-align: center;\r\n  font-size: 20;\r\n  margin: 15;\r\n}\r\n\r\n.description-label{\r\n  margin-bottom: 15;\r\n}\r\n\r\n.rooms{\r\n  width:33.33%;\r\n  text-align: center;\r\n  padding: 20 0;\r\n  border-width:0.1em;\r\n  border-color:#f5f5f5;\r\n}\r\n.rooms-image{\r\n  width: 50%;\r\n}\r\n\r\n.rooms-brand{\r\n  font-weight:bold;\r\n  font-size: 20;\r\n  color: black;\r\n  padding-top: 10;\r\n}\r\n\r\n.page{\r\n  background-color:transparent;\r\n}\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/warningManagement/wmHome.component.html":
/***/ (function(module, exports) {

module.exports = "<ActionBar class=\"action-bar\">\r\n  <NavigationButton\r\n    ios:visibility=\"collapsed\"\r\n    icon=\"~/app/mobileTerminal/fonts/返回.png\"\r\n    (tap)=\"backToHome()\"\r\n  ></NavigationButton>\r\n  <Label class=\"action-bar-title\" text=\"功能展示\"></Label>\r\n</ActionBar>\r\n<ScrollView class=\"page\">\r\n  <ListView class=\"list-group\" [items]=\"data\" (itemTap)=\"onItemTap($event)\">\r\n    <ng-template let-item=\"item\">\r\n      <GridLayout class=\"list-group-item\" rows=\"*\" columns=\"auto, *\">\r\n<!--        <Image row=\"0\" col=\"0\" [src]=\"item.src\" class=\"thumb img-circle\"></Image>-->\r\n        <Label row=\"0\" col=\"1\" [text]=\"item.text\"></Label>\r\n      </GridLayout>\r\n    </ng-template>\r\n  </ListView>\r\n</ScrollView>\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/warningManagement/wmHome.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WmHomeComponent", function() { return WmHomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/nativescript-angular/index.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WmHomeComponent = /** @class */ (function () {
    function WmHomeComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.data = [];
    }
    WmHomeComponent.prototype.ngOnInit = function () {
        this.data.push({ text: "告警推送", path: "localnotification" });
        this.data.push({ text: "告警列表", path: "workalert" });
    };
    WmHomeComponent.prototype.backToHome = function () {
        this.routerExtensions.back();
    };
    WmHomeComponent.prototype.onItemTap = function (args) {
        console.log(this.data[args.index].text + "::" + this.data[args.index].path);
        this.routerExtensions.navigate([this.data[args.index].path]);
    };
    WmHomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "mes-m-wmHome",
            /*duleId: module.i*/
            template: __webpack_require__("./app/mobileTerminal/mobile-pages/warningManagement/wmHome.component.html"),
            styles: [__webpack_require__("./app/mobileTerminal/mobile-pages/warningManagement/wmHome.component.css")]
        }),
        __metadata("design:paramtypes", [nativescript_angular__WEBPACK_IMPORTED_MODULE_1__["RouterExtensions"]])
    ], WmHomeComponent);
    return WmHomeComponent;
}());



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview-detail/job-show-qci/job-show-qci.component.html":
/***/ (function(module, exports) {

module.exports = "<GridLayout rows=\"*\" columns=\"*\" height=\"400\">\r\n  <RadCartesianChart tkExampleTitle tkToggleNavButton>\r\n    <CategoricalAxis tkCartesianHorizontalAxis lineColor=\"#595959\" lineThickness=\"1\"></CategoricalAxis>\r\n    <LinearAxis tkCartesianVerticalAxis lineHidden=\"true\"></LinearAxis>\r\n\r\n    <BarSeries tkCartesianSeries seriesName=\"myBar1\" [items]=\"qciArray\" categoryProperty=\"oid\" valueProperty=\"num\" showLabels=\"true\" legendTitle=\"数量/件\">\r\n      <PointLabelStyle tkBarLabelStyle margin=\"-30\" fontStyle=\"Bold\" fillColor=\"#E09724\" textSize=\"10\" textColor=\"White\"></PointLabelStyle>\r\n    </BarSeries>\r\n\r\n    <LineSeries tkCartesianSeries seriesName=\"myLine1\" [items]=\"percenArray\" categoryProperty=\"oid\" valueProperty=\"percen\" showLabels=\"true\" legendTitle=\"累计占比/%\">\r\n      <PointLabelStyle tkLineLabelStyle margin=\"10\" fontStyle=\"Bold\" fillColor=\"#0050b3\" textSize=\"10\" textColor=\"White\"></PointLabelStyle>\r\n    </LineSeries>\r\n\r\n    <RadLegendView tkCartesianLegend position=\"Top\" title=\"作业缺陷：\" height=\"70\" enableSelection=\"false\"></RadLegendView>\r\n\r\n    <Palette tkCartesianPalette seriesName=\"myBar1\">\r\n      <PaletteEntry tkCartesianPaletteEntry fillColor=\"#E09724\" strokeColor=\"#E09724\"></PaletteEntry>\r\n    </Palette>\r\n    <Palette tkCartesianPalette seriesName=\"myLine1\">\r\n      <PaletteEntry tkCartesianPaletteEntry fillColor=\"#0050b3\" strokeColor=\"#0050b3\" strokeWidth=\"5\"></PaletteEntry>\r\n    </Palette>\r\n\r\n    <RadCartesianChartGrid tkCartesianGrid\r\n                           horizontalLinesVisible=\"true\" verticalLinesVisible=\"false\"\r\n                           horizontalStripLinesVisible=\"false\" verticalStripLinesVisible=\"false\"\r\n                           horizontalStrokeColor=\"#e5e5e5\"\r\n                           horizontalStripLineColor=\"#e5e5e5\">\r\n    </RadCartesianChartGrid>\r\n  </RadCartesianChart>\r\n</GridLayout>\r\n\r\n\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview-detail/job-show-qci/job-show-qci.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JobShowQciComponent", function() { return JobShowQciComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EchartQciItem = /** @class */ (function () {
    function EchartQciItem() {
    }
    return EchartQciItem;
}());
var JobShowQciComponent = /** @class */ (function () {
    function JobShowQciComponent() {
        this.options = {};
        this.qciArray = [];
        this.percenArray = [];
    }
    Object.defineProperty(JobShowQciComponent.prototype, "jr", {
        set: function (jr) {
            this._jr = jr;
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    JobShowQciComponent.prototype.init = function () {
        if (this._jr) {
            var items = lodash__WEBPACK_IMPORTED_MODULE_1__["fromPairs"](lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](lodash__WEBPACK_IMPORTED_MODULE_1__["toPairs"](lodash__WEBPACK_IMPORTED_MODULE_1__["countBy"](this._jr.reasons, 'oid')), ['1'], ['desc']));
            if (items) {
                var total = lodash__WEBPACK_IMPORTED_MODULE_1__["values"](items).length > 0 ? lodash__WEBPACK_IMPORTED_MODULE_1__["values"](items).reduce(function (prev, curr) { return prev + curr; }) : 0;
                console.log(this._jr, "jr!!!!!!");
                console.log(items, "items!!!!!!");
                console.log(total, "total!!!!!!");
                console.log(lodash__WEBPACK_IMPORTED_MODULE_1__["values"](items), '[]!!!');
                var dataArray = []; //缺陷数据数组
                var sumNum = 0; //累计缺陷数
                var percenArray = []; //累计占比数据数组
                for (var item in items) {
                    console.log(item + "=" + items[item]);
                    //组装缺陷数据
                    var data = {
                        oid: item,
                        num: items[item]
                    };
                    dataArray.push(data);
                    //计算累计占比，组装累计占比数据
                    sumNum += items[item];
                    var percenData = {
                        oid: item,
                        percen: lodash__WEBPACK_IMPORTED_MODULE_1__["round"](sumNum / total * 100, 2)
                    };
                    percenArray.push(percenData);
                }
                this.qciArray = dataArray;
                this.percenArray = percenArray;
                console.log(this.qciArray, "this.qciArray!!!!");
                console.log(this.percenArray, "this.percenArray!!!!");
                // this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
                //   const colors: any = config.variables;
                //   const echarts: any = config.variables.echarts;
                //
                //   this.options = {
                //     backgroundColor: echarts.bg,
                //     color: [colors.primaryLight, colors.successLight, colors.infoLight, colors.warningLight, colors.dangerLight],
                //     tooltip: {
                //       trigger: 'axis',
                //       axisPointer: {
                //         type: 'shadow',
                //       },
                //       textStyle: {
                //         fontSize: 20,
                //       },
                //     },
                //     toolbox: {
                //       feature: {
                //         dataView: { show: true, readOnly: false },
                //         restore: { show: true },
                //         saveAsImage: { show: true }
                //       }
                //     },
                //     legend: {
                //       data: ['数量', '累计占比'],
                //       textStyle: {
                //         fontSize: 18,
                //         color: echarts.textColor,
                //       },
                //     },
                //     grid: {
                //       left: '3%',
                //       right: '4%',
                //       bottom: '3%',
                //       containLabel: true,
                //     },
                //     xAxis: [
                //       {
                //         type: 'category',
                //         data: _.keys(items),
                //         axisTick: {
                //           alignWithLabel: true,
                //         },
                //         axisLine: {
                //           lineStyle: {
                //             color: echarts.axisLineColor,
                //           },
                //         },
                //         axisLabel: {
                //           fontSize: 18,
                //           textStyle: {
                //             color: echarts.textColor,
                //           },
                //         },
                //       },
                //     ],
                //     yAxis: [
                //       {
                //         type: 'value',
                //         min: 0,
                //         max: total,
                //         axisLine: {
                //           lineStyle: {
                //             color: echarts.axisLineColor,
                //           },
                //         },
                //         splitLine: {
                //           lineStyle: {
                //             color: echarts.splitLineColor,
                //           },
                //         },
                //         axisLabel: {
                //           fontSize: 18,
                //           textStyle: {
                //             color: echarts.textColor,
                //           },
                //         },
                //       },
                //       {
                //         type: 'value',
                //         axisLine: {
                //           lineStyle: {
                //             color: echarts.axisLineColor,
                //           },
                //         },
                //         splitLine: {
                //           lineStyle: {
                //             color: echarts.splitLineColor,
                //           },
                //         },
                //         axisLabel: {
                //           fontSize: 18,
                //           formatter: '{value}%',
                //           textStyle: {
                //             color: echarts.textColor,
                //           },
                //         },
                //       },
                //     ],
                //     series: [{
                //       name: '数量',
                //       type: 'bar',
                //       itemStyle: { normal: { label: { show: true, position: 'top' } } },
                //       data: _.values(items)
                //     }, {
                //       name: '累计占比',
                //       type: 'line',
                //       yAxisIndex: 1,
                //       itemStyle: { normal: { label: { show: true, position: 'bottom' } } },
                //       data: _.values(items).map((item, index, input) => total === 0 ? 0 : _.round(input.slice(0, index + 1).reduce((prev, curr) => prev + curr) / total * 100), 2),
                //     }],
                //   };
                // });
            }
        }
    };
    JobShowQciComponent.prototype.ngAfterViewInit = function () {
    };
    JobShowQciComponent.prototype.ngOnDestroy = function () {
        if (this.themeSubscription) {
            this.themeSubscription.unsubscribe();
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], JobShowQciComponent.prototype, "jr", null);
    JobShowQciComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mes-m-job-show-qci',
            template: __webpack_require__("./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview-detail/job-show-qci/job-show-qci.component.html"),
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], JobShowQciComponent);
    return JobShowQciComponent;
}());



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview-detail/job-show-qty/job-show-qty.component.html":
/***/ (function(module, exports) {

module.exports = "<GridLayout rows=\"*\" columns=\"*\" height=\"400\">\r\n  <RadCartesianChart seriesSelectionMode=\"Multiple\" tkExampleTitle tkToggleNavButton>\r\n    <CategoricalAxis tkCartesianHorizontalAxis lineColor=\"#595959\" lineThickness=\"1\"></CategoricalAxis>\r\n    <LinearAxis tkCartesianVerticalAxis lineColor=\"Blue\" lineThickness=\"1\" lineHidden=\"true\"></LinearAxis>\r\n\r\n    <BarSeries tkCartesianSeries seriesName=\"myBar\" selectionMode=\"DataPoint\" legendTitle=\"计划/件\"\r\n               [items]=\"planArray\" categoryProperty=\"oid\" valueProperty=\"quantity\" showLabels=\"true\">\r\n      <PointLabelStyle tkBarLabelStyle margin=\"1\" fontStyle=\"Bold\" fillColor=\"#0050b3\" textSize=\"10\" textColor=\"White\"></PointLabelStyle>\r\n    </BarSeries>\r\n    <BarSeries tkCartesianSeries seriesName=\"myBar\" selectionMode=\"DataPointMultiple\" legendTitle=\"实际/件\"\r\n               [items]=\"actArray\" categoryProperty=\"oid\" valueProperty=\"quantity\" showLabels=\"true\">\r\n      <PointLabelStyle tkBarLabelStyle margin=\"1\" fontStyle=\"Bold\" fillColor=\"#07C160\" textSize=\"10\" textColor=\"White\"></PointLabelStyle>\r\n    </BarSeries>\r\n    <RadLegendView tkCartesianLegend position=\"Top\" title=\"作业产出：\" height=\"70\" enableSelection=\"false\"></RadLegendView>\r\n\r\n    <!-- >> chart-angular-styling-series-selection -->\r\n    <Palette tkCartesianPalette seriesName=\"myBar\">\r\n      <PaletteEntry tkCartesianPaletteEntry strokeWidth=\"1\" strokeColor=\"#0050b3\" fillColor=\"#0050b3\"></PaletteEntry>\r\n      <PaletteEntry tkCartesianPaletteEntry strokeWidth=\"3\" strokeColor=\"#07C160\" fillColor=\"#07C160\"></PaletteEntry>\r\n    </Palette>\r\n    <Palette tkCartesianPalette seriesName=\"myBar\" seriesState=\"Selected\">\r\n      <PaletteEntry tkCartesianPaletteEntry strokeWidth=\"5\" strokeColor=\"#0050b3\" fillColor=\"#0050b3\"></PaletteEntry>\r\n      <PaletteEntry tkCartesianPaletteEntry strokeWidth=\"5\" strokeColor=\"#07C160\" fillColor=\"#07C160\"></PaletteEntry>\r\n    </Palette>\r\n\r\n    <RadCartesianChartGrid tkCartesianGrid\r\n                           horizontalLinesVisible=\"true\" verticalLinesVisible=\"false\"\r\n                           horizontalStripLinesVisible=\"false\" verticalStripLinesVisible=\"false\"\r\n                           horizontalStrokeColor=\"#e5e5e5\"\r\n                           horizontalStripLineColor=\"#e5e5e5\">\r\n    </RadCartesianChartGrid>\r\n  </RadCartesianChart>\r\n</GridLayout>\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview-detail/job-show-qty/job-show-qty.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JobShowQtyComponent", function() { return JobShowQtyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_data_util_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./app/@core/data/util.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EchartQtyItem = /** @class */ (function () {
    function EchartQtyItem() {
    }
    return EchartQtyItem;
}());
var JobShowQtyComponent = /** @class */ (function () {
    function JobShowQtyComponent() {
        this._type = '仅物料';
        this.options = {};
        this.planArray = []; //“”“”“属于"计划"的数据
        this.actArray = []; //“”“”“属于"实际"的数据
    }
    Object.defineProperty(JobShowQtyComponent.prototype, "jr", {
        set: function (jr) {
            this._jr = jr;
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JobShowQtyComponent.prototype, "jo", {
        set: function (jo) {
            this._jo = jo;
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JobShowQtyComponent.prototype, "type", {
        set: function (type) {
            this._type = type;
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    JobShowQtyComponent.prototype.init = function () {
        var _this = this;
        if (this._jr && this._jo && this._type) {
            var mReq = this._jo.mReq.filter(function (mr) { return mr.use === _core_data_util_service__WEBPACK_IMPORTED_MODULE_2__["MaterialData"].useTypes[1]; });
            if (!mReq || mReq.length <= 0) {
                mReq = this._jo.mReq.filter(function (mr) { return mr.use === _core_data_util_service__WEBPACK_IMPORTED_MODULE_2__["MaterialData"].useTypes[0]; });
            }
            //计划实际数量，最终的呈现结果
            //1. 计划的量
            //2. 实际的量
            //3. 获取xAixs值
            //4. 获取yAixs Series值
            var items_1 = mReq.map(function (mr) {
                return {
                    oid: mr.mdef.oid,
                    name: '计划',
                    stack: '计划',
                    quantity: mr.qty.quantity,
                };
            });
            lodash__WEBPACK_IMPORTED_MODULE_1__["forOwn"](lodash__WEBPACK_IMPORTED_MODULE_1__["groupBy"](this._jr.mAct, 'mdef.oid'), function (value, key) {
                switch (_this._type) {
                    case '仅物料':
                        items_1.push({
                            oid: key,
                            name: '实际',
                            stack: '实际',
                            quantity: value.map(function (item) { return item.qty ? item.qty.quantity : 0; }).reduce(function (prev, curr) { return prev + curr; })
                        });
                        break;
                    case '物料+成型工':
                        lodash__WEBPACK_IMPORTED_MODULE_1__["forOwn"](lodash__WEBPACK_IMPORTED_MODULE_1__["groupBy"](value, 'subLot[0].molder.oid'), function (value1, key1) {
                            items_1.push({
                                oid: key,
                                name: key1,
                                stack: '实际',
                                quantity: value1.map(function (item) { return item.qty ? item.qty.quantity : 0; }).reduce(function (prev, curr) { return prev + curr; })
                            });
                        });
                        break;
                    default:
                        break;
                }
            });
            var xAxisData_1 = lodash__WEBPACK_IMPORTED_MODULE_1__["uniq"](lodash__WEBPACK_IMPORTED_MODULE_1__["map"](items_1, 'oid'));
            var series_1 = [];
            lodash__WEBPACK_IMPORTED_MODULE_1__["forOwn"](lodash__WEBPACK_IMPORTED_MODULE_1__["groupBy"](items_1, 'name'), function (value, key) {
                var thread = {
                    name: key,
                    stack: value[0].stack,
                    data: lodash__WEBPACK_IMPORTED_MODULE_1__["values"](lodash__WEBPACK_IMPORTED_MODULE_1__["assign"](lodash__WEBPACK_IMPORTED_MODULE_1__["zipObject"](xAxisData_1, xAxisData_1.map(function (item) { return 0; })), lodash__WEBPACK_IMPORTED_MODULE_1__["zipObject"](value.map(function (item) { return item.oid; }), value.map(function (item) { return item.quantity; }))))
                };
                series_1.push(thread);
            });
            console.log(series_1);
            var planDataArray_1 = [];
            var actDataArray_1 = [];
            lodash__WEBPACK_IMPORTED_MODULE_1__["forOwn"](lodash__WEBPACK_IMPORTED_MODULE_1__["groupBy"](items_1, 'name'), function (value, key) {
                if (key === "计划") {
                    var xArray_1 = new Array();
                    xArray_1.push.apply(xArray_1, xAxisData_1);
                    //遍历items中“”属于"计划"的数组
                    value.map(function (val) {
                        if (xArray_1.includes(val.oid)) {
                            var data = {
                                oid: val.oid,
                                quantity: val.quantity
                            };
                            planDataArray_1.push(data);
                            xArray_1 = xArray_1.filter(function (x) { return x != val.oid; });
                        }
                    });
                    //将显示的X轴字段但又不存在的统统设为0
                    if (xArray_1.length > 0) {
                        xArray_1.map(function (x) {
                            var data = {
                                oid: x,
                                quantity: 0
                            };
                            planDataArray_1.push(data);
                        });
                    }
                }
                if (key === "实际") {
                    var xArray_2 = new Array();
                    xArray_2.push.apply(xArray_2, xAxisData_1);
                    //遍历items中“”属于"实际"的数组
                    value.map(function (val) {
                        if (xArray_2.includes(val.oid)) {
                            var data = {
                                oid: val.oid,
                                quantity: val.quantity
                            };
                            actDataArray_1.push(data);
                            xArray_2 = xArray_2.filter(function (x) { return x != val.oid; });
                        }
                    });
                    //将显示的X轴字段但又不存在的统统设为0
                    if (xArray_2.length > 0) {
                        xArray_2.map(function (x) {
                            var data = {
                                oid: x,
                                quantity: 0
                            };
                            actDataArray_1.push(data);
                        });
                    }
                }
            });
            this.planArray = planDataArray_1;
            this.actArray = actDataArray_1;
            // this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
            //
            //   const colors: any = config.variables;
            //   const echarts: any = config.variables.echarts;
            //
            //   this.options = {
            //     backgroundColor: echarts.bg,
            //     color: [colors.primaryLight, colors.successLight, colors.infoLight, colors.warningLight, colors.dangerLight],
            //     tooltip: {
            //       trigger: 'axis',
            //       axisPointer: {
            //         type: 'shadow',
            //       },
            //     },
            //     legend: {
            //       data: series.map(item => item.name),
            //       textStyle: {
            //         fontSize: 18,
            //         color: echarts.textColor,
            //       },
            //     },
            //     grid: {
            //       left: '3%',
            //       right: '4%',
            //       bottom: '3%',
            //       containLabel: true,
            //     },
            //     xAxis: [
            //       {
            //         type: 'category',
            //         // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            //         data: xAxisData,
            //         axisTick: {
            //           alignWithLabel: true,
            //         },
            //         axisLine: {
            //           lineStyle: {
            //             color: echarts.axisLineColor,
            //           },
            //         },
            //         axisLabel: {
            //           textStyle: {
            //             color: echarts.textColor,
            //           },
            //         },
            //       },
            //     ],
            //     yAxis: [
            //       {
            //         type: 'value',
            //         axisLine: {
            //           lineStyle: {
            //             color: echarts.axisLineColor,
            //           },
            //         },
            //         splitLine: {
            //           lineStyle: {
            //             color: echarts.splitLineColor,
            //           },
            //         },
            //         axisLabel: {
            //           textStyle: {
            //             color: echarts.textColor,
            //           },
            //         },
            //       },
            //     ],
            //     series: series.map(item => {
            //       return {
            //         name: item.name,
            //         stack: item.stack,
            //         type: 'bar',
            //         itemStyle: { normal: { label: { show: true, position: 'top' } } },
            //         data: item.data
            //       }
            //     })
            //   };
            // });
        }
    };
    JobShowQtyComponent.prototype.ngAfterViewInit = function () {
    };
    JobShowQtyComponent.prototype.ngOnDestroy = function () {
        if (this.themeSubscription) {
            this.themeSubscription.unsubscribe();
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], JobShowQtyComponent.prototype, "jr", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], JobShowQtyComponent.prototype, "jo", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], JobShowQtyComponent.prototype, "type", null);
    JobShowQtyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mes-m-job-show-qty',
            template: __webpack_require__("./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview-detail/job-show-qty/job-show-qty.component.html"),
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], JobShowQtyComponent);
    return JobShowQtyComponent;
}());



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview-detail/work-res.component.css":
/***/ (function(module, exports) {

module.exports = ".laybelTop{\r\n  padding-top: 10;\r\n  padding-bottom: 5;\r\n  height: 60;\r\n  font-size: 18;\r\n}\r\n\r\n.labelLayout{\r\n  padding-top: 20;\r\n  padding-bottom: 10;\r\n  height: 60;\r\n  font-size: 18;\r\n}\r\n.laybelBorder{\r\n  border-bottom-width:1em;\r\n  border-bottom-color:#e8e8e8;\r\n}\r\n.labelName{\r\n  line-height: 50;\r\n  color: black;\r\n  font-weight: bold;\r\n}\r\n.labelText{\r\n  line-height: 50;\r\n  color: #595959;\r\n  text-align: right;\r\n  padding-right: 20;\r\n}\r\n\r\n.img-status{\r\n  width: 15%;\r\n  float: left;\r\n}\r\n\r\nImage{\r\n  padding-top: 20;\r\n  padding-bottom: 10;\r\n  height: 60;\r\n  /*border-bottom-width:1em;*/\r\n  border-bottom-color:#ccc;\r\n}\r\n\r\n.weui-btn{\r\n  position:relative;\r\n  display:block;\r\n  width:20%;\r\n  margin-left:auto;\r\n  margin-right:auto;\r\n  padding:8px 24px;\r\n  box-sizing:border-box;\r\n  font-weight:700;\r\n  font-size:17px;\r\n  text-align:center;\r\n  text-decoration:none;\r\n  color:#FFFFFF;\r\n  line-height:1.41176471;\r\n  border-radius:4px;\r\n  -webkit-tap-highlight-color:rgba(0, 0, 0, 0);\r\n  overflow:hidden;\r\n}\r\n.weui-btn_primary{\r\n  background-color:#07C160;\r\n}\r\n\r\n.backgroundLine{\r\n  background:linear-gradient(#f5f5f5,#ffffff 5%);\r\n}\r\n\r\n.processButton{\r\n  background:linear-gradient(to right, #096dd9 80%,#ffffff);\r\n  color:#ffffff;\r\n  border:1px solid #1aad19;\r\n}\r\n.gauge {\r\n  margin: 10;\r\n}\r\n\r\n.gifClass{\r\n  background-image: url('../../../../../app/mobileTerminal/fonts/loading-gif-50.gif');\r\n}\r\n\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview-detail/work-res.component.html":
/***/ (function(module, exports) {

module.exports = "<ActionBar class=\"action-bar\">\r\n  <NavigationButton\r\n    ios:visibility=\"collapsed\"\r\n    icon=\"~/app/mobileTerminal/fonts/返回.png\"\r\n    (tap)=\"backToWorkalert()\"\r\n  ></NavigationButton>\r\n  <Label class=\"action-bar-title\" text=\"呈现\" horizontalAlignment=\"left\"></Label>\r\n</ActionBar>\r\n\r\n<ScrollView>\r\n  <StackLayout>\r\n    <StackLayout class=\"backgroundLine\">\r\n      <StackLayout paddingBottom=\"5\">\r\n        <Label [text]=\"wres?wres.oid:''\" paddingTop=\"20\" fontSize=\"30\" color=\"#07C160\" fontWeight=\"bold\"\r\n               horizontalAlignment=\"center\" isLoaded=\"false\"></Label>\r\n        <Button [text]=\"processText\" width=\"100%\" color=\"#000000\" fontSize=\"20\" borderRadius=\"10\" [style]=\"persentStyle\" borderStyle=\"solid\"\r\n                borderWidth=\"2px\" borderColor=\"#07C160\" isLoaded=\"false\"></Button>\r\n      </StackLayout>\r\n      <GridLayout rows=\"*\" columns=\"1/10*,9/10*\" backgroundColor=\"#f5f5f5\">\r\n        <Image row=\"0\" col=\"0\" src=\"~/app/mobileTerminal/fonts/菜单32#07C160.png\" horizontalAlignment=\"left\"></Image>\r\n        <Label row=\"0\" col=\"1\" text=\"作业名片\" fontSize=\"20\" fontWeight=\"bold\" color=\"#07C160\" height=\"40\" paddingTop=\"10\"></Label>\r\n      </GridLayout>\r\n\r\n      <GridLayout rows=\"*,*,*,*\" columns=\"2/10*,8/10*\">\r\n        <Label row=\"0\" col=\"0\" text=\"作业号：\" fontSize=\"17\" paddingTop=\"10\" horizontalAlignment=\"right\"></Label>\r\n        <Label row=\"0\" col=\"1\" [text]=\"wres?wres.oid:''\" fontSize=\"17\" paddingTop=\"10\" color=\"#000000\"></Label>\r\n\r\n        <Label row=\"1\" col=\"0\" text=\"状态：\" fontSize=\"17\" paddingTop=\"10\" horizontalAlignment=\"right\"></Label>\r\n        <Label row=\"1\" col=\"1\" [text]=\"wres?wres.state:''\" fontSize=\"17\" paddingTop=\"10\" color=\"#000000\"></Label>\r\n\r\n        <Label row=\"2\" col=\"0\" text=\"工位：\" fontSize=\"17\" paddingTop=\"10\" horizontalAlignment=\"right\"></Label>\r\n        <Label row=\"2\" col=\"1\" [text]=\"wres?wres.hs.name:''\" fontSize=\"17\" paddingTop=\"10\" color=\"#000000\"></Label>\r\n\r\n        <Label row=\"3\" col=\"0\" text=\"工时：\" fontSize=\"17\" paddingTop=\"10\" horizontalAlignment=\"right\"></Label>\r\n        <Label row=\"3\" col=\"1\" [text]=\"wres?(wres.startTime | date:'yyyy-MM-dd HH:mm')+' -- '+(wres.endTime?(wres.endTime | date:'yyyy-MM-dd HH:mm'):''):''\" fontSize=\"17\" paddingTop=\"10\"\r\n               paddingBottom=\"10\" color=\"#000000\"></Label>\r\n      </GridLayout>\r\n\r\n      <StackLayout orientation=\"horizontal\">\r\n        <GridLayout width=\"50%\" rows=\"*\" columns=\"2/10*,8/10*\" backgroundColor=\"#f5f5f5\">\r\n          <Image row=\"0\" col=\"0\" src=\"~/app/mobileTerminal/fonts/菜单32#07C160.png\" horizontalAlignment=\"left\"></Image>\r\n          <Label row=\"0\" col=\"1\" text=\"本作业产量\" fontSize=\"20\" fontWeight=\"bold\" color=\"#07C160\" height=\"40\" paddingTop=\"10\"></Label>\r\n        </GridLayout>\r\n        <GridLayout width=\"50%\" rows=\"*\" columns=\"2/10*,8/10*\" backgroundColor=\"#f5f5f5\">\r\n          <Image row=\"0\" col=\"0\" src=\"~/app/mobileTerminal/fonts/菜单32#07C160.png\" horizontalAlignment=\"left\"></Image>\r\n          <Label row=\"0\" col=\"1\" text=\"作业缺陷\" fontSize=\"20\" fontWeight=\"bold\" color=\"#07C160\" height=\"40\" paddingTop=\"10\"></Label>\r\n        </GridLayout>\r\n      </StackLayout>\r\n\r\n      <GridLayout rows=\"*\" columns=\"1/2*,1/2*\" height=\"200\">\r\n        <RadRadialGauge class=\"gauge\" row=\"0\" col=\"0\" [title]=\"processText\" [subtitle]=\"processSubtitle\">\r\n          <TitleStyle tkRadialGaugeTitleStyle textColor=\"black\" verticalOffset=\"-30\"></TitleStyle>\r\n          <SubtitleStyle tkRadialGaugeSubtitleStyle textColor=\"black\"></SubtitleStyle>\r\n\r\n          <RadialScale #myScale tkRadialGaugeScales startAngle=\"-90\" sweepAngle=\"360\" minimum=\"0\" maximum=\"100\" radius=\"0.9\">\r\n            <ScaleStyle tkRadialScaleStyle ticksVisible=\"false\" labelsVisible=\"false\" lineThickness=\"0\"></ScaleStyle>\r\n\r\n            <RadialBarIndicator tkRadialScaleIndicators minimum=\"0\" maximum=\"100\" location=\"0.8\">\r\n              <BarIndicatorStyle tkRadialBarIndicatorStyle fillColor=\"rgba(7,193,96,0.5)\" barWidth=\"0.2\"></BarIndicatorStyle>\r\n            </RadialBarIndicator>\r\n\r\n            <RadialBarIndicator tkRadialScaleIndicators minimum=\"0\" maximum=\"0\" location=\"0.8\" isAnimated=\"true\">\r\n              <BarIndicatorStyle tkRadialBarIndicatorStyle cap=\"Round\" fillColor=\"rgba(7,193,96,1)\" barWidth=\"0.2\"></BarIndicatorStyle>\r\n            </RadialBarIndicator>\r\n          </RadialScale>\r\n        </RadRadialGauge>\r\n\r\n        <RadRadialGauge class=\"gauge\" row=\"0\" col=\"1\" [title]=\"qTitle\" [subtitle]=\"qSubtitle\">\r\n         <TitleStyle tkRadialGaugeTitleStyle textColor=\"black\" verticalOffset=\"-30\"></TitleStyle>\r\n          <SubtitleStyle tkRadialGaugeSubtitleStyle textColor=\"black\"></SubtitleStyle>\r\n          <RadialScale #myScale1 tkRadialGaugeScales startAngle=\"-90\" sweepAngle=\"360\" minimum=\"0\" maximum=\"100\" radius=\"0.9\">\r\n            <ScaleStyle tkRadialScaleStyle ticksVisible=\"false\" labelsVisible=\"false\" lineThickness=\"0\"></ScaleStyle>\r\n\r\n              <RadialBarIndicator tkRadialScaleIndicators minimum=\"0\" maximum=\"100\" location=\"0.8\">\r\n                <BarIndicatorStyle tkRadialBarIndicatorStyle fillColor=\"rgba(224,151,36,0.5)\" barWidth=\"0.2\"></BarIndicatorStyle>\r\n              </RadialBarIndicator>\r\n\r\n              <RadialBarIndicator tkRadialScaleIndicators minimum=\"0\" maximum=\"0\" location=\"0.8\" isAnimated=\"true\">\r\n                <BarIndicatorStyle tkRadialBarIndicatorStyle cap=\"Round\" fillColor=\"rgba(224,151,36,1)\" barWidth=\"0.2\"></BarIndicatorStyle>\r\n              </RadialBarIndicator>\r\n          </RadialScale>\r\n        </RadRadialGauge>\r\n      </GridLayout>\r\n\r\n      <GridLayout rows=\"*\" columns=\"1/10*,9/10*\" backgroundColor=\"#f5f5f5\">\r\n        <Image row=\"0\" col=\"0\" src=\"~/app/mobileTerminal/fonts/菜单32#07C160.png\" horizontalAlignment=\"left\"></Image>\r\n        <Label row=\"0\" col=\"1\" text=\"作业产出\" fontSize=\"20\" fontWeight=\"bold\" color=\"#07C160\" height=\"40\" paddingTop=\"10\"></Label>\r\n      </GridLayout>\r\n\r\n      <ListView [items]=\"jobs\"\r\n                separatorColor=\"orangered\" rowHeight=\"50\"\r\n                class=\"list-group\" id=\"listView\" row=\"2\">\r\n        <ng-template let-job=\"item\" let-i=\"index\" let-odd=\"odd\" let-even=\"even\">\r\n          <mes-m-job-show-qty [jo]=\"job.jo\" [jr]=\"job.jr\"></mes-m-job-show-qty>\r\n        </ng-template>\r\n      </ListView>\r\n\r\n      <GridLayout rows=\"*\" columns=\"1/10*,9/10*\" backgroundColor=\"#f5f5f5\">\r\n        <Image row=\"0\" col=\"0\" src=\"~/app/mobileTerminal/fonts/菜单32#07C160.png\" horizontalAlignment=\"left\"></Image>\r\n        <Label row=\"0\" col=\"1\" text=\"作业缺陷 Pareto\" fontSize=\"20\" fontWeight=\"bold\" color=\"#07C160\" height=\"40\" paddingTop=\"10\"></Label>\r\n      </GridLayout>\r\n\r\n      <ListView [items]=\"jobs\"\r\n                separatorColor=\"orangered\" rowHeight=\"50\"\r\n                class=\"list-group\" id=\"listView\" row=\"2\">\r\n        <ng-template let-job=\"item\" let-i=\"index\" let-odd=\"odd\" let-even=\"even\">\r\n          <mes-m-job-show-qci [jr]=\"job.jr\"></mes-m-job-show-qci>\r\n        </ng-template>\r\n      </ListView>\r\n\r\n    </StackLayout>\r\n  </StackLayout>\r\n</ScrollView>\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview-detail/work-res.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkResComponent", function() { return WorkResComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/nativescript-angular/index.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _work_res_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview-detail/work-res.service.ts");
/* harmony import */ var _core_data_util_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./app/@core/data/util.service.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var nativescript_loading_indicator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../node_modules/nativescript-loading-indicator/loading-indicator.js");
/* harmony import */ var nativescript_loading_indicator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(nativescript_loading_indicator__WEBPACK_IMPORTED_MODULE_6__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EchartQtyItem = /** @class */ (function () {
    function EchartQtyItem() {
    }
    return EchartQtyItem;
}());
var WorkResComponent = /** @class */ (function () {
    function WorkResComponent(route, routerExtensions, workResponseService, ngZone) {
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.workResponseService = workResponseService;
        this.ngZone = ngZone;
        this.oid = '';
        /**
         * [作业的进度值]
         */
        this.processValue = 0;
        //进度条样式
        this.persentStyle = "";
        //本作业产量subtitle
        this.processSubtitle = '';
        //作业进度完成率text
        this.processText = "";
        //缺陷率
        this.qPer = 0;
        //缺陷率title
        this.qTitle = "";
        //缺陷率subtitle
        this.qSubtitle = "";
        //
        this.jobs = [];
        //
        this.type = '仅物料';
        this.indicator = new nativescript_loading_indicator__WEBPACK_IMPORTED_MODULE_6__["LoadingIndicator"]();
    }
    WorkResComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoaderNoBezel();
        this.ngZone.run(function () {
            _this.oid = _this.route.snapshot.params.oid;
            _this.workResponseService.getWork({ oid: _this.oid }).subscribe(function (work) {
                _this.wreq = work.wreq;
                _this.wres = work.wres;
                _this.init();
                _this.hideIndicator();
            });
        });
    };
    //显示加载loading
    WorkResComponent.prototype.showLoaderNoBezel = function () {
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
                mode: nativescript_loading_indicator__WEBPACK_IMPORTED_MODULE_6__["Mode"].CustomView,
                indeterminate: true,
                // cancelable: true,
                customView: 'icon.png' //mode模式为Mode.CustomView是才生效,自定义loading图片
            }
        });
    };
    WorkResComponent.prototype.hideIndicator = function () {
        this.indicator.hide();
    };
    WorkResComponent.prototype.backToWorkalert = function () {
        this.routerExtensions.back();
    };
    WorkResComponent.prototype.confirm = function (even) {
    };
    WorkResComponent.prototype.cancel = function (even) {
    };
    WorkResComponent.prototype.ngAfterViewInit = function () {
    };
    WorkResComponent.prototype.init = function () {
        var _this = this;
        if (this.wres && this.wreq) {
            var firstJr = this.wres.jobResponse.find(function (item) { return item.oid === _this.wres.firstJob.oid; });
            this.firstPQ = {
                quantity: firstJr.qty.quantity + firstJr.ngqty.quantity,
                unit: firstJr.qty.unit,
            };
            var lastJr = this.wres.jobResponse.find(function (item) { return item.oid === _this.wres.lastJob.oid; });
            this.lastGQ = {
                quantity: lastJr.qty.quantity,
                unit: lastJr.qty.unit
            };
            console.log(this.lastGQ, 'lastGQ!!!');
            var lastJo = this.wreq.jobOrder.find(function (item) { return item.oid === _this.wreq.lastJob.oid; });
            this.POQ = {
                quantity: lastJo.mReq.map(function (item) { return item.qty.quantity; }).reduce(function (prev, curr) { return prev + curr; }),
                unit: lastJo.mReq[0].qty.unit
            };
            console.log(this.POQ, 'POQ!!!');
            this.SQ = {
                quantity: this.wres.jobResponse.map(function (item) { return item.ngqty.quantity; }).reduce(function (prev, curr) { return prev + curr; }),
                unit: lastJo.mReq[0].qty.unit
            };
            this.processValue = this.POQ.quantity === 0 ? 0 : lodash__WEBPACK_IMPORTED_MODULE_5__["round"](this.lastGQ.quantity / this.POQ.quantity * 100, 2);
            var jobArray_1 = [];
            this.processValues = this.wres.jobResponse
                .filter(function (jr) { return jr.directive.proseg.oid !== '成型'; })
                .sort(function (a, b) { return Number(a.directive.proseg.no) - Number(b.directive.proseg.no); })
                .map(function (jr) {
                var jo = _this.wreq.jobOrder.find(function (jo) { return jo._id === jr.jobOrder._id; });
                var destReq = jo.mReq.filter(function (item) { return item.use === _core_data_util_service__WEBPACK_IMPORTED_MODULE_4__["MaterialData"].useTypes[1]; });
                if (!destReq || destReq.length <= 0) {
                    destReq = jo.mReq.filter(function (item) { return item.use === _core_data_util_service__WEBPACK_IMPORTED_MODULE_4__["MaterialData"].useTypes[0]; });
                }
                //作业产出初始化和作业缺陷率初始化->工单和工单响应
                var job = { jr: jr, jo: jo };
                jobArray_1.push(job);
                // this.jobQtyInit();
                return {
                    oid: jr.oid,
                    qty: {
                        quantity: destReq.map(function (item) { return item.qty.quantity; }).reduce(function (prev, curr) { return prev + curr; }),
                        unit: destReq[0].qty.unit
                    },
                    actQty: jr.qty
                };
            });
            this.jobs = jobArray_1;
            console.log(this.jobs.length, "this.jobs!!!!!!!!!!!!");
            console.log(this.processValue, '123123123!!!');
            this.processText = "完成率" + this.processValue + "%";
            this.processSubtitle = this.lastGQ.quantity + "/" + this.POQ.quantity + this.lastGQ.unit;
            this.persentStyle = "background:linear-gradient(to right, #07C160 " + this.processValue + "%,#d9f7be)";
            this.qPer = this.SQ.quantity === 0 ? 0 : lodash__WEBPACK_IMPORTED_MODULE_5__["round"](this.SQ.quantity / this.firstPQ.quantity * 100, 2);
            this.qTitle = "缺陷率" + this.qPer + "%";
            this.qSubtitle = this.SQ.quantity + "/" + this.firstPQ.quantity + this.SQ.unit;
        }
    };
    WorkResComponent.prototype.ngAfterViewChecked = function () {
        //完成率
        var scale = this.scaleElement.nativeElement;
        for (var i = 0; i < scale.indicators.length; i++) {
            var barIndicator = scale.indicators.getItem(i);
            if (barIndicator.maximum === 0) {
                barIndicator.maximum = this.processValue;
            }
        }
        //缺陷率
        var scale1 = this.scaleElement1.nativeElement;
        for (var i = 0; i < scale1.indicators.length; i++) {
            var barIndicator = scale1.indicators.getItem(i);
            if (barIndicator.maximum === 0) {
                barIndicator.maximum = this.qPer;
            }
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("myScale"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], WorkResComponent.prototype, "scaleElement", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("myScale1"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], WorkResComponent.prototype, "scaleElement1", void 0);
    WorkResComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "mes-m-work-res",
            /*duleId: module.i*/
            template: __webpack_require__("./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview-detail/work-res.component.html"),
            styles: [__webpack_require__("./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview-detail/work-res.component.css")],
            providers: [_work_res_service__WEBPACK_IMPORTED_MODULE_3__["WorkResponseService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            nativescript_angular__WEBPACK_IMPORTED_MODULE_2__["RouterExtensions"],
            _work_res_service__WEBPACK_IMPORTED_MODULE_3__["WorkResponseService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]])
    ], WorkResComponent);
    return WorkResComponent;
}());



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview-detail/work-res.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkResponseService", function() { return WorkResponseService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _core_data_message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./app/@core/data/message.service.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({ 'Content-Type': 'application/json' })
};
var WorkResponseService = /** @class */ (function () {
    function WorkResponseService(http, messageService) {
        this.http = http;
        this.messageService = messageService;
        this.baseUrl = 'http://100.13.32.238:9000';
    }
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    WorkResponseService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _this.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(result);
        };
    };
    /** Log a HeroService message with the MessageService */
    WorkResponseService.prototype.log = function (message) {
        this.messageService.add("WorkResponseService: " + message);
    };
    /**
     * [根据 _id 获取单个作业的详细信息，包括作业请求和作业执行]
     * @param  {string}            id [description]
     * @return {Observable<IWork>}    [description]
     */
    WorkResponseService.prototype.getWork = function (query) {
        var _this = this;
        var qstr = '';
        if (query) {
            lodash__WEBPACK_IMPORTED_MODULE_5__["forOwn"](query, function (value, key) {
                qstr += key + "=" + value + "&";
            });
        }
        var url = this.baseUrl + "/api/workResponses/work/?" + qstr;
        console.log(url);
        return this.http.get(url)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (_) { return _this.log('fetch Work id=${id}'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(this.handleError('getWork')));
    };
    WorkResponseService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            _core_data_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"]])
    ], WorkResponseService);
    return WorkResponseService;
}());



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview.component.css":
/***/ (function(module, exports) {

module.exports = ".label1{\r\n  width: 10%;\r\n  float: left;\r\n}\r\n.label2{\r\n  text-align: center;\r\n}\r\n.img-status{\r\n  width: 15%;\r\n  float: left;\r\n}\r\n.img-circle{\r\n  width: 15%;\r\n  float: right;\r\n}\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview.component.html":
/***/ (function(module, exports) {

module.exports = "<ActionBar class=\"action-bar\">\r\n  <NavigationButton\r\n    ios:visibility=\"collapsed\"\r\n    icon=\"~/app/mobileTerminal/fonts/返回.png\"\r\n    (tap)=\"backToHome()\"\r\n  ></NavigationButton>\r\n  <Label class=\"action-bar-title\" text=\"工单概览\" horizontalAlignment=\"left\"></Label>\r\n</ActionBar>\r\n\r\n<ScrollView class=\"page\">\r\n  <ListView class=\"list-group\" [items]=\"workRequestList\" (itemTap)=\"onItemTap($event)\">\r\n    <ng-template let-item=\"item\" let-i=\"index\">\r\n      <GridLayout class=\"list-group-item\" rows=\"*\" columns=\"1/10*, 8/10*, 1/10*\">\r\n        <Label row=\"0\" col=\"0\" class=\"label1\" [text]=\"i+1\"></Label>\r\n        <Label row=\"0\" col=\"1\" class=\"label2\" [text]=\"item.oid\"></Label>\r\n        <Image row=\"0\" col=\"2\" src=\"~/app/mobileTerminal/fonts/跳转箭头灰色.png\" class=\"thumb img-circle\"></Image>\r\n      </GridLayout>\r\n    </ng-template>\r\n  </ListView>\r\n</ScrollView>\r\n"

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
        this.workRequestList = [];
        this.indicator = new nativescript_loading_indicator__WEBPACK_IMPORTED_MODULE_3__["LoadingIndicator"]();
    }
    WorkOrderOverviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoaderNoBezel();
        this.workOrderOverviewService.getWorkRequests().subscribe(function (val) {
            _this.workRequestList = val;
            _this.hideIndicator();
        });
    };
    WorkOrderOverviewComponent.prototype.onItemTap = function (args) {
        this.routerExtensions.navigate(["/workOrderOverview/work-res/" + this.workRequestList[args.index].oid]);
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



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workOrderOverview/workOrderOverview.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkOrderOverviewService", function() { return WorkOrderOverviewService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_data_message_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./app/@core/data/message.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({ 'Content-Type': 'application/json' })
};
var WorkOrderOverviewService = /** @class */ (function () {
    function WorkOrderOverviewService(http, messageService) {
        this.http = http;
        this.messageService = messageService;
        this.baseUrl = "http://100.13.32.238:9000";
    }
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    WorkOrderOverviewService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _this.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(result);
        };
    };
    /** Log a HeroService message with the MessageService */
    WorkOrderOverviewService.prototype.log = function (message) {
        this.messageService.add("WorkAlertService: " + message);
    };
    /**
     * [获取所有的作业请求信息]
     * @return {Observable<IWorkRequest[]>} [作业请求信息Array]
     */
    WorkOrderOverviewService.prototype.getWorkRequests = function (field, sort) {
        var _this = this;
        if (field === void 0) { field = ''; }
        if (sort === void 0) { sort = '-_id'; }
        var url = this.baseUrl + "/api/workRequests/?field=" + field + "&sort=" + sort;
        return this.http.get(url)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (_) { return _this.log('fetched WorkRequests'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(this.handleError('getWorkRequests', [])));
    };
    /**
     * [根据 _id 获取单个作业请求信息]
     * @param  {string}                   id [作业请求的_id]
     * @return {Observable<IWorkRequest>}    [单个作业请求信息]
     */
    WorkOrderOverviewService.prototype.getWorkRequest = function (id) {
        var _this = this;
        var url = this.baseUrl + "/api/workRequests/" + id;
        return this.http.get(url)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (_) { return _this.log('fetch WorkRequest id=${id}'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(this.handleError('getWorkRequest')));
    };
    WorkOrderOverviewService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"],
            _core_data_message_service__WEBPACK_IMPORTED_MODULE_2__["MessageService"]])
    ], WorkOrderOverviewService);
    return WorkOrderOverviewService;
}());



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workalert/workalert-detail/workalert-detail.component.css":
/***/ (function(module, exports) {

module.exports = ".laybelTop{\r\n  padding-top: 10;\r\n  padding-bottom: 5;\r\n  height: 60;\r\n  font-size: 18;\r\n}\r\n\r\n.labelLayout{\r\n  padding-top: 20;\r\n  padding-bottom: 10;\r\n  height: 60;\r\n  font-size: 18;\r\n}\r\n.laybelBorder{\r\n  border-bottom-width:1em;\r\n  border-bottom-color:#e8e8e8;\r\n}\r\n.labelName{\r\n  line-height: 50;\r\n  color: black;\r\n  font-weight: bold;\r\n}\r\n.labelText{\r\n  line-height: 50;\r\n  color: #595959;\r\n  text-align: right;\r\n  padding-right: 20;\r\n}\r\n\r\n.img-status{\r\n  width: 15%;\r\n  float: left;\r\n}\r\n\r\nImage{\r\n  padding-top: 20;\r\n  padding-bottom: 10;\r\n  height: 60;\r\n  /*border-bottom-width:1em;*/\r\n  border-bottom-color:#ccc;\r\n}\r\n\r\n.weui-btn{\r\n  position:relative;\r\n  display:block;\r\n  width:20%;\r\n  margin-left:auto;\r\n  margin-right:auto;\r\n  padding:8px 24px;\r\n  box-sizing:border-box;\r\n  font-weight:700;\r\n  font-size:17px;\r\n  text-align:center;\r\n  text-decoration:none;\r\n  color:#FFFFFF;\r\n  line-height:1.41176471;\r\n  border-radius:4px;\r\n  -webkit-tap-highlight-color:rgba(0, 0, 0, 0);\r\n  overflow:hidden;\r\n}\r\n.weui-btn_primary{\r\n  background-color:#07C160;\r\n}\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workalert/workalert-detail/workalert-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<ActionBar class=\"action-bar\">\r\n  <NavigationButton\r\n    ios:visibility=\"collapsed\"\r\n    icon=\"~/app/mobileTerminal/fonts/返回.png\"\r\n    (tap)=\"backToWorkalert()\"\r\n  ></NavigationButton>\r\n  <Label class=\"action-bar-title\" text=\"告警详情\" horizontalAlignment=\"left\"></Label>\r\n</ActionBar>\r\n\r\n<ScrollView>\r\n  <StackLayout>\r\n    <StackLayout>\r\n      <StackLayout>\r\n        <Label text=\"打磨机故障\" paddingTop=\"20\" fontSize=\"30\" color=\"#595959\" horizontalAlignment=\"center\"></Label>\r\n      </StackLayout>\r\n      <GridLayout rows=\"*\" columns=\"19/29*,20/29*\">\r\n        <Image col=\"0\" row=\"0\" src=\"~/app/mobileTerminal/fonts/已处理告警.png\" horizontalAlignment=\"right\"></Image>\r\n        <Label col=\"1\" row=\"0\" text=\"已处理\" paddingTop=\"20\" fontSize=\"20\" horizontalAlignment=\"left\"></Label>\r\n      </GridLayout>\r\n<!--      <StackLayout>-->\r\n<!--        <Label class=\"laybelTop\" textAlignment=\"center\" text=\"告警等级1\"></Label>-->\r\n<!--      </StackLayout>-->\r\n    </StackLayout>\r\n    <GridLayout rows=\"*, *, *, *, *, *, *, *, *, *\" columns=\"1/5*,2/5*, 2/5*\">\r\n      <Image row=\"0\" col=\"0\" src=\"~/app/mobileTerminal/fonts/category.png\" class=\"thumb img-circle\"></Image>\r\n      <Label row=\"0\" col=\"1\" class=\"labelLayout laybelBorder labelName\" text=\"告警的类型\"></Label>\r\n      <Label row=\"0\" col=\"2\" class=\"labelLayout laybelBorder labelText\" [text]=\"workAlert?workAlert.workAlertDef.oid:''\"></Label>\r\n\r\n      <Image row=\"1\" col=\"0\" src=\"~/app/mobileTerminal/fonts/priority.png\" class=\"thumb img-circle\"></Image>\r\n      <Label row=\"1\" col=\"1\" class=\"labelLayout laybelBorder labelName\" text=\"告警等级\"></Label>\r\n      <Label row=\"1\" col=\"2\" class=\"labelLayout laybelBorder labelText\" [text]=\"workAlert?workAlert.priority:''\"></Label>\r\n\r\n<!--      <Image row=\"2\" col=\"0\" src=\"~/app/mobileTerminal/fonts/messageText.png\" class=\"thumb img-circle\"></Image>-->\r\n<!--      <Label row=\"2\" col=\"1\" class=\"labelLayout labelName\" text=\"告警信息\"></Label>-->\r\n<!--      <Label row=\"2\" col=\"2\" class=\"labelLayout laybelBorder labelText\" [text]=\"workAlert?workAlert.messageText:''\"></Label>-->\r\n\r\n      <Image row=\"2\" col=\"0\" src=\"~/app/mobileTerminal/fonts/equipment.png\" class=\"thumb img-circle\"></Image>\r\n      <Label row=\"2\" col=\"1\" class=\"labelLayout laybelBorder labelName\" text=\"设备报警源\"></Label>\r\n      <Label row=\"2\" col=\"2\" class=\"labelLayout laybelBorder labelText\" [text]=\"workAlert?workAlert.equipment.name:''\"></Label>\r\n\r\n      <Image row=\"3\" col=\"0\" src=\"~/app/mobileTerminal/fonts/receiveHs.png\" class=\"thumb img-circle\"></Image>\r\n      <Label row=\"3\" col=\"1\" class=\"labelLayout laybelBorder labelName\" text=\"接收部门\"></Label>\r\n      <Label row=\"3\" col=\"2\" class=\"labelLayout laybelBorder labelText\" [text]=\"workAlert?workAlert.receiveHs[0].name:''\"></Label>\r\n\r\n      <Image row=\"4\" col=\"0\" src=\"~/app/mobileTerminal/fonts/receivers.png\" class=\"thumb img-circle\"></Image>\r\n      <Label row=\"4\" col=\"1\" class=\"labelLayout laybelBorder labelName\" text=\"接收人\"></Label>\r\n      <Label row=\"4\" col=\"2\" class=\"labelLayout laybelBorder labelText\" [text]=\"workAlert?workAlert.receivers.length>0 ? workAlert.receivers[0].name : '':''\"></Label>\r\n\r\n      <Image row=\"5\" col=\"0\" src=\"~/app/mobileTerminal/fonts/category.png\" class=\"thumb img-circle\"></Image>\r\n      <Label row=\"5\" col=\"1\" class=\"labelLayout laybelBorder labelName\" text=\"告警类型\"></Label>\r\n      <Label row=\"5\" col=\"2\" class=\"labelLayout laybelBorder labelText\" [text]=\"workAlert?workAlert.category:''\"></Label>\r\n\r\n<!--      <Image row=\"7\" col=\"0\" src=\"~/app/mobileTerminal/fonts/state.png\" class=\"thumb img-circle\"></Image>-->\r\n<!--      <Label row=\"7\" col=\"1\" class=\"labelLayout labelName\" text=\"报警的状态\"></Label>-->\r\n<!--      <Label row=\"7\" col=\"2\" class=\"labelLayout laybelBorder labelText\" [text]=\"workAlert?workAlert.state:''\"></Label>-->\r\n\r\n      <Image row=\"6\" col=\"0\" src=\"~/app/mobileTerminal/fonts/createdAt.png\" class=\"thumb img-circle\"></Image>\r\n      <Label row=\"6\" col=\"1\" class=\"labelLayout laybelBorder labelName\" text=\"创建时间\"></Label>\r\n      <Label row=\"6\" col=\"2\" class=\"labelLayout laybelBorder labelText\" [text]=\"workAlert?(workAlert.createdAt|date:'yy-MM-dd HH:mm:ss'):''\"></Label>\r\n\r\n      <Image row=\"7\" col=\"0\" src=\"~/app/mobileTerminal/fonts/updatedAt.png\" class=\"thumb img-circle\"></Image>\r\n      <Label row=\"7\" col=\"1\" class=\"labelLayout laybelBorder labelName\" text=\"更新时间\"></Label>\r\n      <Label row=\"7\" col=\"2\" class=\"labelLayout laybelBorder labelText\" [text]=\"workAlert?(workAlert.updatedAt|date:'yy-MM-dd HH:mm:ss'):''\"></Label>\r\n    </GridLayout>\r\n    <GridLayout columns=\"1/2*, 1/2*\" paddingTop=\"10\">\r\n      <Button col=\"0\" text=\"确定\" (tap)=\"confirm($event)\" class=\"weui-btn weui-btn_primary\" borderRadius=\"5\" marginLeft=\"10\"></Button>\r\n      <Button col=\"1\" text=\"取消\" (tap)=\"cancel($event)\" class=\"weui-btn weui-btn_primary\" borderRadius=\"5\" marginLeft=\"10\"></Button>\r\n    </GridLayout>\r\n  </StackLayout>\r\n</ScrollView>\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workalert/workalert-detail/workalert-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkalertDetailComponent", function() { return WorkalertDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _workalert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./app/mobileTerminal/mobile-pages/workalert/workalert.service.ts");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/nativescript-angular/index.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WorkalertDetailComponent = /** @class */ (function () {
    function WorkalertDetailComponent(route, routerExtensions, workAlertService, ngZone) {
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.workAlertService = workAlertService;
        this.ngZone = ngZone;
        this._id = '';
    }
    WorkalertDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngZone.run(function () {
            _this._id = _this.route.snapshot.params._id;
            _this.workAlertService.getWorkAlert(_this._id).subscribe(function (value) {
                if (value) {
                    _this.workAlert = value;
                }
                else {
                    _this.workAlert = null;
                }
            });
        });
    };
    WorkalertDetailComponent.prototype.backToWorkalert = function () {
        this.routerExtensions.back();
    };
    WorkalertDetailComponent.prototype.confirm = function (even) { };
    WorkalertDetailComponent.prototype.cancel = function (even) { };
    WorkalertDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "mes-m-workalert-detail",
            /*duleId: module.i*/
            template: __webpack_require__("./app/mobileTerminal/mobile-pages/workalert/workalert-detail/workalert-detail.component.html"),
            styles: [__webpack_require__("./app/mobileTerminal/mobile-pages/workalert/workalert-detail/workalert-detail.component.css")],
            providers: [_workalert_service__WEBPACK_IMPORTED_MODULE_2__["WorkAlertService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            nativescript_angular__WEBPACK_IMPORTED_MODULE_3__["RouterExtensions"],
            _workalert_service__WEBPACK_IMPORTED_MODULE_2__["WorkAlertService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]])
    ], WorkalertDetailComponent);
    return WorkalertDetailComponent;
}());



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workalert/workalert.component.css":
/***/ (function(module, exports) {

module.exports = ".label1{\r\n  width: 10%;\r\n  float: left;\r\n}\r\n.label2{\r\n  text-align: center;\r\n}\r\n.img-status{\r\n  width: 15%;\r\n  float: left;\r\n}\r\n.img-circle{\r\n  width: 15%;\r\n  float: right;\r\n}\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workalert/workalert.component.html":
/***/ (function(module, exports) {

module.exports = "<ActionBar class=\"action-bar\">\r\n  <NavigationButton\r\n    ios:visibility=\"collapsed\"\r\n    icon=\"~/app/mobileTerminal/fonts/返回.png\"\r\n    (tap)=\"backToHome()\"\r\n  ></NavigationButton>\r\n  <Label class=\"action-bar-title\" text=\"告警列表\" horizontalAlignment=\"left\"></Label>\r\n</ActionBar>\r\n\r\n<ScrollView class=\"page\">\r\n  <ListView class=\"list-group\" [items]=\"workalertList\" (itemTap)=\"onItemTap($event)\">\r\n    <ng-template let-item=\"item\" let-i=\"index\">\r\n      <GridLayout class=\"list-group-item\" rows=\"*\" columns=\"1/10*, 3/10*, 3/10*,2/10*, 1/10*\">\r\n        <Label row=\"0\" col=\"0\" class=\"label1\" [text]=\"i+1\"></Label>\r\n        <Label row=\"0\" col=\"1\" class=\"label2\" [text]=\"item.messageText\"></Label>\r\n        <Label row=\"0\" col=\"2\" class=\"label2\" [text]=\"item.updatedAt | date:'yy-MM-dd HH:mm:ss'\"></Label>\r\n        <Image row=\"0\" col=\"3\" *ngIf=\"item.state=='processed'\" src=\"~/app/mobileTerminal/fonts/已处理告警.png\" class=\"thumb img-status\"></Image>\r\n        <Image row=\"0\" col=\"3\" *ngIf=\"item.state=='Processing'\" src=\"~/app/mobileTerminal/fonts/正在处理告警.png\" class=\"thumb img-status\"></Image>\r\n        <Image row=\"0\" col=\"3\" *ngIf=\"item.state=='To be processed'\" src=\"~/app/mobileTerminal/fonts/未处理告警.png\" class=\"thumb img-status\"></Image>\r\n        <Image row=\"0\" col=\"3\" *ngIf=\"item.state=='Not processed yet'\" src=\"~/app/mobileTerminal/fonts/已清除告警.png\" class=\"thumb img-status\"></Image>\r\n        <Image row=\"0\" col=\"4\" src=\"~/app/mobileTerminal/fonts/跳转箭头灰色.png\" class=\"thumb img-circle\"></Image>\r\n      </GridLayout>\r\n    </ng-template>\r\n  </ListView>\r\n</ScrollView>\r\n"

/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workalert/workalert.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkalertComponent", function() { return WorkalertComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/nativescript-angular/index.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _workalert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./app/mobileTerminal/mobile-pages/workalert/workalert.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WorkalertComponent = /** @class */ (function () {
    function WorkalertComponent(routerExtensions, workAlertService) {
        this.routerExtensions = routerExtensions;
        this.workAlertService = workAlertService;
        this.workalertList = [];
    }
    WorkalertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.workAlertService.getWorkAlerts().subscribe(function (val) {
            _this.workalertList = val;
        });
    };
    WorkalertComponent.prototype.onItemTap = function (args) {
        this.routerExtensions.navigate(["/workalert/workalert-detail/" + this.workalertList[args.index]._id]);
    };
    WorkalertComponent.prototype.backToHome = function () {
        this.routerExtensions.back();
    };
    WorkalertComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "mes-m-workalert",
            /*duleId: module.i*/
            template: __webpack_require__("./app/mobileTerminal/mobile-pages/workalert/workalert.component.html"),
            styles: [__webpack_require__("./app/mobileTerminal/mobile-pages/workalert/workalert.component.css")],
            providers: [_workalert_service__WEBPACK_IMPORTED_MODULE_2__["WorkAlertService"]]
        }),
        __metadata("design:paramtypes", [nativescript_angular__WEBPACK_IMPORTED_MODULE_1__["RouterExtensions"],
            _workalert_service__WEBPACK_IMPORTED_MODULE_2__["WorkAlertService"]])
    ], WorkalertComponent);
    return WorkalertComponent;
}());



/***/ }),

/***/ "./app/mobileTerminal/mobile-pages/workalert/workalert.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkAlertService", function() { return WorkAlertService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_data_message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./app/@core/data/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json' })
};
var WorkAlertService = /** @class */ (function () {
    // //此3步骤为父组件和子组件共享同一个WorkAlertService并实现双向传值。
    // //1. Observable IWorkAlert sources
    // private workAlertSource = new Subject<IWorkAlert>();
    //
    // //2. Observable IWorkAlert streams
    // workAlert$ = this.workAlertSource.asObservable();
    //
    // //3. Service message commands 将实体参数传递给workAlertSource
    // passWorkAlert(workAlert:IWorkAlert){
    //   this.workAlertSource.next(workAlert);
    // }
    function WorkAlertService(http, messageService) {
        this.http = http;
        this.messageService = messageService;
        this.baseUrl = "http://100.13.32.237:9000";
    }
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    WorkAlertService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _this.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(result);
        };
    };
    /** Log a HeroService message with the MessageService */
    WorkAlertService.prototype.log = function (message) {
        this.messageService.add("WorkAlertService: " + message);
    };
    /**
     * 获取所有的报警信息
     * @return {Observable<IWorkAlert[]>} [报警信息Array]
     */
    WorkAlertService.prototype.getWorkAlerts = function (field, sort) {
        var _this = this;
        if (field === void 0) { field = ''; }
        if (sort === void 0) { sort = '-_id'; }
        // const url = `${this.baseUrl}/?field=${field}&sort=${sort}`;
        var url = this.baseUrl + "/api/workAlerts/";
        // const url = 'http://v.juhe.cn/weather/index?cityname=%E5%B9%BF%E5%B7%9E&dtype=json&format=1&key=01a8bebfe082b533c7e10c864498871f';
        return this.http.get(url)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (_) { return _this.log('fetched getWorkAlerts'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('getWorkAlerts', [])));
    };
    /**
     * 根据 _id 获取单个报警信息
     * @param  {string}                 id [报警信息的 _id]
     * @return {Observable<IWorkAlert>}    [单个报警信息]
     */
    WorkAlertService.prototype.getWorkAlert = function (id) {
        var _this = this;
        var url = this.baseUrl + "/api/workAlerts/" + id;
        return this.http.get(url)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (_) { return _this.log('fetched getWorkAlert'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('getWorkAlert')));
    };
    WorkAlertService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _core_data_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"]])
    ], WorkAlertService);
    return WorkAlertService;
}());



/***/ }),

/***/ "./main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var nativescript_angular_platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-angular/platform.js");
/* harmony import */ var nativescript_angular_platform__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular_platform__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./app/app.module.ts");

        let applicationCheckPlatform = __webpack_require__("../node_modules/tns-core-modules/application/application.js");
        if (applicationCheckPlatform.android && !global["__snapshot"]) {
            __webpack_require__("../node_modules/tns-core-modules/ui/frame/frame.js");
__webpack_require__("../node_modules/tns-core-modules/ui/frame/activity.js");
        }

        
            __webpack_require__("../node_modules/nativescript-dev-webpack/load-application-css-angular.js")();
            
            
        if (true) {
            const hmrUpdate = __webpack_require__("../node_modules/nativescript-dev-webpack/hmr/index.js").hmrUpdate;
            global.__initialHmrUpdate = true;
            global.__hmrSyncBackup = global.__onLiveSync;

            global.__onLiveSync = function () {
                hmrUpdate();
            };

            global.hmrRefresh = function({ type, path } = {}) {
                if (global.__initialHmrUpdate) {
                    return;
                }

                setTimeout(() => {
                    global.__hmrSyncBackup({ type, path });
                });
            };

            hmrUpdate().then(() => {
                global.__initialHmrUpdate = false;
            })
        }
        
            
        __webpack_require__("../node_modules/tns-core-modules/bundle-entry-points.js");
        

var options_Generated = {};

if (true) {
    options_Generated = {
        hmrOptions: {
            moduleTypeFactory: function () { return __webpack_require__("./app/app.module.ts").AppModule; },
            livesyncCallback: function (platformReboot) { setTimeout(platformReboot, 0); }
        }
    };
}

if (true) {
    module["hot"].accept(["./app/app.module.ts"], function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _app_app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./app/app.module.ts");
(function () {
        global["hmrRefresh"]({});
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}
// A traditional NativeScript application starts by initializing global objects, setting up global CSS rules, creating, and navigating to the main page. 
// Angular applications need to take care of their own initialization: modules, components, directives, routes, DI providers. 
// A NativeScript Angular app needs to make both paradigms work together, so we provide a wrapper platform object, platformNativeScriptDynamic, 
// that sets up a NativeScript application and can bootstrap the Angular framework.
nativescript_angular_platform__WEBPACK_IMPORTED_MODULE_0__["platformNativeScriptDynamic"](Object.assign({}, options_Generated)).bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"]);

    
        
        
    
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./package.json":
/***/ (function(module) {

module.exports = {"android":{"v8Flags":"--expose_gc"},"main":"main.js","name":"migration-ng","version":"4.1.0"};

/***/ })

/******/ });