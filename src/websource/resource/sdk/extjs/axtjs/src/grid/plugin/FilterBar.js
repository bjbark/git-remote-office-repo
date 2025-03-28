/**
 * Plugin that enable filters on the grid headers.<br>
 * The header filters are integrated with new Ext4 <code>Ext.data.Store</code> filters.<br>
 *
 * @author Ing. Leonardo D'Onofrio (leonardo_donofrio at hotmail.com)
 * @version 1.1.2 (supports 4.1.1)
 * @updated 2011-10-18 by Ing. Leonardo D'Onofrio (leonardo_donofrio at hotmail.com)
 * Support renderHidden config option, isVisible(), and setVisible() methods (added getFilterBar() method to the grid)
 * Fix filter bug that append filters to Store filters MixedCollection
 * Fix layout broken on initial render when columns have width property
 * @updated 2011-10-24 by Ing. Leonardo D'Onofrio (leonardo_donofrio at hotmail.com)
 * Rendering code rewrited, filters are now rendered inside de column headers, this solves scrollable grids issues, now scroll, columnMove, and columnHide/Show is handled by the headerCt
 * Support showClearButton config option, render a clear Button for each filter to clear the applied filter (uses Ext.ux.form.field.ClearButton plugin)
 * Added clearFilters() method.
 * @updated 2011-10-25 by Ing. Leonardo D'Onofrio (leonardo_donofrio at hotmail.com)
 * Allow preconfigured filter's types and auto based on store field data types
 * Auto generated stores for combo and list filters (local collect or server in autoStoresRemoteProperty response property)
 * @updated 2011-10-26 by Ing. Leonardo D'Onofrio (leonardo_donofrio at hotmail.com)
 * Completelly rewriten to support reconfigure filters on grid's reconfigure
 * Supports clearAll and showHide buttons rendered in an actioncolumn or in new generetad small column
 * @updated 2011-10-27 by Ing. Leonardo D'Onofrio (leonardo_donofrio at hotmail.com)
 * Added support to 4.0.7 (columnresize not fired correctly on this build)
 * @updated 2011-11-02 by Ing. Leonardo D'Onofrio (leonardo_donofrio at hotmail.com)
 * Filter on ENTER
 * Defaults submitFormat on date filter to 'Y-m-d' and use that in applyFilters for local filtering
 * Added null value support on combo and list filters (autoStoresNullValue and autoStoresNullText)
 * Fixed some combo styles
 * @updated 2011-11-10 by Ing. Leonardo D'Onofrio (leonardo_donofrio at hotmail.com)
 * Parse and show initial filters applied to the store (only property -> value filters, filterFn is unsuported)
 * @updated 2011-12-12 by Ing. Leonardo D'Onofrio (leonardo_donofrio at hotmail.com)
 * Extends AbstractPlugin and use Observable as a Mixin
 * Yes/No localization on constructor
 * @updated 2012-01-03 by Ing. Leonardo D'Onofrio (leonardo_donofrio at hotmail.com)
 * Added some support for 4.1 beta
 * @updated 2012-01-05 by Ing. Leonardo D'Onofrio (leonardo_donofrio at hotmail.com)
 * 99% support for 4.1 beta. Seems to be working
 * @updated 2012-03-22 by Ing. Leonardo D'Onofrio (leonardo_donofrio at hotmail.com)
 * Fix focusFirstField method
 * Allow to specify listConfig in combo filter
 * Intercept column's setPadding for all columns except actionColumn or extraColumn (fix checkBoxSelectionModel header)
 * @updated 2012-05-07 by Ing. Leonardo D'Onofrio (leonardo_donofrio at hotmail.com)
 * Fully tested on 4.1 final
 * @updated 2012-05-31 by Ing. Leonardo D'Onofrio (leonardo_donofrio at hotmail.com)
 * Fix padding issue on checkbox column
 * @updated 2012-07-10 by Ing. Leonardo D'Onofrio (leonardo_donofrio at hotmail.com)
 * Add msgTarget: none to field to fix overridding msgTarget to side in fields in 4.1.1
 * @updated 2012-07-26 by Ing. Leonardo D'Onofrio (leonardo_donofrio at hotmail.com)
 * Fixed sort on enter bug regression
 * add checkChangeBuffer: 50 to field, this way works as expected if this config is globally overridden
 * private method applyFilters refactored to support delayed (key events) and instant filters (enter key and combo/picker select event)
 * @updated 2012-07-31 by Ing. Leonardo D'Onofrio (leonardo_donofrio at hotmail.com)
 * Added operator selection in number and date filters
 * @updated 2013-09-06 by Joe Nilson (joenilson at gmail dot com)
 * Changed to docked bar to work with grouped header, using the code from:
 * http://www.sencha.com/forum/showthread.php?152923-Ext.ux.grid.FilterBar-plugin&p=917075&viewfull=1#post917075
 * @updated 2013-09-11 by Joe Nilson (joenilson at gmail dot com)
 * Fixed docked bar to render correctly the checkbox header column in selmodel
 * @updated 2013-11-15 by Joe Nilson (joenilson at gmail dot com)
 * Applied a fix to rendering the column headers using the code from:
 * http://www.sencha.com/forum/showthread.php?152923-Ext.ux.grid.FilterBar-plugin&p=1002888&viewfull=1#post1002888
 * @updated 2013-11-15 by Loiane Groner (me at loiane dot com)
 * Applied a fix to disable filter using the code from:
 * http://www.sencha.com/forum/showthread.php?152923-Ext.ux.grid.FilterBar-plugin&p=1035991&viewfull=1#post1035991
 * @updated 2014-09-02 by Pat Mächler (p.maechler at iwf.ch)
 * Fixed major code quality issues with JSHint
 */

