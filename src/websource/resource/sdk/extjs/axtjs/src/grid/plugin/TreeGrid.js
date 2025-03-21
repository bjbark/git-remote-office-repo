/**
 * 
 * TreeGrid 플러그인<br/>
 * TreePanel, TreeStore없이 grid를 tree모양으로 나타낼 수 있는 플러그인<br/>
 * 2depth 까지만 지원되며, 그리드의 첫번째 컬럼은 text-align을 left로 해야 된다.
 * 
 * ## 예제
 * 
 *     // step1. 그리드패널을 확장하는 클래스의 클래스 속성에 아래의 플러그인 속성을 추가한다.
 *     plugins :    	    {
 *         ptype              : "treegrid",
 *         expand             : false,       // tree 열지 않음
 *         parentKey          : "prnt_id", // 부모column key
 *         parentChildValue   : "0",         // 자식있는 부모값 (parentKey의 값)
 *         parentNoChildValue : "",          // 자식없는 부모값 (parentKey의 값)
 *         itemKey            : "itm_cd",   // 각 row의 key (부모, 자식 모두 가지고있는 공통 pk)
 *         event              : {            // 이벤트 (itemclick or itemdblclick or cellclick or celldblclick)
 *             name      : 'celldblclick',
 *             cellIndex : 0
 *         }
 *         // event           : 'celldblclick' <== 이와같이 event를 객체형태가 아닌 문자열로도 지정할 수 있다 (이경우 cellIndex는 default 0)
 *     } 
 *     
 * @author kdarkdev
 */