Ext.define('Axt.grid.plugin.FilterBar', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.filterbar',
	uses: [
		'Ext.window.MessageBox',
		'Axt.form.field.plugin.ClearButton',
		'Axt.form.field.plugin.OperatorButton',
		'Ext.container.Container',
		'Ext.util.DelayedTask',
		'Ext.layout.container.HBox',
		'Ext.data.ArrayStore',
		'Ext.button.Button',
		'Ext.form.field.Text',
		'Ext.form.field.Number',
		'Ext.form.field.Date',
		'Ext.form.field.ComboBox'
	],
	mixins: {
		observable: 'Ext.util.Observable'
	},

	updateBuffer: 100,					// buffer time to apply filtering when typing/selecting

	columnFilteredCls: Ext.baseCSSPrefix + 'column-filtered', // CSS class to apply to the filtered column header

	renderHidden: true,					// renders the filters hidden by default, use in combination with showShowHideButton
	showShowHideButton: true,					// add show/hide button in actioncolumn header if found, if not a new small column is created
	showHideButtonTooltipDo: '필터 표시',	// button tooltip show
	showHideButtonTooltipUndo: '필터 숨김',	// button tooltip hide
	showHideButtonIconCls: 'filter',				// button iconCls

	showClearButton: false,				// use Ext.ux.form.field.ClearButton to allow user to clear each filter, the same as showShowHideButton
	showClearAllButton: true,					// add clearAll button in actioncolumn header if found, if not a new small column is created
	clearAllButtonIconCls: 'clear-filters', 		// css class with the icon of the clear all button
	clearAllButtonTooltip: 'Clear all filters',	// button tooltip
	autoStoresRemoteProperty: 'autoStores',			// if no store is configured for a combo filter then stores are created automatically, if remoteFilter is true then use this property to return arrayStores from the server
	autoStoresNullValue: '',					// value send to the server to expecify null filter
	autoStoresNullText: '',					// NULL Display Text
	autoUpdateAutoStores: false,				// if set to true combo autoStores are updated each time that a filter is applied

	enableOperators: true,					// enable operator selection for number and date filters

	boolTpl: {
		xtype: 'combo',
		queryMode: 'local',
		forceSelection: true,
		triggerAction: 'all',
		editable: false,
		store: [
			[1, 'Yes'],
			[0, 'No']
		],
		operator: 'eq'
	},
	dateTpl: {
		xtype: 'datefield',
		editable: true,
		submitFormat: 'Y-m-d',
		operator: 'eq'
	},
	floatTpl: {
		xtype: 'numberfield',
		allowDecimals: true,
		minValue: 0,
		hideTrigger: true,
		keyNavEnabled: false,
		mouseWheelEnabled: false,
		operator: 'eq'
	},
	intTpl: {
		xtype: 'numberfield',
		allowDecimals: false,
		minValue: 0,
		operator: 'eq'
	},
	stringTpl: {
		xtype: 'textfield',
		operator: 'like'
	},
	comboTpl: {
		xtype: 'combo',
		queryMode: 'local',
		forceSelection: true,
		editable: false,
		triggerAction: 'all',
		operator: 'eq'
	},
	listTpl: {
		xtype: 'combo',
		queryMode: 'local',
		forceSelection: true,
		editable: false,
		triggerAction: 'all',
		multiSelect: true,
		operator: 'in'
	},
	disabledTpl: {
		xtype: 'textfield',
		disabled: true
	},

	constructor: function() {
		var me = this;

		me.boolTpl.store[0][1] = Ext.MessageBox.buttonText.yes;
		me.boolTpl.store[1][1] = Ext.MessageBox.buttonText.no;

		me.mixins.observable.constructor.call(me);
		me.callParent(arguments);
	},

	// private
	init: function(grid) {
		var me = this;

		grid.on({
			columnresize: me.resizeContainer,
			columnhide: me.resizeContainer,
			columnshow: me.resizeContainer,
			beforedestroy: me.unsetup,
			reconfigure: me.resetup,
			columnmove: me.columnmove,
			scope: me
		});

		grid.addEvents('filterupdated');

		Ext.apply(grid, {
			filterBar: me,
			getFilterBar: function() {
				return this.filterBar;
			}
		});

		me.setup(grid);
		var chkInterval = 0;
		var chkEl = setInterval(function() {
			if (grid.view) {
				if (grid.view.getEl()) {
					var filterEl = document.getElementById(grid.id + '-filter-bar-innerCt');
					grid.view.getEl().on('scroll', function() {
						var max = filterEl.scrollWidth - filterEl.clientWidth;
						//	            	if(grid.view.getEl().dom.scrollLeft < max){
						filterEl.scrollLeft = grid.view.getEl().dom.scrollLeft;
						//	            	}else{
						//	            		grid.view.getEl().dom.scrollLeft = filterEl.scrollLeft+1;
						//	            	}
					});
					chkInterval = 1;
				}
			} else {
				chkInterval = 1;
			}
			if (chkInterval == 1) {
				clearInterval(chkEl);
			}
		}, 2000);
	},

	// private
	setup: function(grid) {
		var me = this;

		me.grid = grid;
		me.visible = me.renderHidden;
		me.autoStores = Ext.create('Ext.util.MixedCollection');
		me.autoStoresLoaded = false;
		me.columns = Ext.create('Ext.util.MixedCollection');
        /*
         * Commented to set a bar of filters
         me.containers = Ext.create('Ext.util.MixedCollection');
         */
        /*
         * Added to get filter bar in a row
         */

		grid.addDocked(
			me.filterBar = Ext.create('Ext.container.Container', {  // adds a filter bar to grid
				id: grid.id + '-filter-bar',
				weight: 100,
				height: 23,
				dock: 'top',
				border: true,
				baseCls: Ext.baseCSSPrefix + 'grid-header-ct',
				style: 'border-top-color: #c5c5c5;',
				layout: {
					type: 'hbox'
				}
			})
		);

		me.fields = Ext.create('Ext.util.MixedCollection');
		me.actionColumn = me.grid.down('actioncolumn') || me.grid.down('actioncolumnpro');
		me.extraColumn = null;
		me.clearAllEl = null;
		me.showHideEl = null;
		me.task = Ext.create('Ext.util.DelayedTask');
		me.filterArray = [];

		me.overrideProxy();
		me.parseFiltersConfig(); 	// sets me.columns and me.autoStores
		me.parseInitialFilters();   // sets me.filterArray with the store previous filters if any (adds operator and type if missing)
		me.renderExtraColumn(); 	// sets me.extraColumn if applicable

		// renders the filter's bar
		if (grid.rendered) {
			me.renderFilterBar(grid);

		} else {
			//            grid.on('afterrender', me.renderFilterBar, me, { single: true });
			grid.on('viewready', me.renderFilterBar, me, { single: true });
		}
	},

	// private
	unsetup: function(grid) {
		var me = this;

		if (me.autoStores.getCount()) {
			me.grid.store.un('load', me.fillAutoStores, me);
		}
		me.destroy();
		//        me.autoStores.each(function(item) {
		//            Ext.destroy(item);
		//        });
		//        me.autoStores.clear();
		//        me.autoStores = null;
		//        me.columns.each(function(column) {
		//            if (column.rendered) {
		//                if(column.getEl().hasCls(me.columnFilteredCls)) {
		//                    column.getEl().removeCls(me.columnFilteredCls);
		//                }
		//            }
		//        }, me);
		//        me.columns.clear();
		//        me.columns = null;
		//        me.fields.each(function(item) {
		//            Ext.destroy(item);
		//        });
		//        me.fields.clear();
		//        me.fields = null;
		//
		//        /*
		//         * Commented
		//         *
		//         me.containers.each(function(item) {
		//         Ext.destroy(item);
		//         });
		//         me.containers.clear();
		//         me.containers = null;
		//         */
		//
		//        // Filter bar added
		//        me.filterBar.removeAll();
		//        me.filterBar = null;
		//
		//        if (me.clearAllEl) {
		//            Ext.destroy(me.clearAllEl);
		//            me.clearAllEl = null;
		//        }
		//        if (me.showHideEl) {
		//            Ext.destroy(me.showHideEl);
		//            me.showHideEl = null;
		//        }
		//        if (me.extraColumn) {
		//            me.grid.headerCt.items.remove(me.extraColumn);
		//            Ext.destroy(me.extraColumn);
		//            me.extraColumn = null;
		//        }
		//        me.task = null;
		//        me.filterArray = null;
	},

	// private
	resetup: function(grid) {
		var me = this;

		me.unsetup(grid);
		me.setup(grid);
	},
	updateAction: function(store) {								//TODO 2021-04-09 스토어가 reload되면 자동으로 값을 업데이트해준다  -장우영
		var me = this;
		me.grid.store.on('datachanged', me.fillAutoStores, me);
	},
	// private
	overrideProxy: function() {
		var me = this;

		// override encodeFilters to append type and operator in remote filtering
		Ext.apply(me.grid.store.proxy, {
			encodeFilters: function(filters) {
				var min = [],
					length = filters.length
					;

				for (i = 0; i < length; i++) {
					min[i] = {
						property: filters[i].property,
						value: filters[i].value
					};
					if (filters[i].type) {
						min[i].type = filters[i].type;
					}
					if (filters[i].operator) {
						min[i].operator = filters[i].operator;
					}
				}
				return this.applyEncoding(min);
			}
		});
	},

	// private
	parseFiltersConfig: function() {
		var me = this;
		// -- var columns = this.grid.headerCt.getGridColumns();
		// ++ var columns = this.getGridColumns();
		var columns = this.getGridColumns();
		me.columns.clear();
		me.autoStores.clear();
		Ext.each(columns, function(column) {
			if (column.initialConfig.xtype != 'checkcolumn') {
				if (column.filter === true || column.filter === 'auto' || column.filter == undefined) { // automatic types configuration (store based)
					if (me.grid.store.model.prototype.fields.get(column.dataIndex)) {
						var type = me.grid.store.model.prototype.fields.get(column.dataIndex).type.type;
					} else {
						type = 'string';
					}
					if (type == 'auto') type = 'string';
					column.filter = type;
				}
				if (Ext.isString(column.filter)) {
					column.filter = {
						type: column.filter // only set type to then use templates
					};
				}
				if (column.initialConfig.xtype) {
					if (column.initialConfig.xtype == 'actioncolumn') {
						column.filter = Ext.applyIf(column.filter, me['disabled' + 'Tpl']);
					} else {
						column.filter = Ext.applyIf(column.filter, me['list' + 'Tpl']);
					}
				} else {
					if (column.filter.type) {
						if (column.filter.type == 'disabled') {
							column.filter = Ext.applyIf(column.filter, me[column.filter.type + 'Tpl']);
						} else {
							column.filter = Ext.applyIf(column.filter, me['list' + 'Tpl']); // also use templates but with user configuration
						}
					}
				}
				if (column.filter.xtype == 'combo' && !column.filter.store && column.initialConfig.xtype != 'lookupcolumn') {
					column.autoStore = true;
					column.filter.store = Ext.create('Ext.data.ArrayStore', {
						fields: [{
							name: 'text'
						}, {
							name: 'id'
						}]
					});
					me.autoStores.add(column.dataIndex, column.filter.store);
					column.filter = Ext.apply(column.filter, {
						displayField: 'text',
						valueField: 'id'
					});
				} else if (column.initialConfig.xtype == 'lookupcolumn' && !column.filter.store) {
					column.autoStore = true;
					column.filter.store = Ext.create('Ext.data.ArrayStore', {
						fields: [{
							name: 'id'
						}, {
							name: 'text'
						}],
					});

					var Lookup = [];
					for (var i = 0; i < column.initialConfig.lookupValue.length; i++) {
						var record = Ext.create(column.filter.store.model.modelName, {		// 빈값
							id: column.initialConfig.lookupValue[i][0],
							text: column.initialConfig.lookupValue[i][1],
						});
						Lookup.push(record);
					}
					column.filter.store.removeAll();										// store clear
					column.filter.store.loadData(Lookup);
					me.autoStores.add(column.dataIndex, column.filter.store);
					;
					column.filter = Ext.apply(column.filter, {
						displayField: 'text',
						valueField: 'id'
					});
				}

				if (!column.filter.type) {
					switch (column.filter.xtype) {
						case 'combo':
							column.filter.type = (column.filter.multiSelect ? 'list' : 'combo');
							break;
						case 'datefield':
							column.filter.type = 'date';
							break;
						case 'numberfield':
							column.filter.type = (column.filter.allowDecimals ? 'float' : 'int');
							break;
						default:
							column.filter.type = 'string'
					}
				}

				if (!column.filter.operator) {
					column.filter.operator = me[column.filter.type + 'Tpl'].operator;
				}
				me.columns.add(column.dataIndex, column);
			}
		}, me);
		if (me.autoStores.getCount()) {
			if (me.grid.store.getCount() > 0) {
				me.fillAutoStores(me.grid.store);
			}
			if (me.grid.store.remoteFilter) {
				var autoStores = [];
				me.autoStores.eachKey(function(key, item) {
					autoStores.push(key);
				});
				me.grid.store.proxy.extraParams = me.grid.store.proxy.extraParams || {};
				me.grid.store.proxy.extraParams[me.autoStoresRemoteProperty] = autoStores;
			}
			me.grid.store.on('load', me.fillAutoStores, me);
		}
	},

	// private
	fillAutoStores: function(store) {
		var me = this;
		//        if (!me.autoUpdateAutoStores && me.autoStoresLoaded) return;
		var columns = this.getGridColumns();
		me.clearFiltersAll();
		me.autoStores.eachKey(function(key, item) {
			var field = me.fields.get(key);
			var column;
			if (key) {
				for (var i = 0; i < columns.length; i++) {
					if (columns[i].dataIndex == key) {
						column = columns[i];
						break;
					}
				}
				if (field) {
					field.suspendEvents();
					var fieldValue = field.getValue();
				}
				if (column.initialConfig.xtype != 'lookupcolumn') {
					if (!store.remoteFilter) { // values from local store
						var data = store.collect(key, true, false).sort();
						var records = [];
						Ext.each(data, function(txt) {
							if (Ext.isEmpty(txt)) {
								Ext.Array.insert(records, 0, [{
									text: me.autoStoresNullText,
									id: me.autoStoresNullValue
								}]);
							} else {
								records.push({
									text: txt,
									id: txt
								});
							}
						});
						item.loadData(records);
					} else { // values from server
						if (store.proxy.reader.rawData[me.autoStoresRemoteProperty]) {
							var data = store.proxy.reader.rawData[me.autoStoresRemoteProperty];
							if (data[key]) {
								var records = [];
								Ext.each(data[key].sort(), function(txt) {
									if (Ext.isEmpty(txt)) {
										Ext.Array.insert(records, 0, [{
											text: me.autoStoresNullText,
											id: me.autoStoresNullValue
										}]);
									} else {
										records.push({
											text: txt,
											id: txt
										});
									}
								});
								item.loadData(records);
							}
						}
					}
					if (field) {
						field.setValue(fieldValue);
						field.resumeEvents();
					}
				}
			}

		}, me);
		me.autoStoresLoaded = true;
		if (me.grid.store.remoteFilter && !me.autoUpdateAutoStores) {
			delete me.grid.store.proxy.extraParams[me.autoStoresRemoteProperty];
		}
	},

	// private
	parseInitialFilters: function() {
		var me = this;

		me.filterArray = [];
		me.grid.store.filters.each(function(filter) {
			// try to parse initial filters, for now filterFn is unsuported
			if (Ext.isEmpty(filter.value)) {
				me.filterArray.push(true);
			} else
				if (filter.property && !Ext.isEmpty(filter.value) && me.columns.get(filter.property)) {
					if (!filter.type) filter.type = me.columns.get(filter.property).filter.type;
					if (!filter.operator) filter.operator = me.columns.get(filter.property).filter.operator;
					me.filterArray.push(filter);
				}
		}, me);
	},

	// private
	renderExtraColumn: function() {
		var me = this;

		if (me.columns.getCount() && !me.actionColumn && (me.showClearAllButton || me.showShowHideButton)) {
			var extraColumnCssClass = Ext.baseCSSPrefix + 'filter-bar-extra-column-hack';
			if (!document.getElementById(extraColumnCssClass)) {
				var style = document.createElement('style');
				var css = 'tr.' + Ext.baseCSSPrefix + 'grid-row td.' + extraColumnCssClass + ' { background-color: #ffffff !important; border-color: #ffffff !important; }';
				style.setAttribute('type', 'text/css');
				style.setAttribute('id', extraColumnCssClass);
				document.body.appendChild(style);
				if (style.styleSheet) {   	// IE
					style.styleSheet.cssText = css;
				} else {                	// others
					var cssNode = document.createTextNode(css);
					style.appendChild(cssNode);
				}
			}
			me.extraColumn = Ext.create('Ext.grid.column.Column', {
				draggable: false,
				hideable: false,
				menuDisabled: true,
				sortable: false,
				resizable: false,
				fixed: true,
				width: 48,
				minWidth: 28,
				maxWidth: 48,
				header: '&nbsp;',
				tdCls: extraColumnCssClass
			});
			me.grid.headerCt.add(me.extraColumn);
		}
	},

	// private
	renderFilterBar: function(grid) {
		var me = this;
        /*
         me.containers.clear();
         */
        /*
         * Added to filter bar row
         */
		me.filterBar.removeAll();
		me.fields.clear();
		var i = 0;
		me.columns.eachKey(function(key, column) {
			var listConfig = column.filter.listConfig || {};
			listConfig = Ext.apply(listConfig, {
				style: 'border-top-width: 1px'
			});
			var plugins = [];
			if (me.showClearButton) {
				plugins.push({
					ptype: 'clearbutton'
				});
			}
			if (me.enableOperators && (column.filter.type == 'date' || column.filter.type == 'int' || column.filter.type == 'float')) {
				plugins.push({
					ptype: 'operatorbutton',
					listeners: {
						operatorchanged: function(txt) {
							if (Ext.isEmpty(txt.getValue())) return;
							me.applyInstantFilters(txt);
						}
					}
				});
			}
			if (i == 0 && grid.selModel.selType == "checkboxmodel") {
				me.fields.add(0, field);
				var container = Ext.create('Ext.container.Container', {
					id: grid.id + '-filter-container-' + i,
					baseCls: Ext.baseCSSPrefix + 'column-header',
					dataIndex: 'clear',
					layout: 'hbox',
					bodyStyle: 'background-color: "transparent";text-align:"center";',
					width: 24,
					height: 24,
					items: [{
						xtype: 'button',
						width: 23,
						text: 'X',
						listeners: {
							click: function(a, b, c) {
								me.clearFiltersAll();
							}
						}
						//                    	cls: 'ext-ux-clearbutton',
						//                        'data-qtip': me.clearAllButtonTooltip,

					}],
					listeners: {
						scope: me,
						element: 'el',
						mousedown: function(e) { e.stopPropagation(); },
						click: function(e) { e.stopPropagation(); },
						dblclick: function(e) { e.stopPropagation(); },
						keydown: function(e) { e.stopPropagation(); },
						keypress: function(e) { e.stopPropagation(); },
						keyup: function(e) { e.stopPropagation(); }
					}
				});
            	/*
                 me.containers.add(column.dataIndex, container);
                 container.render(Ext.get(column.id));
            	 */
            	/*
            	 * Added to filter bar row
            	 */
				me.filterBar.add(container);    // adds the container to filterBar
			}
			if ( column.xtype == "checkboxmodel") {
				me.fields.add(0, field);
				var container = Ext.create('Ext.container.Container', {
					id: grid.id + '-filter-container-' + i,
					baseCls: Ext.baseCSSPrefix + 'column-header',
					dataIndex: 'clear',
					layout: 'hbox',
					bodyStyle: 'background-color: "transparent";text-align:"center";',
					width: 24,
					height: 24,
					items: [{
						xtype: 'button',
						width: 23,
						text: 'X',
						listeners: {
							click: function(a, b, c) {
								me.clearFiltersAll();
							}
						}
						//                    	cls: 'ext-ux-clearbutton',
						//                        'data-qtip': me.clearAllButtonTooltip,

					}],
					listeners: {
						scope: me,
						element: 'el',
						mousedown: function(e) { e.stopPropagation(); },
						click: function(e) { e.stopPropagation(); },
						dblclick: function(e) { e.stopPropagation(); },
						keydown: function(e) { e.stopPropagation(); },
						keypress: function(e) { e.stopPropagation(); },
						keyup: function(e) { e.stopPropagation(); }
					}
				});
            	/*
                 me.containers.add(column.dataIndex, container);
                 container.render(Ext.get(column.id));
            	 */
            	/*
            	 * Added to filter bar row
            	 */
				me.filterBar.add(container);    // adds the container to filterBar
			}
			var field = Ext.widget(column.filter.xtype, Ext.apply(column.filter, {
				dataIndex: key,
				flex: 1,
				margin: 0,
				fieldStyle: 'border-left-width: 0px; border-bottom-width: 0px;',
				listConfig: listConfig,
				preventMark: true,
				msgTarget: 'none',
				checkChangeBuffer: 50,
				enableKeyEvents: true,
				listeners: {
					change: me.applyDelayedFilters,
					select: me.applyInstantFilters,
					keypress: function(txt, e) {
						if (e.getCharCode() == 13) {
							e.stopEvent();
							me.applyInstantFilters(txt);
						}
						return false;
					},
					scope: me
				},
				plugins: plugins
			}));
			me.fields.add(++i, field);
			//var container = Ext.create('Ext.container.Container', {

            /*
             * Added for filter bar row
             */
			var container = Ext.create('Ext.container.Container', {
				id: grid.id + '-filter-container-' + i,
				baseCls: Ext.baseCSSPrefix + 'column-header',
				dataIndex: key,
				layout: 'hbox',
				bodyStyle: 'background-color: "transparent";',
				width: column.getWidth(),
				items: [field],
				listeners: {
					scope: me,
					element: 'el',
					mousedown: function(e) { e.stopPropagation(); },
					click: function(e) { e.stopPropagation(); },
					dblclick: function(e) { e.stopPropagation(); },
					keydown: function(e) { e.stopPropagation(); },
					keypress: function(e) { e.stopPropagation(); },
					keyup: function(e) { e.stopPropagation(); }
				}
			});
            /*
             me.containers.add(column.dataIndex, container);
             container.render(Ext.get(column.id));
             */
            /*
             * Added to filter bar row
             */
			me.filterBar.add(container);    // adds the container to filterBar
			if (i == me.columns.length) {
				me.fields.add(++i, field);
				var con = Ext.create('Ext.container.Container', {
					id: grid.id + '-filter-container-' + i,
					baseCls: Ext.baseCSSPrefix + 'column-header',
					dataIndex: 'lastTemp',
					layout: 'hbox',
					bodyStyle: 'background-color: "transparent";text-align:"center";',
					width: 47,
					height: 22,
					items: [{
						xtype: 'label',
						text: '',
					}],
					listeners: {
						scope: me,
						element: 'el',
						mousedown: function(e) { e.stopPropagation(); },
						click: function(e) { e.stopPropagation(); },
						dblclick: function(e) { e.stopPropagation(); },
						keydown: function(e) { e.stopPropagation(); },
						keypress: function(e) { e.stopPropagation(); },
						keyup: function(e) { e.stopPropagation(); }
					}
				});
            	/*
                 me.containers.add(column.dataIndex, container);
                 container.render(Ext.get(column.id));
            	 */
            	/*
            	 * Added to filter bar row
            	 */
				me.filterBar.add(con);    // adds the container to filterBar
				me.fields.add(++i, field);
				var con = Ext.create('Ext.container.Container', {
					id: grid.id + '-filter-container-' + i,
					dataIndex: 'lastTemp',
					layout: 'hbox',
					bodyStyle: 'background-color: "transparent";text-align:"center";',
					width: 17,
					height: 22,
					items: [{
						xtype: 'label',
						text: '',
					}],
					listeners: {
						scope: me,
						element: 'el',
						mousedown: function(e) { e.stopPropagation(); },
						click: function(e) { e.stopPropagation(); },
						dblclick: function(e) { e.stopPropagation(); },
						keydown: function(e) { e.stopPropagation(); },
						keypress: function(e) { e.stopPropagation(); },
						keyup: function(e) { e.stopPropagation(); }
					}
				});
            	/*
                 me.containers.add(column.dataIndex, container);
                 container.render(Ext.get(column.id));
            	 */
            	/*
            	 * Added to filter bar row
            	 */
				me.filterBar.add(con);    // adds the container to filterBar
			}
		}, me);
		var excludedCols = [];
		if (me.actionColumn) excludedCols.push(me.actionColumn.id);
		if (me.extraColumn) excludedCols.push(me.extraColumn.id);
		// -- Ext.each(me.grid.headerCt.getGridColumns(), function(column) {
		// ++ Ext.each(me.getGridColumns(), function(column) {
		//        Ext.each(me.getGridColumns(), function(column) {
		//            if (!Ext.Array.contains(excludedCols, column.id)) {
		//            	console.log(column.cls);
		//                //column.setPadding = Ext.Function.createInterceptor(column.setPadding, function(h) {
		//            	console.log((column.cls == Ext.baseCSSPrefix + 'column-header-checkbox '));
		//                if (column.cls = Ext.baseCSSPrefix + 'column-header-checkbox ') { //checkbox column
		//                    /*
		//                     * Deactivated
		//                     this.titleEl.setStyle({
		//                     paddingTop: '4px',
		//                     });
		//                     */
		//                    me.filterBar.getEl().toggleCls('ext-ux-checkbox-column');
		//                }
		//                return false;
		//                //});
		//            }
		//        });
		me.setVisible(!me.visible);

		me.renderButtons();

		me.showInitialFilters();



		grid.addDocked(me.filterBar);
	},

	//private
	renderButtons: function() {
		var me = this;
		if (me.showShowHideButton && me.columns.getCount()) {
			var column = me.actionColumn || me.extraColumn;
			var buttonEl = column.el.first().first();
			me.showHideEl = Ext.get(Ext.core.DomHelper.append(buttonEl, {
				tag: 'div',
				style: 'position: absolute; width: 16px; height: 16px; top: 3px; cursor: pointer; left: ' + parseInt((column.el.getWidth() - 16) / 2) + 'px',
				cls: me.showHideButtonIconCls,
				'data-qtip': (me.renderHidden ? me.showHideButtonTooltipDo : me.showHideButtonTooltipUndo)
			}));
			me.showHideEl.on('click', function() {
				me.setVisible(!me.isVisible());
				me.showHideEl.set({
					'data-qtip': (!me.isVisible() ? me.showHideButtonTooltipDo : me.showHideButtonTooltipUndo)
				});
			});
		}

		if (me.showClearAllButton && me.columns.getCount()) {
			var column = me.actionColumn || me.extraColumn;
			var buttonEl = column.el.first().first();
			me.clearAllEl = Ext.get(Ext.core.DomHelper.append(buttonEl, {
				tag: 'div',
				style: 'position: absolute; width: 16px; height: 16px; top: 25px; cursor: pointer; left: ' + parseInt((column.el.getWidth() - 16) / 2) + 'px',
				cls: me.clearAllButtonIconCls,
				'data-qtip': me.clearAllButtonTooltip
			}));

			me.clearAllEl.hide();
			me.clearAllEl.on('click', function() {
				me.clearFilters();
			});
		}
	},

	// private
	showInitialFilters: function() {
		var me = this;

		Ext.each(me.filterArray, function(filter) {
			var column = me.columns.get(filter.property);
			var field = me.fields.get(filter.property);
			if (!column.getEl().hasCls(me.columnFilteredCls)) {
				column.getEl().addCls(me.columnFilteredCls);
			}
			field.suspendEvents();
			field.setValue(filter.value);
			field.resumeEvents();
		});

		if (me.filterArray.length && me.showClearAllButton) {
			me.clearAllEl.show({ duration: 1000 });
		}
	},

	// private
	resizeContainer: function(headerCt, col) {
		var me = this;
		var dataIndex = col.dataIndex;
		if (!dataIndex) return;
		//Commented
		//var item = me.containers.get(dataIndex);
        /*
         * Added to activate the filter bar row
         */
		var item;
		//        var item = me.filterBar.getComponent('[dataIndex='+dataIndex+']');
		for (var i = 0; i < me.filterBar.items.items.length; i++) {
			if (me.filterBar.items.items[i].dataIndex == dataIndex) {
				item = me.filterBar.items.items[i];
				break;
			}
		}

		if (item && item.rendered) {
			var itemWidth = item.getWidth();
			var colWidth = me.columns.get(dataIndex).getWidth();
			if (itemWidth != colWidth) {
				item.setWidth(me.columns.get(dataIndex).getWidth());
				item.doLayout();
			}
		}
	},

	// private
	applyFilters: function(field) {
		if (!field.isValid()) return;
		var me = this,
			grid = me.grid,
			column = me.columns.get(field.dataIndex),
			newVal = (grid.store.remoteFilter ? field.getSubmitValue() : field.getValue());
		if (Ext.isArray(newVal) && newVal.length == 0) {
			newVal = '';
		}
		var myIndex = -1;
		Ext.each(me.filterArray, function(item2, index, allItems) {
			if (item2.property === column.dataIndex) {
				myIndex = index;
			}
		});
		if (myIndex != -1) {
			me.filterArray.splice(myIndex, 1);
		}
		if (!Ext.isEmpty(newVal)) {
			if (!grid.store.remoteFilter) {
				var operator = field.operator || column.filter.operator,
					filterFn;
				switch (operator) {
					case 'eq':
						filterFn = function(item) {
							if (column.filter.type == 'date') {
								return Ext.Date.clearTime(item.get(column.dataIndex), true).getTime() == Ext.Date.clearTime(newVal, true).getTime();
							} else {
								return (Ext.isEmpty(item.get(column.dataIndex)) ? me.autoStoresNullValue : item.get(column.dataIndex)) == (Ext.isEmpty(newVal) ? me.autoStoresNullValue : newVal);
							}
						};
						break;
					case 'gte':
						filterFn = function(item) {
							if (column.filter.type == 'date') {
								return Ext.Date.clearTime(item.get(column.dataIndex), true).getTime() >= Ext.Date.clearTime(newVal, true).getTime();
							} else {
								return (Ext.isEmpty(item.get(column.dataIndex)) ? me.autoStoresNullValue : item.get(column.dataIndex)) >= (Ext.isEmpty(newVal) ? me.autoStoresNullValue : newVal);
							}
						};
						break;
					case 'lte':
						filterFn = function(item) {
							if (column.filter.type == 'date') {
								return Ext.Date.clearTime(item.get(column.dataIndex), true).getTime() <= Ext.Date.clearTime(newVal, true).getTime();
							} else {
								return (Ext.isEmpty(item.get(column.dataIndex)) ? me.autoStoresNullValue : item.get(column.dataIndex)) <= (Ext.isEmpty(newVal) ? me.autoStoresNullValue : newVal);
							}
						};
						break;
					case 'ne':
						filterFn = function(item) {
							if (column.filter.type == 'date') {
								return Ext.Date.clearTime(item.get(column.dataIndex), true).getTime() != Ext.Date.clearTime(newVal, true).getTime();
							} else {
								return (Ext.isEmpty(item.get(column.dataIndex)) ? me.autoStoresNullValue : item.get(column.dataIndex)) != (Ext.isEmpty(newVal) ? me.autoStoresNullValue : newVal);
							}
						};
						break;
					case 'like':
						filterFn = function(item) {
							var re = new RegExp(newVal, 'i');
							return re.test(item.get(column.dataIndex));
						};
						break;
					case 'in':
						filterFn = function(item) {
							var regExp = /[\{\}\[\]\/?.,;:\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
							//                    		var re = new RegExp('^' + newVal.join('|') + '$', 'i');
							//                          return re.test((Ext.isEmpty(item.get(column.dataIndex)) ? me.autoStoresNullValue : item.get(column.dataIndex)));
							var re = new RegExp('^' + newVal.join('|').replace(regExp, "") + '$', 'i');
							return re.test((Ext.isEmpty(item.get(column.dataIndex)) ? me.autoStoresNullValue : (item.get(column.dataIndex)).toString().replace(regExp, "")));
						};
						break;
				}
				me.filterArray.push(Ext.create('Ext.util.Filter', {
					property: column.dataIndex,
					filterFn: filterFn,
					me: me
				}));
			} else {
				me.filterArray.push(Ext.create('Ext.util.Filter', {
					property: column.dataIndex,
					value: newVal,
					type: column.filter.type,
					operator: (field.operator || column.filter.operator)
				}));
			}
			if (!column.getEl().hasCls(me.columnFilteredCls)) {
				column.getEl().addCls(me.columnFilteredCls);
			}
		} else {
			if (column.getEl().hasCls(me.columnFilteredCls)) {
				column.getEl().removeCls(me.columnFilteredCls);
			}
		}
		grid.store.currentPage = 1;
		if (me.filterArray.length > 0) {
			if (!grid.store.remoteFilter) grid.store.clearFilter();
			grid.store.filters.clear();
			grid.store.filter(me.filterArray);
			if (me.clearAllEl) {
				me.clearAllEl.show({ duration: 1000 });
			}
		} else {
			grid.store.clearFilter();
			if (me.clearAllEl) {
				me.clearAllEl.hide({ duration: 1000 });
			}
		}
		if (!grid.store.remoteFilter && me.autoUpdateAutoStores) {
			me.fillAutoStores();
		}
		me.fireEvent('filterupdated', me.filterArray);
	},

	// private
	applyDelayedFilters: function(field) {
		if (!field.isValid()) return;
		var me = this;

		me.task.delay(me.updateBuffer, me.applyFilters, me, [field]);
	},

	// private
	applyInstantFilters: function(field) {
		if (!field.isValid()) return;
		var me = this;

		me.task.delay(0, me.applyFilters, me, [field]);
	},

	// private
	// Workaround from langles
	// http://www.sencha.com/forum/showthread.php?152923-Ext.ux.grid.FilterBar-plugin&p=1002888&viewfull=1#post1002888
	getGridColumns: function(refreshCache) {
		var me = this, gridHeaderContainer = this.grid.headerCt;
		var result = refreshCache ? null : gridHeaderContainer.gridDataColumns;
		// Not already got the column cache, so collect the base columns
		if (!result) {
			gridHeaderContainer.gridDataColumns = result = [];
			gridHeaderContainer.cascade(function(c) {
				if ((c !== gridHeaderContainer) && !c.isGroupHeader) {
					result.push(c);
				}
			});
		}
		return result;
	},

	//private
	getFirstField: function() {
		var me = this,
			field = undefined;
		// -- Ext.each(me.grid.headerCt.getGridColumns(), function(col) {
		// ++ Ext.each(me.getGridColumns(), function(col) {
		Ext.each(me.getGridColumns(), function(col) {
			if (col.filter) {
				field = me.fields.get(col.dataIndex);
				return false;
			}
		});

		return field;
	},

	//private
	focusFirstField: function() {
		var me = this;

		var field = me.getFirstField();

		if (field) {
			field.focus(false, 200);
		}
	},

	clearFilters: function() {
		var me = this;
		if (me.filterArray.length == 0) return;
		me.filterArray = [];
		me.fields.eachKey(function(key, field) {
			field.suspendEvents();
			field.reset();
			field.resumeEvents();
			var column = me.columns.get(key);
			if (column.getEl().hasCls(Ext.baseCSSPrefix + 'column-filtered')) {
				column.getEl().removeCls(Ext.baseCSSPrefix + 'column-filtered');
			}
		}, me);
		me.grid.store.clearFilter();
		if (me.clearAllEl) {
			me.clearAllEl.hide({ duration: 1000 });
		}

		me.fireEvent('filterupdated', me.filterArray);
	},
	clearFiltersAll: function() {
		var me = this;
		if (me.filterArray.length == 0) return;
		me.filterArray = [];
		for (var i = 0; i < me.fields.items.length; i++) {
			if (me.fields.items[i]) {
				if (me.fields.items[i].xtype == "combo") {
					me.fields.items[i].setValue();
				}
			}
		}
		me.grid.store.clearFilter();

		me.fireEvent('filterupdated', me.filterArray);
	},

	setFilterBar: function(property, value, operator) {
		var me = this;

		me.grid.filterBar.fields.eachKey(function(index, field) {
			if (index == property) {
				if (operator) {
					field.operator = operator;
				};
				field.setValue(value);
			}
		})
	},

	isVisible: function() {
		var me = this;

		return me.visible;
	},

	setVisible: function(visible) {
		var me = this;
        /*
         * Commented to activate filter bar row

         me.containers.each(function(item) {
         item.setVisible(visible);
         });
         */

        /*
         * Added to activate filter bar row
         */
		me.filterBar.setVisible(visible);

		if (visible) {
			me.focusFirstField();
		}
		me.grid.headerCt.doLayout();
		me.visible = visible;
	},

	columnmove: function(ct, column, fromIdx, toIdx, eOpts) {
		var me = this;
		me.grid.removeDocked(me.filterBar, true);
		me.grid.headerCt.remove(me.extraColumn, true);
		me.setup(me.grid);
	}
});