Ext.define('Axt.grid.plugin.TreeGrid', {
    alias: 'plugin.treegrid',
    extend: 'Ext.AbstractPlugin',
    pluginId : 'treegridplugin',
    requires: [
	],
    mixins: {
	    observable: 'Ext.util.Observable'
	},
	
	expand             : false,       // true : tree 펼치기, false : tree 닫기
	parentKey          : "prnt_id", // 부모column key
	parentChildValue   : "0",         // 자식있는 부모값
	parentNoChildValue : "",          // 자식없는 부모값
	itemKey            : "itm_cd",   // 각 row의 key (부모, 자식 모두 가지고있는 공통 pk)
	event              : "itemclick", // 이벤트 (itemclick or itemdblclick)
	
	/**
	 * 생성시
	 */
	init: function(grid) {
		var me = this;
		me.grid = grid;
		
		me.parentRenderCount = 0;
		me.filterMap = new Ext.create('Ext.util.HashMap');
		me.childMap = new Ext.create('Ext.util.HashMap');
		
		// SaleCheckService

		// 그리드의 cell 그리기
		me.addGridRenderer();
		
		// 그리드 이벤트 add
		me.addGridEventListeners();
    },
    
    addGridRenderer : function () {
    	var me = this;
    	var grid = me.grid;
    	
    	grid.columns[0].renderer = function(value, metaData, record, rowIndex){
			return me.treeRenderer({
				rowIndex           : rowIndex,
				parentKey          : me.parentKey,
				parentChildValue   : me.parentChildValue,    // 자식있는 부모값
				parentNoChildValue : me.parentNoChildValue,  // 자식없는 부모값
				itemKey            : me.itemKey,
				record             : record,
				value              : value
			});
		};
    },
    
    /**
	* @private
    * 그리드 이벤트
    */
    addGridEventListeners : function () {
    	var me = this;
    	var grid = me.grid;
    	var event = me.event;
    	
    	if(Ext.isEmpty(grid.listeners)) {
			grid.listeners = {};
		}
		
		var eventName = '';
		var eventCellIndex = 0;
		if(Ext.isObject(event)) {
			eventName = event.name;
			eventCellIndex = event.cellIndex;
		} else {
			eventName = event;
		}
		
		// 이벤트 listener 추가
		if(eventName==='itemclick' || eventName==='itemdblclick') {
			grid.on(eventName, function ( view, record, item, index, e, eOpts ) {
				me.treeEvent({
					parentKey          : me.parentKey,
					parentChildValue   : me.parentChildValue,    // 자식있는 부모값
					parentNoChildValue : me.parentNoChildValue,  // 자식없는 부모값
					itemKey            : me.itemKey,
					record             : record
				});
			}, grid);
		} else if(eventName==='cellclick' || eventName==='celldblclick') {
			grid.on(eventName, function ( view, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
				if(cellIndex === eventCellIndex) { // cell이벤트의경우 설정한 cell을 클릭했을때만 이벤트가 작동해야 한다.
					me.treeEvent({
						parentKey          : me.parentKey,
						parentChildValue   : me.parentChildValue,    // 자식있는 부모값
						parentNoChildValue : me.parentNoChildValue,  // 자식없는 부모값
						itemKey            : me.itemKey,
						record             : record
					});
				}
			}, grid);
		}
		
		// cell이 edit상태로 변경된후 깜빡일때
		grid.on('beforeedit', function(editor, context, eOpts){
			context.store.clearFilter(true); // store의 filter를 clear할때 ui상에 변화를 안주기 위해..
		});
		
		// edit하지않고 취소시
		grid.on('canceledit', function(editor, context, eOpts){
			var keys = me.filterMap.getKeys();
			context.store.filter({
				filterFn : function(item) {
					var filterResult = true; // filterResult가 true라는것은 true인경우만 grid상에 보여주겠다는 뜻이다.
					for(var filterMapKey in keys) {
						var treeItemCd = keys[filterMapKey];
						var isFilter =  item.get(me.parentKey) === treeItemCd;
						if(isFilter) {
							filterResult = false;
						}
					}
					
					return filterResult;
				}
			});
		});
		
		// edit 완료시
		grid.on('edit', function(editor, context, eOpts){
			var keys = me.filterMap.getKeys();
			context.store.filter({
				filterFn : function(item) {
					var filterResult = true; // filterResult가 true라는것은 true인경우만 grid상에 보여주겠다는 뜻이다.
					for(var filterMapKey in keys) {
						var treeItemCd = keys[filterMapKey];
						var isFilter =  item.get(me.parentKey) === treeItemCd;
						if(isFilter) {
							filterResult = false;
						}
					}
					
					return filterResult;
				}
			});
//			context.store.clearFilter(true); // store의 filter를 clear할때 ui상에 변화를 안주기 위해..
		});
    },
    
    /**
     * @private
     * tree icon renderer
     */
 	treeRenderer : function(config){ 
		var me = this;
		var grid    = me.grid;
		var store   = grid.getStore();
		
		
		if(config.rowIndex === 0) {
			me.parentRenderCount = 0;
			me.childMap.clear();
			store.each(function(record){
				var parentKey = record.get(config.parentKey);
				var isParent = parentKey===config.parentChildValue || parentKey===config.parentNoChildValue;
				if( isParent) {
					me.parentRenderCount ++; // 부모의 갯수
				} else { // 자식일경우
					var childCount = me.childMap.get(parentKey)||0;
					me.childMap.add(parentKey, childCount+1);
				}
			});
			
		}
		
		var record  = config.record;
		var parentValue = record.get(config.parentKey);
		
		if( parentValue === config.parentChildValue) {  // child 있는 parent
			var isFolderOpen = !me.filterMap.get(record.get(config.itemKey));
			var plMiStr   = isFolderOpen?'-minus':'-plus';
			var elbowCls;
			me.parentRenderCount--;
			elbowCls = 'treegrid-elbow'+plMiStr;
			if(me.parentRenderCount===0) {
				elbowCls += '-end';
			}
			return '<span role="img" class="'+elbowCls+'">&nbsp;</span>' +  me.emptySpan + '<span class="x-tree-node-text ">' + config.value + '</span>';
		} else if(parentValue === config.parentNoChildValue) { // child 없는 parent
			var elbowCls;
			me.parentRenderCount--;
			elbowCls = 'treegrid-elbow'; // '<span role="img" class="treegrid-elbow-line">&nbsp;</span>' + me.emptySpan;
			if(me.parentRenderCount===0) {
				elbowCls = 'treegrid-elbow-end';
			}
			return '<span role="img" class="'+elbowCls+'">&nbsp;</span>' +  me.emptySpan + '<span class="x-tree-node-text ">' + config.value + '</span>';
		} else { // child
			
			me.childMap.add(parentValue, me.childMap.get(parentValue)-1);
			
			var childIndex = me.childMap.get(parentValue);
			var elbowCls2 = '';
			if(childIndex === 0) { // line의 끝
				elbowCls = 'treegrid-elbow-end';
			} else {
				elbowCls = 'treegrid-elbow';
			}
			
			if(me.parentRenderCount === 0 && childIndex===0) { // 가장 마지막 부모의 마지막 자식일 경우
				elbowCls2 = 'treegrid-elbow-end';
			} else {
				elbowCls2 = 'treegrid-elbow-line';
			}
			return '<span role="img" class="'+elbowCls2+'">&nbsp;</span><span role="img" class="'+elbowCls+'">&nbsp;</span>' + '<span class="x-tree-node-text ">' + config.value + '</span>';
		}
	},
	
	emptySpan : '<span role="img" class="" style="padding:4px 0 4px 6px;"></span>',
	
	/**
	 * @private
	 * 이벤트 리스너<br/>
	 * 
	 */
	treeEvent : function (config) {
		var me = this;
		var grid    = me.grid;
		var record  = config.record;
		var store   = grid.getStore();
		
		if(record.get(config.parentKey) !== config.parentChildValue) {
//			console.debug('자식 item이 없습니다.')
			return false;
		}
		
		var itemCd = record.get(config.itemKey);
		var filterMap = me.filterMap;
		
		if(Ext.isEmpty(filterMap.get(itemCd))) { // filterMap에 item_cd가 없으면 filter를 걸어주기위해 (folder close) 
			filterMap.add(itemCd, itemCd);
		} else {                                // (folder open)
			filterMap.remove(itemCd);
		}
		
		// tree(grid) 초기화
		Ext.data.Store.prototype.clearFilter.call(store, true);
		
		// 닫아야될 tree조건을 hashmap에서 검색하여 return을 false로 준다
		var keys = filterMap.getKeys();
		Ext.data.Store.prototype.filter.call(store, {
			filterFn : function(item) {
				var filterResult = true; // filterResult가 true라는것은 true인경우만 grid상에 보여주겠다는 뜻이다.
				for(var filterMapKey in keys) {
					var treeItemCd = keys[filterMapKey];
					var isFilter =  item.get(config.parentKey) === treeItemCd;
					if(isFilter) {
						filterResult = false;
					}
				}
				
				return filterResult;
			}
		});
	},
	
	/**
	 * treegrid 플러그인 초기화<br/>
	 * grid에 store가 bind되는 시점에 호출해야 한다.
	 */
	initialize : function(callbackFunction){
		var me=  this;
		me.filterMap.clear();
		me.childMap.clear();
		me.parentRenderCount = 0;
		me.grid.store.clearFilter(true);

		if(Ext.isFunction(callbackFunction)) {
			callbackFunction(me.grid.store);
		}
		
		var store = me.grid.store;
		if(!me.expand) { // tree 그리드 닫기
			var filterMap = me.filterMap;
			// 트리를 닫기위해 자식있는 부모record만 filter에 등록함
			store.each(function(record){
				if(record.get(me.parentKey) === me.parentChildValue) {
					var itemCd = record.get(me.itemKey);
					filterMap.add(itemCd, itemCd);
				}
			});
			Ext.data.Store.prototype.filter.call(store, {
				filterFn : function(item) {
					var isFilter =  item.get(me.parentKey) === me.parentChildValue || 
					item.get(me.parentKey) === me.parentNoChildValue;
					return isFilter;
				}
			});
		} else {
			me.grid.getView().refresh();
		}
	},
	
	/**
	 * store filter 초기화
	 */
	clearFilter : function (silent) {
		var me = this;
		me.grid.store.clearFilter(false);
	}
	
});
